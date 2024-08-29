'use client';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { Skeleton } from '@/components/ui/skeleton';
import addMessage from '@/app/actions/addMessage';
import SubmitMessageButton from '@/components/SubmitMessageButton';

const PropertyContactForm = ({ property }) => {
    const { data: session, status } = useSession();
    const [state, formAction] = useFormState(addMessage, {});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status !== 'loading') {
            setIsLoading(false);
        }
    }, [status]);

    useEffect(() => {
        if (state.error) toast.error(state.error);
        if (state.submitted) toast.success('Message sent successfully!');
    }, [state]);

    if (isLoading) {
        return (
            <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
                <div className='p-6 space-y-6'>
                    <Skeleton className='bg-gray-200 h-8 w-3/4 mb-8' />
                    <div className='space-y-6'>
                        {[...Array(3)].map((_, index) => (
                            <div key={index}>
                                <Skeleton className='bg-gray-200 h-4 w-1/4 mb-2' />
                                <Skeleton className='bg-gray-200 h-10 w-full' />
                            </div>
                        ))}
                        <div>
                            <Skeleton className='bg-gray-200 h-4 w-1/4 mb-2' />
                            <Skeleton className='bg-gray-200 h-24 w-full' />
                        </div>
                        <Skeleton className='bg-gray-200 h-10 w-full' />
                    </div>
                </div>
            </div>
        );
    }

    if (!session) {
        return (
            <div className='bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg'>
                <p className='font-medium'>
                    Please sign in to contact the property manager.
                </p>
            </div>
        );
    }

    if (state.submitted) {
        return (
            <div className='bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg'>
                <p className='font-medium'>
                    Your message has been sent successfully!
                </p>
            </div>
        );
    }

    return (
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
            <div className='p-6 space-y-6'>
                <h3 className='text-2xl font-bold text-gray-800 border-b pb-2'>
                    Contact Manager
                </h3>
                <form
                    action={formAction}
                    autoComplete='off'
                    className='space-y-4'
                >
                    <input
                        type='hidden'
                        id='property'
                        name='property'
                        defaultValue={property._id}
                    />
                    <input
                        type='hidden'
                        id='recipient'
                        name='recipient'
                        defaultValue={property.owner}
                    />

                    {['name', 'email', 'phone'].map((field) => (
                        <div key={field}>
                            <label
                                htmlFor={field}
                                className='block text-sm font-medium text-gray-700 mb-1'
                            >
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                id={field}
                                name={field}
                                type={field === 'email' ? 'email' : 'text'}
                                className='w-full px-3 py-2 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300'
                                placeholder={`Enter your ${field}`}
                                required={field !== 'phone'}
                            />
                        </div>
                    ))}

                    <div>
                        <label
                            htmlFor='message'
                            className='block text-sm font-medium text-gray-700 mb-1'
                        >
                            Message
                        </label>
                        <textarea
                            id='message'
                            name='message'
                            rows={4}
                            className='w-full px-3 py-2 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 resize-none'
                            placeholder='Enter your message'
                        ></textarea>
                    </div>

                    <div>
                        <SubmitMessageButton />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PropertyContactForm;
