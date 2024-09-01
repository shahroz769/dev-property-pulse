'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import addMessage from '@/app/actions/addMessage';
import SubmitMessageButton from './SubmitMessageButton';

export default function PropertyContactForm({ property }) {
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
            <div className='bg-white rounded-lg overflow-hidden p-6 space-y-6'>
                <Skeleton className='bg-slate-200 h-8 w-3/4 mb-8' />
                {[...Array(3)].map((_, index) => (
                    <div key={index} className='space-y-2'>
                        <Skeleton className='bg-slate-200 h-4 w-1/4' />
                        <Skeleton className='bg-slate-200 h-10 w-full' />
                    </div>
                ))}
                <div className='space-y-2'>
                    <Skeleton className='bg-slate-200 h-4 w-1/4' />
                    <Skeleton className='bg-slate-200 h-24 w-full' />
                </div>
                <Skeleton className='bg-slate-200 h-10 w-full' />
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
        <div className='bg-white rounded-lg overflow-hidden'>
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
                        <div key={field} className='space-y-2'>
                            <Label htmlFor={field}>
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </Label>
                            <Input
                                id={field}
                                name={field}
                                type={field === 'email' ? 'email' : 'text'}
                                placeholder={`Enter your ${field}`}
                                required={field !== 'phone'}
                            />
                        </div>
                    ))}

                    <div className='space-y-2'>
                        <Label htmlFor='message'>Message</Label>
                        <Textarea
                            id='message'
                            name='message'
                            rows={4}
                            placeholder='Enter your message'
                        />
                    </div>

                    <SubmitMessageButton />
                </form>
            </div>
        </div>
    );
}
