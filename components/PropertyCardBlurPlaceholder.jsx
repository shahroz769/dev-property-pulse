import Image from 'next/image';
import { createPngDataUri } from 'unlazy/thumbhash';

const PropertyCardBlurPlaceholder = ({ src, alt, thumbhash, priority }) => {
    return (
        <Image
            src={src}
            alt={alt}
            width={0}
            height={0}
            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
            layout='fill'
            className='object-cover rounded-t-xl hover:opacity-75 transition duration-300 ease-in-out'
            priority={priority}
            placeholder='blur'
            blurDataURL={createPngDataUri(thumbhash)}
        />
    );
};

export default PropertyCardBlurPlaceholder;
