import PropertyAddForm from '@/components/PropertyAddForm';
import { Card, CardContent } from '@/components/ui/card';

export default async function PropertyAddPage() {
    return (
        <section className='bg-slate-100 min-h-screen py-4 sm:py-12'>
            <div className='container mx-auto max-w-4xl px-4'>
                <Card className='shadow-lg border-0'>
                    <CardContent className='p-4 sm:p-8'>
                        <PropertyAddForm />
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
