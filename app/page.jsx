import { Suspense } from 'react';
import Hero from '@/components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import FeaturedProperties from '@/components/FeaturedProperties';
import HomeProperties from '@/components/HomeProperties';
import {
    HeroSkeleton,
    InfoBoxesSkeleton,
    FeaturedPropertiesSkeleton,
    HomePropertiesSkeleton,
} from '@/components/HomeSkeletons';

const HomePage = () => {
    return (
        <>
            <Suspense fallback={<HeroSkeleton />}>
                <Hero />
            </Suspense>
            <Suspense fallback={<InfoBoxesSkeleton />}>
                <InfoBoxes />
            </Suspense>
            <Suspense fallback={<FeaturedPropertiesSkeleton />}>
                <FeaturedProperties />
            </Suspense>
            <Suspense fallback={<HomePropertiesSkeleton />}>
                <HomeProperties />
            </Suspense>
        </>
    );
};

export default HomePage;
