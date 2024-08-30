import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PropertyCard from './PropertyCard';
import connectDB from '@/config/database';
import Property from '@/models/Property';

const HomeProperties = async () => {
    await connectDB();

    // Get the 3 latest properties
    const recentProperties = await Property.find({})
        .sort({ createdAt: -1 })
        .limit(3)
        .lean();

    return (
        <>
            <section className='px-4 pt-6'>
                <div className='container-xl lg:container m-auto'>
                    <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
                        Recent Properties
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {recentProperties.length === 0 ? (
                            <p>No Properties Found</p>
                        ) : (
                            recentProperties.map((property) => (
                                <PropertyCard
                                    key={property._id}
                                    property={property}
                                    home={true}
                                />
                            ))
                        )}
                    </div>
                </div>
            </section>

            <section className='m-auto max-w-lg my-10 px-6'>
                <Button
                    asChild
                    size='lg'
                    className='w-full bg-gray-900 hover:bg-gray-700 text-white'
                >
                    <Link href='/properties'>View All Properties</Link>
                </Button>
            </section>
        </>
    );
};

export default HomeProperties;
