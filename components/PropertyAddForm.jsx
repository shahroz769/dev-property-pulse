'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { X, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import addProperty from '@/app/actions/addProperty';

export default function PropertyAddForm() {
    const [images, setImages] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();
    const formRef = useRef(null);

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

        const formData = new FormData(formRef.current);
        formData.delete('images');
        images.forEach((image) => {
            formData.append('images', image);
        });

        try {
            await addProperty(formData);
            // Scroll to top after form submission
            window.scrollTo(0, 0);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit} className='space-y-6'>
            <CardHeader className='p-0 sm:p-6'>
                <CardTitle className='text-2xl sm:text-3xl font-bold text-center text-gray-800'>
                    Add Property
                </CardTitle>
            </CardHeader>

            <div className='space-y-6'>
                <div className='space-y-2'>
                    <Label
                        htmlFor='type'
                        className='text-sm font-medium text-gray-700'
                    >
                        Property Type
                    </Label>
                    <Select name='type' required>
                        <SelectTrigger id='type' className='w-full'>
                            <SelectValue placeholder='Select property type' />
                        </SelectTrigger>
                        <SelectContent>
                            {[
                                'Apartment',
                                'Condo',
                                'House',
                                'Cabin or Cottage',
                                'Room',
                                'Studio',
                                'Other',
                            ].map((type) => (
                                <SelectItem
                                    key={type}
                                    value={type
                                        .toLowerCase()
                                        .replace(/\s/g, '_')}
                                >
                                    {type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className='space-y-2'>
                    <Label
                        htmlFor='name'
                        className='text-sm font-medium text-gray-700'
                    >
                        Listing Name
                    </Label>
                    <Input
                        id='name'
                        name='name'
                        placeholder='e.g. Beautiful Apartment In Miami'
                        required
                        className='w-full'
                    />
                </div>

                <div className='space-y-2'>
                    <Label
                        htmlFor='description'
                        className='text-sm font-medium text-gray-700'
                    >
                        Description
                    </Label>
                    <Textarea
                        id='description'
                        name='description'
                        placeholder='Add an optional description of your property'
                        className='w-full'
                    />
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold text-gray-800'>
                            Location
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <Input
                            id='street'
                            name='location.street'
                            placeholder='Street'
                            className='w-full'
                        />
                        <Input
                            id='city'
                            name='location.city'
                            placeholder='City'
                            required
                            className='w-full'
                        />
                        <Input
                            id='state'
                            name='location.state'
                            placeholder='State'
                            required
                            className='w-full'
                        />
                        <Input
                            id='zipcode'
                            name='location.zipcode'
                            placeholder='Zipcode'
                            className='w-full'
                        />
                    </CardContent>
                </Card>

                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    {['Beds', 'Baths', 'Square Feet'].map((item) => (
                        <div key={item} className='space-y-2'>
                            <Label
                                htmlFor={item.toLowerCase().replace(/\s/g, '_')}
                                className='text-sm font-medium text-gray-700'
                            >
                                {item}
                            </Label>
                            <Input
                                type='number'
                                id={item.toLowerCase().replace(/\s/g, '_')}
                                name={item.toLowerCase().replace(/\s/g, '_')}
                                required
                                className='w-full'
                            />
                        </div>
                    ))}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold text-gray-800'>
                            Amenities
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
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
                                <div
                                    key={amenity}
                                    className='flex items-center space-x-2'
                                >
                                    <Checkbox
                                        id={`amenity_${amenity
                                            .toLowerCase()
                                            .replace(/\s/g, '_')}`}
                                        name='amenities'
                                        value={amenity}
                                    />
                                    <Label
                                        htmlFor={`amenity_${amenity
                                            .toLowerCase()
                                            .replace(/\s/g, '_')}`}
                                        className='text-sm text-gray-600'
                                    >
                                        {amenity}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold text-gray-800'>
                            Rates (Leave blank if not applicable)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                            {['Weekly', 'Monthly', 'Nightly'].map((rate) => (
                                <div key={rate} className='space-y-2'>
                                    <Label
                                        htmlFor={`${rate.toLowerCase()}_rate`}
                                        className='text-sm font-medium text-gray-700'
                                    >
                                        {rate}
                                    </Label>
                                    <Input
                                        type='number'
                                        id={`${rate.toLowerCase()}_rate`}
                                        name={`rates.${rate.toLowerCase()}`}
                                        className='w-full'
                                    />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold text-gray-800'>
                            Seller Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='space-y-2'>
                            <Label
                                htmlFor='seller_name'
                                className='text-sm font-medium text-gray-700'
                            >
                                Seller Name
                            </Label>
                            <Input
                                id='seller_name'
                                name='seller_info.name'
                                placeholder='Name'
                                className='w-full'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label
                                htmlFor='seller_email'
                                className='text-sm font-medium text-gray-700'
                            >
                                Seller Email
                            </Label>
                            <Input
                                id='seller_email'
                                name='seller_info.email'
                                type='email'
                                placeholder='Email address'
                                required
                                className='w-full'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label
                                htmlFor='seller_phone'
                                className='text-sm font-medium text-gray-700'
                            >
                                Seller Phone
                            </Label>
                            <Input
                                id='seller_phone'
                                name='seller_info.phone'
                                type='tel'
                                placeholder='Phone'
                                className='w-full'
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className='space-y-2'>
                    <Label
                        htmlFor='images'
                        className='text-sm font-medium text-gray-700 block sm:inline-block sm:mr-4'
                    >
                        Images (Select up to 4 images)
                    </Label>
                    <Input
                        id='images'
                        name='images'
                        type='file'
                        accept='image/*'
                        multiple
                        required
                        onChange={handleImageChange}
                        className='hidden'
                        disabled={isSaving}
                    />
                    <Label
                        htmlFor='images'
                        className={`cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                            isSaving ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        <Upload className='w-5 h-5 mr-2' />
                        Select Images
                    </Label>
                    <div className='mt-4 grid grid-cols-2 gap-4'>
                        {images.map((image, index) => (
                            <div key={index} className='relative'>
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Preview ${index + 1}`}
                                    className='w-full h-60 object-cover rounded-md'
                                />
                                {!isSaving && (
                                    <Button
                                        type='button'
                                        onClick={() => removeImage(index)}
                                        variant='destructive'
                                        size='icon'
                                        className='absolute top-2 right-2 bg-red-500 hover:bg-red-600 rounded-full'
                                    >
                                        <X className='h-4 w-4' />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Button
                className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition-colors duration-300'
                type='submit'
                disabled={isSaving}
            >
                {isSaving && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                {isSaving ? 'Adding Property' : 'Add Property'}
            </Button>
        </form>
    );
}
