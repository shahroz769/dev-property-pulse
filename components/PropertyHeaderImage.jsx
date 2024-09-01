import PropertyHeaderImageBlurPlaceholder from '@/components/PropertyHeaderImageBlurPlaceholder';

const PropertyHeaderImage = ({ image, thumbhash }) => {
    const cloudinaryImage2xs = image.replace(
        'upload/',
        'upload/f_avif,w_400,h_400,c_fill/'
    );
    const cloudinaryImageXs = image.replace(
        'upload/',
        'upload/f_avif,w_500,h_400,c_fill/'
    );
    const cloudinaryImageSm = image.replace(
        'upload/',
        'upload/f_avif,w_640,h_400,c_fill/'
    );
    const cloudinaryImageMd = image.replace(
        'upload/',
        'upload/f_avif,w_768,h_400,c_fill/'
    );
    const cloudinaryImageLg = image.replace(
        'upload/',
        'upload/f_avif,w_1024,h_400,c_fill/'
    );
    const cloudinaryImageXl = image.replace(
        'upload/',
        'upload/f_avif,w_1280,h_400,c_fill/'
    );
    const cloudinaryImage2xl = image.replace(
        'upload/',
        'upload/f_avif,w_1536,h_400,c_fill/'
    );
    const cloudinaryImage3xl = image.replace(
        'upload/',
        'upload/f_avif,w_1920,h_400,c_fill/'
    );

    return (
        <section>
            <div className='container-xl m-auto'>
                {/* Image for 2 extrasmall screens */}
                <div className='block 2xs:hidden'>
                    <PropertyHeaderImageBlurPlaceholder
                        src={cloudinaryImage2xs}
                        thumbhash={thumbhash}
                    />
                </div>

                {/* Image for extrasmall screens */}
                <div className='hidden 2xs:block xs:hidden'>
                    <PropertyHeaderImageBlurPlaceholder
                        src={cloudinaryImageXs}
                        thumbhash={thumbhash}
                    />
                </div>

                {/* Image for small screens */}
                <div className='hidden xs:block sm:hidden'>
                    <PropertyHeaderImageBlurPlaceholder
                        src={cloudinaryImageSm}
                        thumbhash={thumbhash}
                    />
                </div>

                {/* Image for medium screens */}
                <div className='hidden sm:block md:hidden'>
                    <PropertyHeaderImageBlurPlaceholder
                        src={cloudinaryImageMd}
                        thumbhash={thumbhash}
                    />
                </div>

                {/* Image for large screens */}
                <div className='hidden md:block lg:hidden'>
                    <PropertyHeaderImageBlurPlaceholder
                        src={cloudinaryImageLg}
                        thumbhash={thumbhash}
                    />
                </div>

                {/* Image for extra large screens */}
                <div className='hidden lg:block xl:hidden'>
                    <PropertyHeaderImageBlurPlaceholder
                        src={cloudinaryImageXl}
                        thumbhash={thumbhash}
                    />
                </div>

                {/* Image for 2x extra large screens */}
                <div className='hidden xl:block 2xl:hidden'>
                    <PropertyHeaderImageBlurPlaceholder
                        src={cloudinaryImage2xl}
                        thumbhash={thumbhash}
                    />
                </div>

                {/* Image for 3x extra large screens */}
                <div className='hidden 2xl:block'>
                    <PropertyHeaderImageBlurPlaceholder
                        src={cloudinaryImage3xl}
                        thumbhash={thumbhash}
                    />
                </div>
            </div>
        </section>
    );
};

export default PropertyHeaderImage;
