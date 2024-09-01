import Image from 'next/image';
import { createPngDataUri } from 'unlazy/thumbhash';

const FeaturedPropertyCardBlurPlaceholder = ({ src, alt, thumbhash }) => {
    return (
        <Image
            src={src}
            alt={alt}
            layout='fill'
            className='object-cover rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none hover:opacity-75 transition duration-300 ease-in-out'
            priority
            unoptimized
            placeholder='blur'
            blurDataURL={createPngDataUri(thumbhash)}
        />
    );
};

export default FeaturedPropertyCardBlurPlaceholder;
