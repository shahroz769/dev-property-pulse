import Link from 'next/link';
import { Bed, Bath, Ruler, MapPin, Edit, Trash2 } from 'lucide-react';
import PropertyCardBlurPlaceholder from '@/components/PropertyCardBlurPlaceholder';

export default function Component({ property, onDelete, index }) {
    const shouldPrioritize = index < 3;

    const { url: cloudinaryImage, thumbhash } = property.images[0];
    const transformedImage = cloudinaryImage.replace(
        'upload/',
        'upload/f_avif,w_496,h_300,c_fill/'
    );

    return (
        <div className='rounded-xl relative bg-white'>
            <div className='relative w-full h-[300px]'>
                <Link href={`/properties/${property._id}`}>
                    <PropertyCardBlurPlaceholder
                        src={transformedImage}
                        alt={property.name}
                        thumbhash={thumbhash}
                        priority={shouldPrioritize}
                    />
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
                    <div className='flex justify-center items-center gap-6 text-gray-500'>
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

                <div className='border-t border-gray-200 my-4'></div>

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
