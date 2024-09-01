'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';
import markMessageAsRead from '@/app/actions/markMessageAsRead';
import deleteMessage from '@/app/actions/deleteMessage';
import { useGlobalContext } from '@/context/GlobalContext';

const MessageCard = ({ message }) => {
    const [isRead, setIsRead] = useState(message.read);
    const [isDeleted, setIsDeleted] = useState(false);

    const { setUnreadCount } = useGlobalContext();

    const handleReadClick = async () => {
        const read = await markMessageAsRead(message._id);
        setIsRead(read);
        setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
        toast.success(`Marked as ${read ? 'read' : 'new'}`);
    };

    const handleDeleteClick = async () => {
        await deleteMessage(message._id);
        setIsDeleted(true);
        setUnreadCount((prevCount) => (isRead ? prevCount : prevCount - 1));
        toast.success('Message Deleted');
    };

    if (isDeleted) {
        return <p>Deleted message</p>;
    }

    return (
        <div className='bg-white rounded-lg shadow-sm overflow-hidden border border-slate-200'>
            <div className='p-6'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-2xl font-bold text-slate-800 text-center flex-grow'>
                        {message.property.name}
                    </h2>
                    {!isRead && (
                        <span className='bg-yellow-400 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full ml-4'>
                            New
                        </span>
                    )}
                </div>
                <div className='bg-slate-100 p-4 rounded-lg mb-4'>
                    <p className='text-slate-700 font-semibold'>
                        {message.body}
                    </p>
                </div>
                <div className='space-y-2'>
                    <div className='flex items-center'>
                        <span className='text-slate-600 w-24'>From:</span>
                        <a
                            href={`mailto:${message.email}`}
                            className='text-slate-600 font-semibold no-underline hover:underline'
                        >
                            {message.email}
                        </a>
                    </div>
                    <div className='flex items-center'>
                        <span className='text-slate-600 w-24'>Phone:</span>
                        <a
                            href={`tel:${message.phone}`}
                            className='text-slate-600 font-semibold no-underline hover:underline'
                        >
                            {message.phone}
                        </a>
                    </div>

                    <div className='flex items-center'>
                        <span className='text-slate-600 w-24'>Received:</span>
                        <span className='text-slate-600 font-semibold'>
                            {new Date(message.createdAt).toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
            <div className='bg-slate-50 px-6 py-4 flex justify-end'>
                <button
                    onClick={handleReadClick}
                    className={`mr-4 px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
                        isRead
                            ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                >
                    {isRead ? 'Mark As New' : 'Mark As Read'}
                </button>
                <button
                    onClick={handleDeleteClick}
                    className='px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition-colors duration-300'
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default MessageCard;
