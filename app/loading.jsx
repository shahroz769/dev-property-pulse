import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <>
            <HeroSkeleton />
            <InfoBoxesSkeleton />
            <FeaturedPropertiesSkeleton />
            <HomePropertiesSkeleton />
        </>
    );
}

function HeroSkeleton() {
    return (
        <section className='bg-blue-700 py-20 mb-4'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center'>
                <div className='text-center w-full md:w-3/5 md:pr-2 mb-1 md:mb-0'>
                    <Skeleton className='bg-gray-200 h-12 w-3/4 mx-auto mb-6 md:mb-6' />
                    <Skeleton className='bg-gray-200 h-6 w-1/2 mx-auto mb-2 md:mb-3' />
                </div>
                <div className='mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center'>
                    <div className='w-full md:w-3/5 md:pr-2 mb-4 md:mb-0'>
                        <Skeleton className='bg-gray-200 h-10 w-full rounded-lg' />
                    </div>
                    <div className='w-full md:w-2/5 md:pl-2 mb-4 md:mb-0'>
                        <Skeleton className='bg-gray-200 h-10 w-full rounded-lg' />
                    </div>
                    <Skeleton className='bg-gray-200 md:ml-4 md:mt-0 w-full md:w-auto h-10 px-6 rounded-lg' />
                </div>
            </div>
        </section>
    );
}

function InfoBoxesSkeleton() {
    return (
        <section>
            <div className='container-xl lg:container m-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg mb-4'>
                    {[...Array(2)].map((_, index) => (
                        <div key={index} className='p-6 rounded-lg bg-gray-100'>
                            <Skeleton className='bg-gray-200 h-8 w-1/2 mb-4' />
                            <Skeleton className='bg-gray-200 h-4 w-full mb-2' />
                            <Skeleton className='bg-gray-200 h-4 w-3/4 mb-4' />
                            <Skeleton className='bg-gray-200 h-10 w-1/2 rounded-lg' />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FeaturedPropertiesSkeleton() {
    return (
        <section className='bg-blue-50 px-4 pt-6 pb-10'>
            <div className='container-xl lg:container m-auto'>
                <Skeleton className='bg-gray-200 h-10 w-64 mx-auto mb-6' />
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {[...Array(2)].map((_, index) => (
                        <FeaturedPropertyCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FeaturedPropertyCardSkeleton() {
    return (
        <div className='bg-white rounded-xl shadow-md relative flex flex-col lg:flex-row'>
            <div className='relative w-full lg:w-[260px] min-h-[260px] max-h-max'>
                <Skeleton className='bg-gray-200 w-full h-full rounded-xl' />
                <Skeleton className='bg-gray-200 absolute top-2 right-2 lg:left-2 lg:right-auto w-20 h-6 rounded-lg' />
            </div>
            <div className='flex-grow p-4 flex flex-col justify-between'>
                <div>
                    <div className='mb-4 lg:mb-6'>
                        <Skeleton className='bg-gray-200 w-20 h-6 rounded-full mb-2' />
                        <Skeleton className='bg-gray-200 w-3/4 h-8 mb-2' />
                    </div>
                    <div className='flex flex-col items-center gap-4 mb-4'>
                        <div className='flex justify-center items-center gap-4 sm:gap-6'>
                            {[...Array(3)].map((_, i) => (
                                <Skeleton
                                    key={i}
                                    className='bg-gray-200 w-16 h-6'
                                />
                            ))}
                        </div>
                        <div className='flex flex-wrap justify-center items-center gap-4 sm:gap-6'>
                            {[...Array(3)].map((_, i) => (
                                <Skeleton
                                    key={i}
                                    className='bg-gray-200 w-20 h-6'
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <div className='border-t border-gray-200 mb-4'></div>
                    <div className='flex flex-col sm:flex-row justify-between items-center'>
                        <Skeleton className='bg-gray-200 w-1/2 h-6 mb-4 sm:mb-0' />
                        <Skeleton className='bg-gray-200 w-full sm:w-32 h-10 rounded-lg' />
                    </div>
                </div>
            </div>
        </div>
    );
}

function HomePropertiesSkeleton() {
    return (
        <>
            <section className='px-4 pt-6'>
                <div className='container-xl lg:container m-auto'>
                    <Skeleton className='bg-gray-200 h-10 w-64 mx-auto mb-6' />
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {[...Array(3)].map((_, index) => (
                            <PropertyCardSkeleton key={index} />
                        ))}
                    </div>
                </div>
            </section>

            <section className='m-auto max-w-lg my-10 px-6'>
                <Skeleton className='bg-gray-200 h-12 w-full rounded-xl' />
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
