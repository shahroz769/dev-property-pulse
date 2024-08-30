import { Button } from '@/components/ui/button';
import PropertyCardBlurPlaceholder from '@/components/PropertyCardBlurPlaceholder';
import Link from 'next/link';
import { Bed, Bath, Ruler, DollarSign, MapPin } from 'lucide-react';

const PropertyCard = ({ property, index = 3, home }) => {
    const getRateDisplay = () => {
        const { rates } = property;
        if (rates.monthly) {
            return `$${rates.monthly.toLocaleString()}/mo`;
        } else if (rates.weekly) {
            return `$${rates.weekly.toLocaleString()}/wk`;
        } else if (rates.nightly) {
            return `$${rates.nightly.toLocaleString()}/night`;
        }
    };

    let shouldPrioritize;
    if (home) {
        shouldPrioritize = false;
    } else {
        shouldPrioritize = index < 6;
    }

    const { url: cloudinaryImage, thumbhash } = property.images[0];

    const transformedImage = cloudinaryImage.replace(
        'upload/',
        'upload/f_avif,w_496,h_300,c_fill/'
    );

    return (
        <div className='rounded-xl shadow-md relative bg-white'>
            <div className='relative w-full h-[300px]'>
                <Link href={`/properties/${property._id}`}>
                    <PropertyCardBlurPlaceholder
                        src={transformedImage}
                        alt={property.name}
                        thumbhash={thumbhash}
                        priority={shouldPrioritize}
                    />
                </Link>

                <div className='absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-lg font-bold text-sm'>
                    {getRateDisplay()}
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
                    <div className='flex justify-center items-center gap-6 text-green-600'>
                        {property.rates.weekly && (
                            <p className='flex items-center'>
                                <DollarSign className='mr-1 h-5 w-5' /> Weekly
                            </p>
                        )}
                        {property.rates.monthly && (
                            <p className='flex items-center'>
                                <DollarSign className='mr-1 h-5 w-5' /> Monthly
                            </p>
                        )}
                    </div>
                </div>

                <div className='border-t border-gray-200 my-4'></div>

                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                    <div className='flex items-center'>
                        <MapPin className='text-orange-700 mr-2 h-5 w-5' />
                        <span className='text-orange-700'>
                            {property.location.city}, {property.location.state}
                        </span>
                    </div>
                    <Button
                        asChild
                        className='bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto'
                    >
                        <Link href={`/properties/${property._id}`}>
                            View Details
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
