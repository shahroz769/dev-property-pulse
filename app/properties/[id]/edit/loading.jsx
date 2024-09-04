import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function Loading() {
    return (
        <section className='bg-slate-100 min-h-screen py-4 sm:py-12'>
            <div className='container mx-auto max-w-4xl px-4'>
                <Card className='shadow-sm border-0'>
                    <CardContent className='p-4 sm:p-8'>
                        <div className='space-y-6'>
                            <CardHeader className='p-0 sm:p-6'>
                                <Skeleton className='bg-slate-200 h-8 w-3/4 mx-auto' />
                            </CardHeader>

                            <div className='space-y-2'>
                                <Skeleton className='bg-slate-200 h-4 w-1/4' />
                                <Skeleton className='bg-slate-200 h-10 w-full' />
                            </div>

                            <div className='space-y-2'>
                                <Skeleton className='bg-slate-200 h-4 w-1/4' />
                                <Skeleton className='bg-slate-200 h-10 w-full' />
                            </div>

                            <div className='space-y-2'>
                                <Skeleton className='bg-slate-200 h-4 w-1/4' />
                                <Skeleton className='bg-slate-200 h-24 w-full' />
                            </div>

                            <Card>
                                <CardHeader>
                                    <Skeleton className='bg-slate-200 h-6 w-1/3' />
                                </CardHeader>
                                <CardContent className='space-y-4'>
                                    <Skeleton className='bg-slate-200 h-10 w-full' />
                                    <Skeleton className='bg-slate-200 h-10 w-full' />
                                    <Skeleton className='bg-slate-200 h-10 w-full' />
                                    <Skeleton className='bg-slate-200 h-10 w-full' />
                                </CardContent>
                            </Card>

                            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className='space-y-2'>
                                        <Skeleton className='bg-slate-200 h-4 w-1/2' />
                                        <Skeleton className='bg-slate-200 h-10 w-full' />
                                    </div>
                                ))}
                            </div>

                            <Card>
                                <CardHeader>
                                    <Skeleton className='bg-slate-200 h-6 w-1/3' />
                                </CardHeader>
                                <CardContent>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                                        {Array(15)
                                            .fill()
                                            .map((_, index) => (
                                                <div
                                                    key={index}
                                                    className='flex items-center space-x-2'
                                                >
                                                    <Skeleton className='bg-slate-200 h-4 w-4' />
                                                    <Skeleton className='bg-slate-200 h-4 w-24' />
                                                </div>
                                            ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <Skeleton className='bg-slate-200 h-6 w-1/2' />
                                </CardHeader>
                                <CardContent>
                                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                                        {[1, 2, 3].map((item) => (
                                            <div
                                                key={item}
                                                className='space-y-2'
                                            >
                                                <Skeleton className='bg-slate-200 h-4 w-1/2' />
                                                <Skeleton className='bg-slate-200 h-10 w-full' />
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <Skeleton className='bg-slate-200 h-6 w-1/3' />
                                </CardHeader>
                                <CardContent className='space-y-4'>
                                    <div className='space-y-2'>
                                        <Skeleton className='bg-slate-200 h-4 w-1/4' />
                                        <Skeleton className='bg-slate-200 h-10 w-full' />
                                    </div>
                                    <div className='space-y-2'>
                                        <Skeleton className='bg-slate-200 h-4 w-1/4' />
                                        <Skeleton className='bg-slate-200 h-10 w-full' />
                                    </div>
                                    <div className='space-y-2'>
                                        <Skeleton className='bg-slate-200 h-4 w-1/4' />
                                        <Skeleton className='bg-slate-200 h-10 w-full' />
                                    </div>
                                </CardContent>
                            </Card>
                            <Skeleton className='bg-slate-200 h-10 w-full' />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
