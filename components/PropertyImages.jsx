'use client';
import Image from 'next/image';
import { createPngDataUri } from 'unlazy/thumbhash';
import { Gallery, Item } from 'react-photoswipe-gallery';

const PropertyImages = ({ images }) => {
    // Map through the images array to apply Cloudinary transformations and generate blur placeholders
    const cloudinaryImages = images.map((image) => {
        if (typeof image === 'object' && image.url && image.thumbhash) {
            return {
                ...image,
                url: image.url.replace(
                    'upload/',
                    'upload/f_avif,h_1000,c_fill/'
                ),
                blurDataURL: createPngDataUri(image.thumbhash),
            };
        }
        return image;
    });

    return (
        <Gallery>
            <section className='bg-blue-50 pb-10'>
                <div className='container px-6 mx-auto'>
                    {cloudinaryImages.length === 1 ? (
                        <Item
                            cropped
                            original={cloudinaryImages[0].url}
                            thumbnail={cloudinaryImages[0].url}
                            width='1000'
                            height='600'
                        >
                            {({ ref, open }) => (
                                <Image
                                    ref={ref}
                                    onClick={open}
                                    src={cloudinaryImages[0].url}
                                    alt=''
                                    className='object-cover h-[400px] mx-auto rounded-xl hover:opacity-75 transition duration-300 ease-in-out'
                                    width={1800}
                                    height={400}
                                    unoptimized
                                    placeholder='blur'
                                    blurDataURL={
                                        cloudinaryImages[0].blurDataURL
                                    }
                                />
                            )}
                        </Item>
                    ) : (
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            {cloudinaryImages.map((image, index) => (
                                <div
                                    key={index}
                                    className={`${
                                        cloudinaryImages.length === 3 &&
                                        index === 2
                                            ? 'sm:col-span-2'
                                            : 'col-span-1'
                                    }`}
                                >
                                    <Item
                                        cropped
                                        original={image.url}
                                        thumbnail={image.url}
                                        width='1000'
                                        height='600'
                                    >
                                        {({ ref, open }) => (
                                            <Image
                                                ref={ref}
                                                onClick={open}
                                                src={image.url}
                                                alt=''
                                                className='object-cover h-[400px] w-full rounded-xl cursor-pointer hover:opacity-75 transition duration-300 ease-in-out'
                                                width={0}
                                                height={0}
                                                sizes='100vw'
                                                unoptimized
                                                placeholder='blur'
                                                blurDataURL={image.blurDataURL}
                                            />
                                        )}
                                    </Item>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </Gallery>
    );
};

export default PropertyImages;
