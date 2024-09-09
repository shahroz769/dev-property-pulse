import Link from 'next/link';
import { Bed, Bath, Ruler, MapPin, Edit, Trash2 } from 'lucide-react';
import PropertyCardBlurPlaceholder from '@/components/PropertyCardBlurPlaceholder';

export default function Component({ property, onDelete }) {
    const { url: cloudinaryImage, thumbhash } = property.images[0];

    const cloudinaryImage3xl = cloudinaryImage.replace(
        'upload/',
        'upload/f_avif,w_300,h_300,c_fill,g_auto/'
    );
    const cloudinaryImage2xl = cloudinaryImage.replace(
        'upload/',
        'upload/f_avif,w_300,h_300,c_fill,g_auto/'
    );
    const cloudinaryImageXl = cloudinaryImage.replace(
        'upload/',
        'upload/f_avif,w_300,h_300,c_fill,g_auto/'
    );
    const cloudinaryImageLg = cloudinaryImage.replace(
        'upload/',
        'upload/f_avif,w_410,h_300,c_fill,g_auto/'
    );
    const cloudinaryImageMd = cloudinaryImage.replace(
        'upload/',
        'upload/f_avif,w_600,h_300,c_fill,g_auto/'
    );
    const cloudinaryImageSm = cloudinaryImage.replace(
        'upload/',
        'upload/f_avif,w_540,h_300,c_fill,g_auto/'
    );
    const cloudinaryImageXs = cloudinaryImage.replace(
        'upload/',
        'upload/f_avif,w_420,h_300,c_fill,g_auto/'
    );
    const cloudinaryImage2xs = cloudinaryImage.replace(
        'upload/',
        'upload/f_avif,w_330,h_300,c_fill,g_auto/'
    );

    return (
        <div className='rounded-xl relative shadow-sm bg-white overflow-hidden'>
            <div className='relative w-full h-[300px] overflow-hidden'>
                <Link href={`/properties/${property._id}`}>
                    <div className='block 2xs:hidden'>
                        <PropertyCardBlurPlaceholder
                            src={cloudinaryImage2xs}
                            alt={property.name}
                            thumbhash={thumbhash}
                        />
                    </div>
                    <div className='hidden 2xs:block xs:hidden'>
                        <PropertyCardBlurPlaceholder
                            src={cloudinaryImageXs}
                            alt={property.name}
                            thumbhash={thumbhash}
                        />
                    </div>
                    <div className='hidden xs:block sm:hidden'>
                        <PropertyCardBlurPlaceholder
                            src={cloudinaryImageSm}
                            alt={property.name}
                            thumbhash={thumbhash}
                        />
                    </div>
                    <div className='hidden sm:block md:hidden'>
                        <PropertyCardBlurPlaceholder
                            src={cloudinaryImageMd}
                            alt={property.name}
                            thumbhash={thumbhash}
                        />
                    </div>
                    <div className='hidden md:block lg:hidden'>
                        <PropertyCardBlurPlaceholder
                            src={cloudinaryImageLg}
                            alt={property.name}
                            thumbhash={thumbhash}
                        />
                    </div>
                    <div className='hidden lg:block xl:hidden'>
                        <PropertyCardBlurPlaceholder
                            src={cloudinaryImageXl}
                            alt={property.name}
                            thumbhash={thumbhash}
                        />
                    </div>
                    <div className='hidden xl:block 2xl:hidden'>
                        <PropertyCardBlurPlaceholder
                            src={cloudinaryImage2xl}
                            alt={property.name}
                            thumbhash={thumbhash}
                        />
                    </div>
                    <div className='hidden 2xl:block 3xl:hidden'>
                        <PropertyCardBlurPlaceholder
                            src={cloudinaryImage3xl}
                            alt={property.name}
                            thumbhash={thumbhash}
                        />
                    </div>
                    <div className='hidden 3xl:block'>
                        <PropertyCardBlurPlaceholder
                            src={cloudinaryImage3xl}
                            alt={property.name}
                            thumbhash={thumbhash}
                        />
                    </div>
                </Link>
                <div className='absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-lg font-bold text-sm flex items-center'>
                    <MapPin className='mr-1 h-4 w-4' />
                    {property.location.city}, {property.location.state}
                </div>
            </div>
            <div className='p-4'>
                <div className='mb-4'>
                    <div className='inline-block text-blue-600 bg-blue-100 text-xs px-2 py-1 rounded-full font-semibold mb-2'>
                        {property.type}
                    </div>
                    <h3 className='text-xl font-bold'>{property.name}</h3>
                </div>

                <div className='flex flex-col items-center gap-4 mb-4'>
                    <div className='flex justify-center items-center gap-6 text-slate-500'>
                        <p className='flex items-center'>
                            <Bed className='mr-1 h-5 w-5' /> {property.beds}
                            <span className='ml-1'>Beds</span>
                        </p>
                        <p className='flex items-center'>
                            <Bath className='mr-1 h-5 w-5' /> {property.baths}
                            <span className='ml-1'>Baths</span>
                        </p>
                        <p className='flex items-center'>
                            <Ruler className='mr-1 h-5 w-5' />{' '}
                            {property.square_feet}
                            <span className='ml-1'>sqft</span>
                        </p>
                    </div>
                </div>

                <div className='border-t border-slate-200 my-4'></div>

                <div className='flex w-full gap-2 flex-col sm:flex-row'>
                    <Link
                        href={`/properties/${property._id}/edit`}
                        className='flex-1 flex items-center justify-center px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition duration-300'
                    >
                        <Edit className='mr-2 h-4 w-4' />
                        Edit
                    </Link>
                    <button
                        onClick={() => onDelete(property._id)}
                        className='flex-1 flex items-center justify-center px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition duration-300'
                    >
                        <Trash2 className='mr-2 h-4 w-4' />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
