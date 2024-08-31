import CldImage from '@/components/CldImage';

const PropertyHeaderImage = ({ image, thumbhash }) => {
    return (
        <section>
            <div className='container-xl m-auto'>
                <div className='grid grid-cols-1'>
                    <CldImage
                        src={image}
                        alt='Property Banner'
                        width={0}
                        height={0}
                        sizes='100vw'
                        priority={true}
                        thumbhash={thumbhash}
                        className='object-cover h-[400px] w-full'
                    />
                </div>
            </div>
        </section>
    );
};
export default PropertyHeaderImage;
