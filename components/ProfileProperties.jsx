'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';
import deleteProperty from '@/app/actions/deleteProperty';
import ProfilePropertyCard from '@/components/ProfilePropertyCard';

export default function Component({ properties: initialProperties }) {
    const [properties, setProperties] = useState(initialProperties);

    const handleDeleteProperty = async (propertyId) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this property?'
        );

        if (!confirmed) return;

        const deletePropertyById = deleteProperty.bind(null, propertyId);

        await deletePropertyById();

        toast.success('Property Deleted');

        const updatedProperties = properties.filter(
            (property) => property._id !== propertyId
        );

        setProperties(updatedProperties);
    };

    return (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {properties.map((property, index) => (
                <ProfilePropertyCard
                    key={property._id}
                    property={property}
                    onDelete={handleDeleteProperty}
                    index={index}
                />
            ))}
        </div>
    );
}
