import PropertyAddForm from '@/components/PropertyAddForm';

const PropertyAddPage = () => {
    return (
        <section className='bg-gray-100 min-h-screen py-12'>
            <div className='container mx-auto max-w-3xl'>
                <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
                    <div className='p-8'>
                        <PropertyAddForm />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PropertyAddPage;
