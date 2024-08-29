'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import addProperty from '@/app/actions/addProperty';
import { X } from 'lucide-react';

const PropertyAddForm = () => {
    const [images, setImages] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages((prevImages) => [
            ...prevImages,
            ...files.slice(0, 4 - prevImages.length),
        ]);
    };

    const removeImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        const formData = new FormData(e.target);

        // Remove the existing 'images' field from the FormData
        formData.delete('images');

        // Manually append each image to the FormData
        images.forEach((image) => {
            formData.append('images', image);
        });

        try {
            await addProperty(formData);
            // The redirect is handled by the server action
        } catch (error) {
            console.error('Error submitting form:', error);
            setIsSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-6'>
            <h2 className='text-3xl font-bold text-center text-gray-800 mb-8'>
                Add Property
            </h2>

            <div>
                <label
                    htmlFor='type'
                    className='block text-sm font-medium text-gray-700 mb-1'
                >
                    Property Type
                </label>
                <select
                    id='type'
                    name='type'
                    className='w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    required
                >
                    <option value='Apartment'>Apartment</option>
                    <option value='Condo'>Condo</option>
                    <option value='House'>House</option>
                    <option value='CabinOrCottage'>Cabin or Cottage</option>
                    <option value='Room'>Room</option>
                    <option value='Studio'>Studio</option>
                    <option value='Other'>Other</option>
                </select>
            </div>

            <div>
                <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700 mb-1'
                >
                    Listing Name
                </label>
                <input
                    type='text'
                    id='name'
                    name='name'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    placeholder='e.g. Beautiful Apartment In Miami'
                    required
                />
            </div>

            <div>
                <label
                    htmlFor='description'
                    className='block text-sm font-medium text-gray-700 mb-1'
                >
                    Description
                </label>
                <textarea
                    id='description'
                    name='description'
                    rows='4'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Add an optional description of your property'
                ></textarea>
            </div>

            <div className='bg-gray-50 p-4 rounded-md'>
                <h3 className='text-lg font-semibold text-gray-700 mb-3'>
                    Location
                </h3>
                <div className='space-y-3'>
                    <input
                        type='text'
                        id='street'
                        name='location.street'
                        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Street'
                    />
                    <input
                        type='text'
                        id='city'
                        name='location.city'
                        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='City'
                        required
                    />
                    <input
                        type='text'
                        id='state'
                        name='location.state'
                        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='State'
                        required
                    />
                    <input
                        type='text'
                        id='zipcode'
                        name='location.zipcode'
                        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Zipcode'
                    />
                </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                <div>
                    <label
                        htmlFor='beds'
                        className='block text-sm font-medium text-gray-700 mb-1'
                    >
                        Beds
                    </label>
                    <input
                        type='number'
                        id='beds'
                        name='beds'
                        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor='baths'
                        className='block text-sm font-medium text-gray-700 mb-1'
                    >
                        Baths
                    </label>
                    <input
                        type='number'
                        id='baths'
                        name='baths'
                        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor='square_feet'
                        className='block text-sm font-medium text-gray-700 mb-1'
                    >
                        Square Feet
                    </label>
                    <input
                        type='number'
                        id='square_feet'
                        name='square_feet'
                        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        required
                    />
                </div>
            </div>

            <div>
                <h3 className='text-lg font-semibold text-gray-700 mb-3'>
                    Amenities
                </h3>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                    {[
                        'Wifi',
                        'Full kitchen',
                        'Washer & Dryer',
                        'Free Parking',
                        'Swimming Pool',
                        'Hot Tub',
                        '24/7 Security',
                        'Wheelchair Accessible',
                        'Elevator Access',
                        'Dishwasher',
                        'Gym/Fitness Center',
                        'Air Conditioning',
                        'Balcony/Patio',
                        'Smart TV',
                        'Coffee Maker',
                    ].map((amenity) => (
                        <div key={amenity} className='flex items-center'>
                            <input
                                type='checkbox'
                                id={`amenity_${amenity
                                    .toLowerCase()
                                    .replace(/\s/g, '_')}`}
                                name='amenities'
                                value={amenity}
                                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                            />
                            <label
                                htmlFor={`amenity_${amenity
                                    .toLowerCase()
                                    .replace(/\s/g, '_')}`}
                                className='ml-2 text-sm text-gray-700'
                            >
                                {amenity}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className='bg-gray-50 p-4 rounded-md'>
                <h3 className='text-lg font-semibold text-gray-700 mb-3'>
                    Rates (Leave blank if not applicable)
                </h3>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    {['Weekly', 'Monthly', 'Nightly'].map((rate) => (
                        <div key={rate}>
                            <label
                                htmlFor={`${rate.toLowerCase()}_rate`}
                                className='block text-sm font-medium text-gray-700 mb-1'
                            >
                                {rate}
                            </label>
                            <input
                                type='number'
                                id={`${rate.toLowerCase()}_rate`}
                                name={`rates.${rate.toLowerCase()}`}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className='space-y-3'>
                <div>
                    <label
                        htmlFor='seller_name'
                        className='block text-sm font-medium text-gray-700 mb-1'
                    >
                        Seller Name
                    </label>
                    <input
                        type='text'
                        id='seller_name'
                        name='seller_info.name'
                        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Name'
                    />
                </div>
                <div>
                    <label
                        htmlFor='seller_email'
                        className='block text-sm font-medium text-gray-700 mb-1'
                    >
                        Seller Email
                    </label>
                    <input
                        type='email'
                        id='seller_email'
                        name='seller_info.email'
                        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Email address'
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor='seller_phone'
                        className='block text-sm font-medium text-gray-700 mb-1'
                    >
                        Seller Phone
                    </label>
                    <input
                        type='tel'
                        id='seller_phone'
                        name='seller_info.phone'
                        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Phone'
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor='images'
                    className='block text-sm font-medium text-gray-700 mb-1'
                >
                    Images (Select up to 4 images)
                </label>
                <input
                    type='file'
                    id='images'
                    name='images'
                    accept='image/*'
                    multiple
                    required
                    onChange={handleImageChange}
                    className='hidden'
                />
                <label
                    htmlFor='images'
                    className='cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                >
                    Select Images
                </label>
                <div className='mt-4 grid grid-cols-2 gap-4'>
                    {images.map((image, index) => (
                        <div key={index} className='relative'>
                            <img
                                src={URL.createObjectURL(image)}
                                alt={`Preview ${index + 1}`}
                                className='w-full h-40 object-cover rounded-md'
                            />
                            {!isSaving && (
                                <button
                                    type='button'
                                    onClick={() => removeImage(index)}
                                    className='absolute top-2 right-2 text-white bg-red-500 rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                                >
                                    <X size={20} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <button
                className='w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed'
                type='submit'
                disabled={isSaving}
            >
                {isSaving ? 'Adding Property...' : 'Add Property'}
            </button>
        </form>
    );
};

export default PropertyAddForm;
