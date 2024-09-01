import Image from 'next/image';
import { createPngDataUri } from 'unlazy/thumbhash';

const PropertyHeaderImageBlurPlaceholder = ({ src, thumbhash }) => {
    return (
        <Image
            src={src}
            alt='Property Banner'
            width={0}
            height={0}
            className='object-cover h-[400px] w-full'
            unoptimized
            placeholder='blur'
            blurDataURL={createPngDataUri(thumbhash)}
        />
    );
};

export default PropertyHeaderImageBlurPlaceholder;
