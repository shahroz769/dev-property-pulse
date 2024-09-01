'use client';
import { useState } from 'react';
import Image from 'next/image';
import { createPngDataUri } from 'unlazy/thumbhash';

const PropertyHeaderImageBlurPlaceholder = ({ src, thumbhash }) => {
    const [imageSrc, setImageSrc] = useState(src);

    const handleError = () => {
        setImageSrc('/images/placeholder2.svg');
    };

    return (
        <Image
            src={imageSrc}
            alt='Property Banner'
            width={0}
            height={0}
            className='object-cover h-[400px] w-full'
            unoptimized
            placeholder='blur'
            blurDataURL={createPngDataUri(thumbhash)}
            onError={handleError}
        />
    );
};

export default PropertyHeaderImageBlurPlaceholder;
