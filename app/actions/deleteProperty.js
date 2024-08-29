'use server';
import cloudinary from '@/config/cloudinary';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function deleteProperty(propertyId) {
    const sessionUser = await getSessionUser();

    // Check for session
    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required');
    }

    const { userId } = sessionUser;

    await connectDB();

    const property = await Property.findById(propertyId);

    if (!property) throw new Error('Property Not Found');

    // Verify ownership
    if (property.owner.toString() !== userId) {
        throw new Error('Unauthorized');
    }

    // Extract public IDs from the image URLs in the images array
    const publicIds = property.images
        .map((imageObj) => {
            if (imageObj && imageObj.url) {
                const parts = imageObj.url.split('/');
                return parts.at(-1).split('.').at(0); // Extract the public ID part of the URL
            }
            return null;
        })
        .filter((id) => id !== null); // Filter out any nulls

    console.log('Extracted public IDs:', publicIds); // Log the extracted public IDs

    // Delete images from Cloudinary
    if (publicIds.length > 0) {
        try {
            await Promise.all(
                publicIds.map(async (publicId) => {
                    const result = await cloudinary.uploader.destroy(
                        'propertypulse/' + publicId
                    );
                    if (result.result !== 'ok') {
                        console.error(
                            `Failed to delete image with public ID: ${publicId}`,
                            result
                        );
                    } else {
                        console.log(
                            `Successfully deleted image with public ID: ${publicId}`
                        );
                    }
                })
            );
        } catch (error) {
            console.error('Error deleting images from Cloudinary:', error);
            throw new Error('Failed to delete images from Cloudinary');
        }
    }

    // Proceed with property deletion
    await property.deleteOne();

    // Revalidate cache
    revalidatePath('/', 'layout');
}

export default deleteProperty;
