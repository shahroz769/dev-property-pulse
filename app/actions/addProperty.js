'use server';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import cloudinary from '@/config/cloudinary';
import sharp from 'sharp';
import * as ThumbHash from 'thumbhash';

async function generateThumbHash(imageBuffer) {
    try {
        const { data, info } = await sharp(imageBuffer)
            .resize(100, 100, { fit: 'inside' })
            .ensureAlpha()
            .raw()
            .toBuffer({ resolveWithObject: true });

        const binaryThumbHash = ThumbHash.rgbaToThumbHash(
            info.width,
            info.height,
            data
        );
        return Buffer.from(binaryThumbHash).toString('base64');
    } catch (error) {
        console.error('Error generating thumbhash:', error);
        return null;
    }
}

async function addProperty(formData) {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required');
    }

    const { userId } = sessionUser;

    const amenities = formData.getAll('amenities');
    const images = formData
        .getAll('images')
        .filter((image) => image.name !== '');

    const propertyData = {
        type: formData.get('type'),
        name: formData.get('name'),
        description: formData.get('description'),
        location: {
            street: formData.get('location.street'),
            city: formData.get('location.city'),
            state: formData.get('location.state'),
            zipcode: formData.get('location.zipcode'),
        },
        beds: formData.get('beds'),
        baths: formData.get('baths'),
        square_feet: formData.get('square_feet'),
        amenities,
        rates: {
            weekly: formData.get('rates.weekly'),
            monthly: formData.get('rates.monthly'),
            nightly: formData.get('rates.nightly'),
        },
        seller_info: {
            name: formData.get('seller_info.name'),
            email: formData.get('seller_info.email'),
            phone: formData.get('seller_info.phone'),
        },
        owner: userId,
    };

    const imageUrlsWithThumbhash = [];

    for (const imageFile of images) {
        const imageBuffer = Buffer.from(await imageFile.arrayBuffer());

        // Convert the image data to base64
        const imageBase64 = imageBuffer.toString('base64');

        // Make request to upload to Cloudinary
        const result = await cloudinary.uploader.upload(
            `data:image/png;base64,${imageBase64}`,
            {
                folder: 'propertypulse',
            }
        );

        // Generate thumbhash for the uploaded image
        const thumbhash = await generateThumbHash(imageBuffer);

        // Add the image URL and thumbhash to the array
        imageUrlsWithThumbhash.push({ url: result.secure_url, thumbhash });
    }

    propertyData.images = imageUrlsWithThumbhash;

    const newProperty = new Property(propertyData);
    await newProperty.save();

    revalidatePath('/', 'layout');

    redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
