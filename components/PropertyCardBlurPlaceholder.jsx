'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { createPngDataUri } from 'unlazy/thumbhash';

const PropertyCardBlurPlaceholder = ({ src, alt, thumbhash }) => {
    const [imageSrc, setImageSrc] = useState(src);
    const [key, setKey] = useState(0);

    useEffect(() => {
        setImageSrc(src);
        setKey((prevKey) => prevKey + 1);
    }, [src]);

    const handleError = () => {
        setImageSrc('/images/placeholder.svg');
    };

    return (
        <Image
            key={key}
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
