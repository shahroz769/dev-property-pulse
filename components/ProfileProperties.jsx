'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import deleteProperty from '@/app/actions/deleteProperty';
import ProfilePropertyCard from '@/components/ProfilePropertyCard';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export default function Component({ properties: initialProperties }) {
    const [properties, setProperties] = useState(initialProperties);
    const [propertyToDelete, setPropertyToDelete] = useState(null);

    const handleDeleteProperty = async (propertyId) => {
        setPropertyToDelete(propertyId);
    };

    const confirmDelete = async () => {
        if (!propertyToDelete) return;

        const deletePropertyById = deleteProperty.bind(null, propertyToDelete);

        await deletePropertyById();

        toast.success('Property Deleted');

        const updatedProperties = properties.filter(
            (property) => property._id !== propertyToDelete
        );

        setProperties(updatedProperties);
        setPropertyToDelete(null);
    };

    return (
        <>
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

            <AlertDialog
                open={!!propertyToDelete}
                onOpenChange={() => setPropertyToDelete(null)}
            >
                <AlertDialogContent className='bg-white rounded-lg shadow-sm'>
                    <AlertDialogHeader>
                        <AlertDialogTitle className='text-2xl font-bold text-slate-800'>
                            Are you sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription className='text-slate-600'>
                            This action cannot be undone. Deleting this property
                            is permanent. Are you sure you want to proceed?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel asChild>
                            <Button
                                variant='outline'
                                className='border-slate-300 text-slate-700 hover:bg-slate-100'
                            >
                                Cancel
                            </Button>
                        </AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button
                                onClick={confirmDelete}
                                className='bg-red-500 text-white hover:bg-red-600'
                            >
                                Delete
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
