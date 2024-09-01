import InfoBox from '@/components/InfoBox';

const InfoBoxes = () => {
    return (
        <section>
            <div className='container-xl lg:container mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg mb-4'>
                    <InfoBox
                        heading='For Renters'
                        backgroundColor='bg-slate-50'
                        buttonText='Browse Properties'
                        buttonLink='/properties'
                        buttonClassName='bg-slate-900 hover:bg-slate-700 text-white'
                    >
                        Find your dream rental property. Bookmark properties and
                        contact owners.
                    </InfoBox>
                    <InfoBox
                        heading='For Property Owners'
                        backgroundColor='bg-blue-50'
                        buttonText='Add Property'
                        buttonLink='/properties/add'
                        buttonClassName='bg-blue-500 hover:bg-blue-600 text-white'
                    >
                        List your properties and reach potential tenants. Rent
                        as an Airbnb or long term.
                    </InfoBox>
                </div>
            </div>
        </section>
    );
};

export default InfoBoxes;
