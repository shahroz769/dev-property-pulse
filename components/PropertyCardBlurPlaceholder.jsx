'use client';
import { useState } from 'react';
import Image from 'next/image';
import { createPngDataUri } from 'unlazy/thumbhash';

const PropertyCardBlurPlaceholder = ({ src, alt, thumbhash }) => {
    const [imageSrc, setImageSrc] = useState(src);

    const handleError = () => {
        setImageSrc('/images/placeholder.svg');
    };

    return (
        <Image
            src={imageSrc}
            alt={alt}
            width={0}
            height={0}
            layout='fill'
            className='object-cover rounded-t-xl hover:opacity-75 transition duration-300 ease-in-out'
            unoptimized
            placeholder='blur'
            blurDataURL={createPngDataUri(thumbhash)}
            onError={handleError}
        />
    );
};

export default PropertyCardBlurPlaceholder;
