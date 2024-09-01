import Image from 'next/image';
import { createPngDataUri } from 'unlazy/thumbhash';

const PropertyCardBlurPlaceholder = ({ src, alt, thumbhash, priority }) => {
    return (
        <Image
            src={src}
            alt={alt}
            width={0}
            height={0}
            layout='fill'
            className='object-cover rounded-t-xl hover:opacity-75 transition duration-300 ease-in-out'
            priority={priority}
            unoptimized
            placeholder='blur'
            blurDataURL={createPngDataUri(thumbhash)}
        />
    );
};

export default PropertyCardBlurPlaceholder;
