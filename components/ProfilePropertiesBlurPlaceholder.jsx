import Image from 'next/image';
import { createPngDataUri } from 'unlazy/thumbhash';

const ProfilePropertiesBlurPlaceholder = ({
    src,
    alt,
    priority,
    thumbhash,
}) => {
    return (
        <Image
            src={src}
            alt={alt}
            width={500}
            height={300}
            className='w-full h-48 object-cover hover:opacity-75 transition duration-300 ease-in-out'
            priority={priority}
            unoptimized
            placeholder='blur'
            blurDataURL={createPngDataUri(thumbhash)}
        />
    );
};

export default ProfilePropertiesBlurPlaceholder;
