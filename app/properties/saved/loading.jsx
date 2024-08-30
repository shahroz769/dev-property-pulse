import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <>
            <section className='px-4 py-6'>
                <div className='container-xl lg:container m-auto px-4 py-6'>
                    <Skeleton className='bg-gray-200 w-48 h-8 mb-4' />
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {[...Array(9)].map((_, index) => (
                            <PropertyCardSkeleton key={index} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

function PropertyCardSkeleton() {
    return (
        <div className='rounded-xl shadow-md relative bg-white'>
            <Skeleton className='bg-gray-200 w-full h-[300px] rounded-t-xl' />
            <div className='p-4'>
                <Skeleton className='bg-gray-200 w-20 h-6 mb-2' />
                <Skeleton className='bg-gray-200 w-3/4 h-6 mb-4' />
                <div className='flex justify-center items-center gap-6 mb-4'>
                    <Skeleton className='bg-gray-200 w-16 h-6' />
                    <Skeleton className='bg-gray-200 w-16 h-6' />
                    <Skeleton className='bg-gray-200 w-16 h-6' />
                </div>
                <div className='flex justify-center items-center gap-6 mb-4'>
                    <Skeleton className='bg-gray-200 w-20 h-6' />
                    <Skeleton className='bg-gray-200 w-20 h-6' />
                </div>
                <Skeleton className='bg-gray-200 w-full h-[1px] my-4' />
                <div className='flex flex-col sm:flex-row justify-between items-center'>
                    <Skeleton className='bg-gray-200 w-32 h-6 mb-4 sm:mb-0' />
                    <Skeleton className='bg-gray-200 w-full sm:w-32 h-10 rounded-lg' />
                </div>
            </div>
        </div>
    );
}
