import { Suspense } from 'react';
import PropertyCard from '@/components/PropertyCard';
import PropertySearchForm from '@/components/PropertySearchForm';
import Pagination from '@/components/Pagination';
import { Skeleton } from '@/components/ui/skeleton';

const PropertiesPage = async ({ searchParams: { pageSize = 9, page = 1 } }) => {
    const skip = (page - 1) * pageSize;

    return (
        <>
            <section className='bg-blue-700 py-4'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start'>
                    <Suspense fallback={<SearchFormSkeleton />}>
                        <PropertySearchForm />
                    </Suspense>
                </div>
            </section>
            <section className='px-4 pt-6 pb-10'>
                <div className='container-xl lg:container m-auto px-4 pt-6'>
                    <Suspense
                        fallback={
                            <Skeleton className='bg-slate-200 w-48 h-8 mb-4' />
                        }
                    >
                        <h1 className='text-2xl mb-4'>Browse Properties</h1>
                    </Suspense>
                    <Suspense fallback={<PropertiesGridSkeleton />}>
                        <PropertiesGrid skip={skip} pageSize={pageSize} />
                    </Suspense>
                    <Suspense fallback={<PaginationSkeleton />}>
                        <PaginationWrapper page={page} pageSize={pageSize} />
                    </Suspense>
                </div>
            </section>
        </>
    );
};

const PropertiesGrid = async ({ skip, pageSize }) => {
    const Property = (await import('@/models/Property')).default;
    const connectDB = (await import('@/config/database')).default;
    await connectDB();
    const properties = await Property.find({}).skip(skip).limit(pageSize);

    if (properties.length === 0) {
        return <p>No properties found</p>;
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {properties.map((property, index) => (
                <PropertyCard property={property} key={index} index={index} />
            ))}
        </div>
    );
};

const PaginationWrapper = async ({ page, pageSize }) => {
    const Property = (await import('@/models/Property')).default;
    const connectDB = (await import('@/config/database')).default;

    await connectDB();
    const total = await Property.countDocuments({});
    const showPagination = total > pageSize;

    if (!showPagination) {
        return null;
    }

    return (
        <Pagination
            page={parseInt(page)}
            pageSize={parseInt(pageSize)}
            totalItems={total}
        />
    );
};

export default PropertiesPage;

// Skeleton components
const SearchFormSkeleton = () => (
    <div className='mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center'>
        <div className='w-full md:w-3/5 md:pr-2 mb-4 md:mb-0'>
            <Skeleton className='bg-slate-200 w-full h-[40px] rounded-lg' />
        </div>
        <div className='w-full md:w-2/5 md:pl-2'>
            <Skeleton className='bg-slate-200 w-full h-[40px] rounded-lg' />
        </div>
        <div className='md:ml-4 mt-4 md:mt-0 w-full md:w-auto'>
            <Skeleton className='bg-slate-200 w-full md:w-[100px] h-[40px] rounded-lg' />
        </div>
    </div>
);

const PropertiesGridSkeleton = () => (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {[...Array(9)].map((_, index) => (
            <PropertyCardSkeleton key={index} />
        ))}
    </div>
);

const PropertyCardSkeleton = () => (
    <div className='rounded-xl relative bg-slate-50'>
        <Skeleton className='bg-slate-200 w-full h-[300px] rounded-t-xl' />
        <div className='p-4'>
            <Skeleton className='bg-slate-200 w-20 h-6 mb-2' />
            <Skeleton className='bg-slate-200 w-3/4 h-6 mb-4' />
            <div className='flex flex-col items-center gap-4 mb-4'>
                <div className='flex justify-center items-center gap-6 text-slate-500'>
                    <Skeleton className='bg-slate-200 w-16 h-6' />
                    <Skeleton className='bg-slate-200 w-16 h-6' />
                    <Skeleton className='bg-slate-200 w-16 h-6' />
                </div>
                <div className='flex justify-center items-center gap-6 text-green-600'>
                    <Skeleton className='bg-slate-200 w-20 h-6' />
                    <Skeleton className='bg-slate-200 w-20 h-6' />
                </div>
            </div>
            <Skeleton className='bg-slate-200 w-full h-[1px] my-4' />
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                <Skeleton className='bg-slate-200 w-full sm:w-32 h-6' />
                <Skeleton className='bg-slate-200 w-full sm:w-32 h-10 rounded-lg' />
            </div>
        </div>
    </div>
);

const PaginationSkeleton = () => (
    <div className='mt-10 flex justify-center'>
        <Skeleton className='bg-slate-200 w-64 h-10 rounded-lg' />
    </div>
);
