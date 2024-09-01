import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <div className='min-h-screen bg-slate-100 py-12'>
            <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Profile Card */}
                <div className='bg-white rounded-lg overflow-hidden mb-10'>
                    <div className='p-6'>
                        <div className='flex flex-col md:flex-row md:items-center md:space-x-8'>
                            <div className='flex-shrink-0 mb-6 md:mb-0'>
                                <Skeleton className='bg-slate-200 h-32 w-32 rounded-full' />
                            </div>
                            <div>
                                <Skeleton className='bg-slate-200 h-8 w-32 mb-2' />
                                <Skeleton className='bg-slate-200 h-4 w-48' />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Listings Section */}
                <div>
                    <Skeleton className='bg-slate-200 h-8 w-48 mb-4' />
                    <Skeleton className='bg-slate-200 h-4 w-32 mb-6' />

                    {/* Property Cards */}
                    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                        {[...Array(9)].map((_, index) => (
                            <div
                                key={index}
                                className='rounded-xl relative bg-white'
                            >
                                <Skeleton className='bg-slate-200 w-full h-[300px] rounded-t-xl' />
                                <div className='p-4'>
                                    <Skeleton className='bg-slate-200 h-6 w-20 mb-4 rounded-full' />
                                    <Skeleton className='bg-slate-200 h-6 w-3/4 mb-4' />
                                    <div className='flex justify-center items-center gap-6 mb-4'>
                                        <Skeleton className='bg-slate-200 h-4 w-16' />
                                        <Skeleton className='bg-slate-200 h-4 w-16' />
                                        <Skeleton className='bg-slate-200 h-4 w-16' />
                                    </div>
                                    <Skeleton className='bg-slate-200 h-px w-full my-4' />
                                    <div className='flex gap-2 flex-col sm:flex-row'>
                                        <Skeleton className='bg-slate-200 h-10 flex-grow' />
                                        <Skeleton className='bg-slate-200 h-10 flex-grow' />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
