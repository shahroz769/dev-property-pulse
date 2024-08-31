import CldImage from '@/components/CldImage';

const PropertyHeaderImage = ({ image, thumbhash }) => {
    return (
        <section>
            <div className='container-xl m-auto'>
                <div className='grid grid-cols-1'>
                    <CldImage
                        src={image}
                        thumbhash={thumbhash}
                        sizes='100vw'
                        className='object-cover h-[400px] w-full'
                        width={0}
                        height={0}
                        priority={true}
                    />
                </div>
            </div>
        </section>
    );
};
export default PropertyHeaderImage;
