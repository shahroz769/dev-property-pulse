import PropertyHeaderImageBlurPlaceholder from '@/components/PropertyHeaderImageBlurPlaceholder';

const PropertyHeaderImage = ({ image, thumbhash }) => {
    const cloudinaryImage = image.replace(
        'upload/',
        'upload/f_avif,w_1920,c_fill/'
    );

    return (
        <section>
            <div className='container-xl m-auto'>
                <div className='grid grid-cols-1'>
                    <PropertyHeaderImageBlurPlaceholder
                        src={cloudinaryImage}
                        thumbhash={thumbhash}
                    />
                </div>
            </div>
        </section>
    );
};
export default PropertyHeaderImage;
