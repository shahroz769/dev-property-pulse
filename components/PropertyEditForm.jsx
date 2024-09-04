'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
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
import updateProperty from '@/app/actions/updateProperty';

export default function PropertyEditForm({ property }) {
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();
    const formRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        const formData = new FormData(formRef.current);

        try {
            await updateProperty(property._id, formData);
            // The server action will handle the redirect, so we don't need to do it here
            // Scroll to top after form submission
            window.scrollTo(0, 0);
        } catch (error) {
            console.error('Error updating property:', error);
            setIsSaving(false);
            // Optionally, you can show an error message to the user here
        }
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit} className='space-y-6'>
            <CardHeader className='p-0 sm:p-6'>
                <CardTitle className='text-2xl sm:text-3xl font-bold text-center text-slate-800'>
                    Edit Property
                </CardTitle>
            </CardHeader>

            <div className='space-y-6'>
                <div className='space-y-2'>
                    <Label
                        htmlFor='type'
                        className='text-sm font-medium text-slate-700'
                    >
                        Property Type
                    </Label>
                    <Select name='type' defaultValue={property.type} required>
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
                        className='text-sm font-medium text-slate-700'
                    >
                        Listing Name
                    </Label>
                    <Input
                        id='name'
                        name='name'
                        placeholder='e.g. Beautiful Apartment In Miami'
                        required
                        className='w-full'
                        defaultValue={property.name}
                    />
                </div>

                <div className='space-y-2'>
                    <Label
                        htmlFor='description'
                        className='text-sm font-medium text-slate-700'
                    >
                        Description
                    </Label>
                    <Textarea
                        id='description'
                        name='description'
                        placeholder='Add an optional description of your property'
                        className='w-full'
                        defaultValue={property.description}
                    />
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold text-slate-800'>
                            Location
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <Input
                            id='street'
                            name='location.street'
                            placeholder='Street'
                            className='w-full'
                            defaultValue={property.location.street}
                        />
                        <Input
                            id='city'
                            name='location.city'
                            placeholder='City'
                            required
                            className='w-full'
                            defaultValue={property.location.city}
                        />
                        <Input
                            id='state'
                            name='location.state'
                            placeholder='State'
                            required
                            className='w-full'
                            defaultValue={property.location.state}
                        />
                        <Input
                            id='zipcode'
                            name='location.zipcode'
                            placeholder='Zipcode'
                            className='w-full'
                            defaultValue={property.location.zipcode}
                        />
                    </CardContent>
                </Card>

                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    {['Beds', 'Baths', 'Square Feet'].map((item) => (
                        <div key={item} className='space-y-2'>
                            <Label
                                htmlFor={item.toLowerCase().replace(/\s/g, '_')}
                                className='text-sm font-medium text-slate-700'
                            >
                                {item}
                            </Label>
                            <Input
                                type='number'
                                id={item.toLowerCase().replace(/\s/g, '_')}
                                name={item.toLowerCase().replace(/\s/g, '_')}
                                required
                                className='w-full'
                                defaultValue={
                                    property[
                                        item.toLowerCase().replace(/\s/g, '_')
                                    ]
                                }
                            />
                        </div>
                    ))}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold text-slate-800'>
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
                                        defaultChecked={property.amenities.includes(
                                            amenity
                                        )}
                                    />
                                    <Label
                                        htmlFor={`amenity_${amenity
                                            .toLowerCase()
                                            .replace(/\s/g, '_')}`}
                                        className='text-sm text-slate-600'
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
                        <CardTitle className='text-xl font-semibold text-slate-800'>
                            Rates (Leave blank if not applicable)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                            {['Weekly', 'Monthly', 'Nightly'].map((rate) => (
                                <div key={rate} className='space-y-2'>
                                    <Label
                                        htmlFor={`${rate.toLowerCase()}_rate`}
                                        className='text-sm font-medium text-slate-700'
                                    >
                                        {rate}
                                    </Label>
                                    <Input
                                        type='number'
                                        id={`${rate.toLowerCase()}_rate`}
                                        name={`rates.${rate.toLowerCase()}`}
                                        className='w-full'
                                        defaultValue={
                                            property.rates[rate.toLowerCase()]
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold text-slate-800'>
                            Seller Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='space-y-2'>
                            <Label
                                htmlFor='seller_name'
                                className='text-sm font-medium text-slate-700'
                            >
                                Seller Name
                            </Label>
                            <Input
                                id='seller_name'
                                name='seller_info.name'
                                placeholder='Name'
                                className='w-full'
                                defaultValue={property.seller_info.name}
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label
                                htmlFor='seller_email'
                                className='text-sm font-medium text-slate-700'
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
                                defaultValue={property.seller_info.email}
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label
                                htmlFor='seller_phone'
                                className='text-sm font-medium text-slate-700'
                            >
                                Seller Phone
                            </Label>
                            <Input
                                id='seller_phone'
                                name='seller_info.phone'
                                type='tel'
                                placeholder='Phone'
                                className='w-full'
                                defaultValue={property.seller_info.phone}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Button
                className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition-colors duration-300'
                type='submit'
                disabled={isSaving}
            >
                {isSaving && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                {isSaving ? 'Updating Property' : 'Update Property'}
            </Button>
        </form>
    );
}
