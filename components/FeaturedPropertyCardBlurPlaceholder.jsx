import Image from 'next/image';
import { createPngDataUri } from 'unlazy/thumbhash';

const FeaturedPropertyCardBlurPlaceholder = ({ src, alt, thumbhash }) => {
    return (
        <Image
            src={src}
            alt={alt}
            layout='fill'
            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw'
            className='object-cover rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none hover:opacity-75 transition duration-300 ease-in-out'
            priority
            placeholder='blur'
            blurDataURL={createPngDataUri(thumbhash)}
        />
    );
};

export default FeaturedPropertyCardBlurPlaceholder;
