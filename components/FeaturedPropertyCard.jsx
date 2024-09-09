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

    const transformedImage3xl = cloudinaryImage.replace(
        'upload/',
        'upload/f_avif,w_260,h_260,c_fill/'
    );
    const transformedImage2xl = cloudinaryImage.replace(
        'upload/',
        'upload/f_avif,w_260,h_260,c_fill/'
    );
    const transformedImageXl = cloudinaryImage.replace(
        'upload/',
        'upload/f_avif,w_220,h_280,c_fill/'
    );
    const transformedImageLg = cloudinaryImage.replace(
        'upload/',
        'upload/f_avif,w_420,h_260,c_fill/'
    );
    const transformedImageMd = cloudinaryImage.replace(
        'upload/',
        'upload/f_avif,w_650,h_260,c_fill/'
    );
    const transformedImageSm = cloudinaryImage.replace(
        'upload/',
        'upload/f_avif,w_530,h_260,c_fill/'
    );
    const transformedImageXs = cloudinaryImage.replace(
        'upload/',
        'upload/f_avif,w_400,h_260,c_fill/'
    );
    const transformedImage2xs = cloudinaryImage.replace(
        'upload/',
        'upload/f_avif,w_320,h_260,c_fill/'
    );

    return (
        <div className='bg-white rounded-xl shadow-sm relative flex flex-col lg:flex-row overflow-hidden'>
            <div className='relative overflow-hidden w-full lg:w-[260px] min-h-[260px] max-h-max'>
                <Link href={`/properties/${property._id}`}>
                    <div>
                        <div className='hidden 3xl:block'>
                            <FeaturedPropertyCardBlurPlaceholder
                                src={transformedImage3xl}
                                alt={property.name}
                                thumbhash={thumbhash}
                            />
                        </div>
                        <div className='hidden xl:block 2xl:hidden'>
                            <FeaturedPropertyCardBlurPlaceholder
                                src={transformedImage2xl}
                                alt={property.name}
                                thumbhash={thumbhash}
                            />
                        </div>
                        <div className='hidden lg:block xl:hidden'>
                            <FeaturedPropertyCardBlurPlaceholder
                                src={transformedImageXl}
                                alt={property.name}
                                thumbhash={thumbhash}
                            />
                        </div>
                        <div className='hidden md:block lg:hidden'>
                            <FeaturedPropertyCardBlurPlaceholder
                                src={transformedImageLg}
                                alt={property.name}
                                thumbhash={thumbhash}
                            />
                        </div>
                        <div className='hidden sm:block md:hidden'>
                            <FeaturedPropertyCardBlurPlaceholder
                                src={transformedImageMd}
                                alt={property.name}
                                thumbhash={thumbhash}
                            />
                        </div>
                        <div className='hidden xs:block sm:hidden'>
                            <FeaturedPropertyCardBlurPlaceholder
                                src={transformedImageSm}
                                alt={property.name}
                                thumbhash={thumbhash}
                            />
                        </div>
                        <div className='hidden 2xs:block xs:hidden'>
                            <FeaturedPropertyCardBlurPlaceholder
                                src={transformedImageXs}
                                alt={property.name}
                                thumbhash={thumbhash}
                            />
                        </div>
                        <div className='block 2xs:hidden'>
                            <FeaturedPropertyCardBlurPlaceholder
                                src={transformedImage2xs}
                                alt={property.name}
                                thumbhash={thumbhash}
                            />
                        </div>
                    </div>
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
                        <div className='flex justify-center items-center gap-4 sm:gap-6 text-slate-500'>
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
                    <div className='border-t border-slate-200 mb-4'></div>

                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                        <div className='flex items-center w-full sm:w-auto'>
                            <MapPin className='text-orange-700 mr-2 h-5 w-5' />
                            <span className='text-orange-700'>
                                {property.location.city},{' '}
                                {property.location.state}
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
        </div>
    );
};

export default FeaturedPropertyCard;
