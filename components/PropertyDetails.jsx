import { Bed, Bath, Ruler, X, Check, MapPin } from 'lucide-react';

const PropertyDetails = ({ property }) => {
    return (
        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
            <div className='p-4 sm:p-8 space-y-6 sm:space-y-8'>
                <div className='space-y-4'>
                    <span className='text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full'>
                        {property.type}
                    </span>
                    <h1 className='text-3xl sm:text-4xl font-bold text-gray-900'>
                        {property.name}
                    </h1>
                    <div className='flex items-center text-gray-600'>
                        <MapPin className='w-5 h-5 text-blue-500 mr-2 flex-shrink-0' />
                        <p className='text-base sm:text-lg'>
                            {property.location.street}, {property.location.city}{' '}
                            {property.location.state}
                        </p>
                    </div>
                </div>

                <div className='bg-slate-50 p-4 sm:p-6 rounded-xl'>
                    <h3 className='text-xl font-bold text-gray-800 mb-4'>
                        Rates & Options
                    </h3>
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                        {['Nightly', 'Weekly', 'Monthly'].map((period) => (
                            <div
                                key={period}
                                className='flex flex-col p-3 sm:p-4 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg'
                            >
                                <span className='text-gray-600 mb-2'>
                                    {period}
                                </span>
                                <span className='text-xl sm:text-2xl font-bold text-blue-600'>
                                    {property.rates[period.toLowerCase()] ? (
                                        `$${property.rates[
                                            period.toLowerCase()
                                        ].toLocaleString()}`
                                    ) : (
                                        <X className='text-red-500 w-5 h-5 sm:w-6 sm:h-6' />
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='space-y-4'>
                    <h3 className='text-2xl font-bold text-gray-800'>
                        Description
                    </h3>
                    <p className='text-gray-600 leading-relaxed text-base sm:text-lg'>
                        {property.description}
                    </p>
                </div>
                <div className='space-y-6'>
                    <h3 className='text-2xl font-bold text-gray-800'>
                        Details
                    </h3>
                    <div className='flex flex-col sm:flex-row items-start pl-4 justify-center sm:space-x-8 space-y-4 sm:space-y-0 text-gray-600'>
                        <div className='flex items-center'>
                            <Bed className='w-6 h-6 mr-2 text-blue-500' />
                            <span className='text-lg'>
                                {property.beds} Beds
                            </span>
                        </div>
                        <div className='flex items-center'>
                            <Bath className='w-6 h-6 mr-2 text-blue-500' />
                            <span className='text-lg'>
                                {property.baths} Baths
                            </span>
                        </div>
                        <div className='flex items-center'>
                            <Ruler className='w-6 h-6 mr-2 text-blue-500' />
                            <span className='text-lg'>
                                {property.square_feet} sqft
                            </span>
                        </div>
                    </div>
                </div>
                <div className='space-y-6'>
                    <h3 className='text-2xl font-bold text-gray-800'>
                        Amenities
                    </h3>
                    <ul className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        {property.amenities.map((amenity, index) => (
                            <li
                                key={index}
                                className='flex items-center text-gray-600 bg-slate-50 p-3 rounded-lg transition-all duration-300 hover:bg-slate-100'
                            >
                                <Check className='w-5 h-5 mr-3 text-green-500 flex-shrink-0' />
                                <span className='text-base sm:text-lg'>
                                    {amenity}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
