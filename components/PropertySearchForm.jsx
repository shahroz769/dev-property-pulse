'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const propertyTypes = [
    { value: 'All', label: 'All' },
    { value: 'Apartment', label: 'Apartment' },
    { value: 'Studio', label: 'Studio' },
    { value: 'Condo', label: 'Condo' },
    { value: 'House', label: 'House' },
    { value: 'Cabin Or Cottage', label: 'Cabin or Cottage' },
    { value: 'Loft', label: 'Loft' },
    { value: 'Room', label: 'Room' },
    { value: 'Other', label: 'Other' },
];

export default function PropertySearchForm() {
    const [location, setLocation] = useState('');
    const [propertyType, setPropertyType] = useState('All');

    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (location === '' && propertyType === 'All') {
            router.push('/properties');
        } else {
            const query = `?location=${location}&propertyType=${propertyType}`;
            router.push(`/properties/search-results${query}`);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4'
            autoComplete='off'
        >
            <div className='w-full md:w-3/5'>
                <Input
                    type='text'
                    id='location'
                    placeholder='Enter Keywords or Location'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    autoComplete='off'
                    spellCheck='false'
                />
            </div>
            <div className='w-full md:w-2/5'>
                <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger>
                        <SelectValue placeholder='Select property type' />
                    </SelectTrigger>
                    <SelectContent>
                        {propertyTypes.map((type) => (
                            <SelectItem
                                key={type.value}
                                value={type.value}
                                className='hover:bg-primary/10 cursor-pointer'
                            >
                                {type.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Button
                type='submit'
                className='w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white'
            >
                Search
            </Button>
        </form>
    );
}
