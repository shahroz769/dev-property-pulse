'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import bookmarkProperty from '@/app/actions/bookmarkProperty';
import checkBookmarkStatus from '@/app/actions/checkBookmarkStatus';
import { toast } from 'react-toastify';
import { Bookmark } from 'lucide-react';

const BookmarkButton = ({ property }) => {
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        checkBookmarkStatus(property._id).then((res) => {
            if (res.error) toast.error(res.error);
            if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
            setLoading(false);
        });
    }, [property._id, userId]);

    const handleClick = async () => {
        if (!userId) {
            toast.error('You need to sign in to bookmark a property');
            return;
        }

        bookmarkProperty(property._id).then((res) => {
            if (res.error) return toast.error(res.error);
            setIsBookmarked(res.isBookmarked);
            toast.success(res.message);
        });
    };

    if (loading)
        return (
            <div className='w-full h-10 bg-gray-200 rounded-md animate-pulse'></div>
        );

    return (
        <button
            onClick={handleClick}
            className={`w-full py-2 px-4 rounded-md flex items-center justify-center transition duration-300 ease-in-out ${
                isBookmarked
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
        >
            <Bookmark className='mr-2 h-5 w-5' />
            <span className='font-semibold'>
                {isBookmarked ? 'Remove Bookmark' : 'Bookmark Property'}
            </span>
        </button>
    );
};

export default BookmarkButton;
