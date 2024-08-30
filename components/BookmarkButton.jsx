'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { Bookmark, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import bookmarkProperty from '@/app/actions/bookmarkProperty';
import checkBookmarkStatus from '@/app/actions/checkBookmarkStatus';

export default function BookmarkButton({ property }) {
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

        setLoading(true);
        bookmarkProperty(property._id).then((res) => {
            if (res.error) {
                toast.error(res.error);
            } else {
                setIsBookmarked(res.isBookmarked);
                toast.success(res.message);
            }
            setLoading(false);
        });
    };

    return (
        <Button
            onClick={handleClick}
            variant={isBookmarked ? 'destructive' : 'default'}
            className='w-full'
            disabled={loading}
        >
            {loading ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
                <Bookmark className='mr-2 h-4 w-4' />
            )}
            <span>
                {loading
                    ? 'Processing...'
                    : isBookmarked
                    ? 'Remove Bookmark'
                    : 'Bookmark Property'}
            </span>
        </Button>
    );
}
