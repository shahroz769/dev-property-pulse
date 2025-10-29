'use client';

import { useState } from 'react';
import Image from 'next/image';
import { createPngDataUri } from 'unlazy/thumbhash';

const PropertyCardBlurPlaceholder = ({ src, alt, thumbhash }) => {
    const [imageSrc, setImageSrc] = useState(src);
    const [, setKey] = useState(0);

    const handleError = () => {
        setImageSrc('/images/placeholder.svg');
        setKey((prevKey) => prevKey + 1);
    };

    return (
        <Image
            src={imageSrc}
            alt={alt}
            width={0}
            height={0}
            fill
            className='object-cover rounded-t-xl hover:opacity-90 hover:scale-105 transition duration-500 ease-in-out'
            unoptimized
            placeholder='blur'
            blurDataURL={createPngDataUri(thumbhash)}
            onError={handleError}
        />
    );
};

export default PropertyCardBlurPlaceholder;
