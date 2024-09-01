'use client';
import Image from 'next/image';
import { createPngDataUri } from 'unlazy/thumbhash';
import { Gallery, Item } from 'react-photoswipe-gallery';

const PropertyImages = ({ images }) => {
    const cloudinaryImages = images.map((image, index) => {
        if (typeof image === 'object' && image.url && image.thumbhash) {
            let thumbnailTransformation;
            if (images.length === 1 || (images.length === 3 && index === 2)) {
                thumbnailTransformation =
                    'upload/f_avif,w_1336,h_800,c_fill,g_auto/';
            } else {
                thumbnailTransformation =
                    'upload/f_avif,w_668,h_400,c_fill,g_auto/';
            }

            return {
                ...image,
                url: image.url.replace(
                    'upload/',
                    'upload/f_avif,w_1336,h_800,c_fill,g_auto/'
                ),
                thumbnailUrl: image.url.replace(
                    'upload/',
                    thumbnailTransformation
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
                            thumbnail={cloudinaryImages[0].thumbnailUrl}
                            width='1336'
                            height='800'
                        >
                            {({ ref, open }) => (
                                <Image
                                    ref={ref}
                                    onClick={open}
                                    src={cloudinaryImages[0].thumbnailUrl}
                                    alt='Property'
                                    className='object-cover h-[400px] cursor-pointer mx-auto rounded-xl hover:opacity-75 transition duration-300 ease-in-out'
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
                                        thumbnail={image.thumbnailUrl}
                                        width='1336'
                                        height='800'
                                    >
                                        {({ ref, open }) => (
                                            <Image
                                                ref={ref}
                                                onClick={open}
                                                src={image.thumbnailUrl}
                                                alt='Property'
                                                className='object-cover h-[400px] w-full rounded-xl cursor-pointer hover:opacity-75 transition duration-300 ease-in-out'
                                                width={0}
                                                height={0}
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
