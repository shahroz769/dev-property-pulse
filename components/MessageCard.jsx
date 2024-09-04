'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import markMessageAsRead from '@/app/actions/markMessageAsRead';
import deleteMessage from '@/app/actions/deleteMessage';
import { useGlobalContext } from '@/context/GlobalContext';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function Component({ message }) {
    const [isRead, setIsRead] = useState(message.read);
    const { setUnreadCount } = useGlobalContext();

    const handleReadClick = async () => {
        const read = await markMessageAsRead(message._id);
        setIsRead(read);
        setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
        toast.success(`Marked as ${read ? 'read' : 'new'}`);
    };

    const handleDeleteClick = async () => {
        await deleteMessage(message._id);
        setUnreadCount((prevCount) => (isRead ? prevCount : prevCount - 1));
        toast.success('Message Deleted');
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className='flex justify-between items-center'>
                    <span>{message.property.name}</span>
                    {!isRead && (
                        <span className='bg-emerald-100 text-emerald-600 text-sm font-semibold px-3 py-1 rounded-full'>
                            New
                        </span>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='space-y-4'>
                    <div>
                        <h3 className='text-sm font-semibold text-slate-500 mb-1'>
                            Message:
                        </h3>
                        <div className='bg-slate-100 p-4 rounded-lg'>
                            <p className='text-slate-700 font-semibold'>
                                {message.body}
                            </p>
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <div className='flex flex-col sm:flex-row sm:items-center'>
                            <h3 className='text-sm font-semibold text-slate-500 mb-1 sm:mb-0 sm:mr-2 sm:w-16'>
                                From:
                            </h3>
                            <div className='flex items-center'>
                                <a
                                    href={`mailto:${message.email}`}
                                    className='text-slate-600 font-semibold no-underline hover:underline'
                                >
                                    {message.email}
                                </a>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row sm:items-center'>
                            <h3 className='text-sm font-semibold text-slate-500 mb-1 sm:mb-0 sm:mr-2 sm:w-16'>
                                Phone:
                            </h3>
                            <div className='flex items-center'>
                                <a
                                    href={`tel:${message.phone}`}
                                    className='text-slate-600 font-semibold no-underline hover:underline'
                                >
                                    {message.phone}
                                </a>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row sm:items-center'>
                            <h3 className='text-sm font-semibold text-slate-500 mb-1 sm:mb-0 sm:mr-2 sm:w-16'>
                                Date:
                            </h3>
                            <div className='flex items-center'>
                                <span className='text-slate-600 font-semibold'>
                                    {new Date(
                                        message.createdAt
                                    ).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className='flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4'>
                <Button
                    onClick={handleReadClick}
                    variant={isRead ? 'secondary' : 'default'}
                    className='w-full sm:w-auto'
                >
                    {isRead ? 'Mark As New' : 'Mark As Read'}
                </Button>
                <Button
                    onClick={handleDeleteClick}
                    variant='destructive'
                    className='w-full sm:w-auto'
                >
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
}
