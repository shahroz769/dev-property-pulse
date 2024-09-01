import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const HeaderImageSkeleton = () => (
    <section>
        <div className='container-xl m-auto'>
            <div className='grid grid-cols-1'>
                <Skeleton className='bg-slate-200 h-[400px] w-full' />
            </div>
        </div>
    </section>
);

const BackToPropertiesLink = () => (
    <section>
        <div className='container m-auto py-6 px-6'>
            <Link
                href='/properties'
                className='text-blue-500 hover:text-blue-600 flex items-center'
            >
                <ArrowLeft className='mr-2' /> Back to Properties
            </Link>
        </div>
    </section>
);

const PropertyDetailsSkeleton = () => (
    <div className='bg-white rounded-xl overflow-hidden'>
        <div className='p-4 sm:p-8 space-y-6 sm:space-y-8'>
            <div className='space-y-4'>
                <Skeleton className='bg-slate-200 h-6 w-24' />
                <Skeleton className='bg-slate-200 h-10 w-3/4' />
                <Skeleton className='bg-slate-200 h-6 w-1/2' />
            </div>

            <div className='bg-slate-50 p-4 sm:p-6 rounded-xl'>
                <Skeleton className='bg-slate-200 h-8 w-48 mb-4' />
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    {[...Array(3)].map((_, index) => (
                        <div
                            key={index}
                            className='flex flex-col p-3 sm:p-4 bg-white rounded-lg'
                        >
                            <Skeleton className='bg-slate-200 h-7 w-20 mb-2' />
                            <Skeleton className='bg-slate-200 h-7 w-24' />
                        </div>
                    ))}
                </div>
            </div>

            <div className='space-y-4'>
                <Skeleton className='bg-slate-200 h-8 w-36' />
                <Skeleton className='bg-slate-200 h-4 w-full' />
                <Skeleton className='bg-slate-200 h-4 w-full' />
                <Skeleton className='bg-slate-200 h-4 w-3/4' />
            </div>

            <div className='space-y-6'>
                <Skeleton className='bg-slate-200 h-8 w-24' />
                <div className='flex flex-col sm:flex-row items-start pl-4 justify-center sm:space-x-8 space-y-4 sm:space-y-0'>
                    {[...Array(3)].map((_, index) => (
                        <Skeleton
                            key={index}
                            className='bg-slate-200 h-6 w-24'
                        />
                    ))}
                </div>
            </div>

            <div className='space-y-6'>
                <Skeleton className='bg-slate-200 h-8 w-32' />
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    {[...Array(6)].map((_, index) => (
                        <Skeleton
                            key={index}
                            className='bg-slate-200 h-10 w-full'
                        />
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const SidebarSkeleton = () => (
    <aside className='space-y-4'>
        <div className='rounded-lg overflow-hidden space-y-4'>
            <Skeleton className='bg-slate-200 h-9 w-full mb-4' />
            <div className='flex gap-3 justify-center'>
                {[...Array(4)].map((_, index) => (
                    <Skeleton
                        key={index}
                        className='bg-slate-200 h-10 w-10 rounded-full'
                    />
                ))}
            </div>
        </div>

        <Skeleton className='bg-slate-200 h-10 w-full' />

        <div className='bg-white rounded-lg shadow-lg overflow-hidden p-6 space-y-6'>
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
    </aside>
);

const PropertyImagesSkeleton = () => (
    <section className='bg-blue-50 pb-10'>
        <div className='container px-6 mx-auto'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {[...Array(3)].map((_, index) => (
                    <Skeleton
                        key={index}
                        className={`bg-slate-200 h-[400px] w-full rounded-xl ${
                            index === 2 ? 'sm:col-span-2' : ''
                        }`}
                    />
                ))}
            </div>
        </div>
    </section>
);

export default function Loading() {
    return (
        <>
            <HeaderImageSkeleton />
            <BackToPropertiesLink />
            <section className='bg-blue-50'>
                <div className='container m-auto py-10 px-6'>
                    <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
                        <PropertyDetailsSkeleton />
                        <SidebarSkeleton />
                    </div>
                </div>
            </section>
            <PropertyImagesSkeleton />
        </>
    );
}
