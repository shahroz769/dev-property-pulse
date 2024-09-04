import PropertyEditForm from '@/components/PropertyEditForm';
import { Card, CardContent } from '@/components/ui/card';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializeableObject } from '@/utils/convertToObject';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const PropertyEditPage = async ({ params }) => {
await delay(5000);
    await connectDB();
    const propertyDoc = await Property.findById(params.id).lean();
    const property = convertToSerializeableObject(propertyDoc);

    if (!property) {
        return (
            <h1 className='text-center text-2xl font-bold mt-10'>
                Property Not Found
            </h1>
        );
    }

    return (
        <section className='bg-slate-100 min-h-screen py-4 sm:py-12'>
            <div className='container mx-auto max-w-4xl px-4'>
                <Card className='shadow-sm border-0'>
                    <CardContent className='p-4 sm:p-8'>
                        <PropertyEditForm property={property} />
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default PropertyEditPage;
