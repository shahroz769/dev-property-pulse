import { Button } from '@/components/ui/button';
import FeaturedPropertyCardBlurPlaceholder from '@/components/FeaturedPropertyCardBlurPlaceholder';
import Link from 'next/link';
import { Bed, Bath, Ruler, DollarSign, MapPin } from 'lucide-react';

const FeaturedPropertyCard = ({ property }) => {
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

    const { url: cloudinaryImage, thumbhash } = property.images[0];

    const transformedImage = cloudinaryImage.replace(
        'upload/',
        'upload/f_avif,w_496,h_300,c_fill/'
    );

    return (
        <div className='bg-white rounded-xl shadow-md relative flex flex-col lg:flex-row'>
            <div className='relative w-full lg:w-[260px] min-h-[260px] max-h-max'>
                <Link href={`/properties/${property._id}`}>
                    <FeaturedPropertyCardBlurPlaceholder
                        src={transformedImage}
                        alt={property.name}
                        thumbhash={thumbhash}
                    />
                </Link>

                <div className='absolute top-2 right-2 lg:left-2 lg:right-auto bg-blue-500 text-white px-2 py-1 rounded-lg font-bold text-sm'>
                    {getRateDisplay()}
                </div>
            </div>
            <div className='flex-grow p-4 flex flex-col justify-between'>
                <div>
                    <div className='mb-4 lg:mb-6'>
                        <div className='inline-block text-blue-600 bg-blue-100 text-xs px-2 py-1 rounded-full font-semibold mb-2'>
                            {property.type}
                        </div>
                        <h3 className='text-xl font-bold'>{property.name}</h3>
                    </div>

                    <div className='flex flex-col items-center gap-4 mb-4'>
                        <div className='flex justify-center items-center gap-4 sm:gap-6 text-gray-500'>
                            <p className='flex items-center'>
                                <Bed className='mr-1 h-5 w-5' /> {property.beds}
                                <span className='ml-1'>Beds</span>
                            </p>
                            <p className='flex items-center'>
                                <Bath className='mr-1 h-5 w-5' />{' '}
                                {property.baths}
                                <span className='ml-1'>Baths</span>
                            </p>
                            <p className='flex items-center'>
                                <Ruler className='mr-1 h-5 w-5' />{' '}
                                {property.square_feet}
                                <span className='ml-1'>sqft</span>
                            </p>
                        </div>
                        <div className='flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-green-600'>
                            {property.rates.nightly && (
                                <p className='flex items-center'>
                                    <DollarSign className='mr-1 h-5 w-5' />{' '}
                                    Nightly
                                </p>
                            )}
                            {property.rates.weekly && (
                                <p className='flex items-center'>
                                    <DollarSign className='mr-1 h-5 w-5' />{' '}
                                    Weekly
                                </p>
                            )}
                            {property.rates.monthly && (
                                <p className='flex items-center'>
                                    <DollarSign className='mr-1 h-5 w-5' />{' '}
                                    Monthly
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <div className='border-t border-gray-200 mb-4'></div>

                    <div className='flex flex-col sm:flex-row justify-between items-center'>
                        <div className='flex items-center mb-4 sm:mb-0'>
                            <MapPin className='text-orange-700 mr-2 h-5 w-5' />
                            <span className='text-orange-700'>
                                {property.location.city},{' '}
                                {property.location.state}
                            </span>
                        </div>
                        <Button
                            asChild
                            className='bg-blue-500 hover:bg-blue-600 text-white'
                        >
                            <Link href={`/properties/${property._id}`}>
                                View Details
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedPropertyCard;
