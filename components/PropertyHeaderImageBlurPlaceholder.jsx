import Image from 'next/image';
import { createPngDataUri } from 'unlazy/thumbhash';

const PropertyHeaderImageBlurPlaceholder = ({ src, thumbhash }) => {
    return (
        <Image
            src={src}
            alt='Property Banner'
            width={0}
            height={0}
            sizes='100vw'
            className='object-cover h-[400px] w-full hover:opacity-75 transition duration-300 ease-in-out'
            priority
            unoptimized
            placeholder='blur'
            blurDataURL={createPngDataUri(thumbhash)}
        />
    );
};

export default PropertyHeaderImageBlurPlaceholder;
