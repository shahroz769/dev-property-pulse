import { Skeleton } from '@/components/ui/skeleton';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function Loading() {
    return (
        <section className='bg-slate-50 flex-grow min-h-screen'>
            <div className='container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-6xl'>
                <Skeleton className='bg-slate-200 h-9 w-48 mb-6' />
                <div className='space-y-4'>
                    {[...Array(3)].map((_, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle className='flex justify-between items-center'>
                                    <Skeleton className='bg-slate-200 h-8 w-1/3' />
                                    <Skeleton className='bg-slate-200 h-8 w-12 rounded-full' />
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className='space-y-4'>
                                    <div>
                                        <Skeleton className='bg-slate-200 h-4 w-20 mb-1' />
                                        <Skeleton className='bg-slate-200 h-24 w-full rounded-lg' />
                                    </div>
                                    <div className='space-y-2'>
                                        {['From:', 'Phone:', 'Date:'].map(
                                            (label, i) => (
                                                <div
                                                    key={i}
                                                    className='flex flex-col sm:flex-row sm:items-center'
                                                >
                                                    <Skeleton className='bg-slate-200 h-6 w-16 mb-1 sm:mb-0 sm:mr-2' />
                                                    <Skeleton className='bg-slate-200 h-6 w-full sm:w-1/3' />
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className='flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4'>
                                <Skeleton className='bg-slate-200 h-10 w-full sm:w-32' />
                                <Skeleton className='bg-slate-200 h-10 w-full sm:w-32' />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
