import Hero from '../components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import HomeProperties from '@/components/HomeProperties';
import FeaturedProperties from '@/components/FeaturedProperties';
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const HomePage = async () => {
    await delay(5000);
    return (
        <>
            <Hero />
            <InfoBoxes />
            <FeaturedProperties />
            <HomeProperties />
        </>
    );
};
export default HomePage;
