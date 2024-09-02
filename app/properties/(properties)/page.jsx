import PropertyCard from '@/components/PropertyCard';
import PropertySearchForm from '@/components/PropertySearchForm';
import Pagination from '@/components/Pagination';
const PropertiesPage = async ({ searchParams: { pageSize = 9, page = 1 } }) => {
    const skip = (page - 1) * pageSize;

    return (
        <>
            <section className='bg-blue-700 py-4'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start'>
                    <PropertySearchForm />
                </div>
            </section>
            <section className='px-4 pt-6 pb-10'>
                <div className='container-xl lg:container m-auto px-4 pt-6'>
                    <h1 className='text-2xl mb-4'>Browse Properties</h1>
                    <PropertiesGrid skip={skip} pageSize={pageSize} />
                    <PaginationWrapper page={page} pageSize={pageSize} />
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
