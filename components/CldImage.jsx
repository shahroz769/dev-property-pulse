'use client';
import { createPngDataUri } from 'unlazy/thumbhash';
import { CldImage as CldImageDefault } from 'next-cloudinary';

const CldImage = ({ thumbhash, priority, ...props }) => {
    return (
        <CldImageDefault
            {...props}
            priority={priority}
            rawTransformations={['f_avif', 'g_auto']}
            placeholder='blur'
            blurDataURL={createPngDataUri(thumbhash)}
        />
    );
};

export default CldImage;
