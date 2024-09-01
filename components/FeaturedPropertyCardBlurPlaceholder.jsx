'use client';
import { useState } from 'react';
import Image from 'next/image';
import { createPngDataUri } from 'unlazy/thumbhash';

const FeaturedPropertyCardBlurPlaceholder = ({ src, alt, thumbhash }) => {
    const [imageSrc, setImageSrc] = useState(src);

    const handleError = () => {
        setImageSrc('/images/placeholder.svg');
    };

    return (
        <Image
            src={imageSrc}
            alt={alt}
            layout='fill'
            className='object-cover rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none hover:opacity-75 transition duration-300 ease-in-out'
            unoptimized
            placeholder='blur'
            blurDataURL={createPngDataUri(thumbhash)}
            onError={handleError}
        />
    );
};

export default FeaturedPropertyCardBlurPlaceholder;
