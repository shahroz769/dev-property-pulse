import Image from 'next/image';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { convertToSerializeableObject } from '@/utils/convertToObject';
import ProfileProperties from '@/components/ProfileProperties';
import profileDefault from '@/assets/images/profile.png';

const ProfilePage = async () => {
    await connectDB();

    const sessionUser = await getSessionUser();

    const { userId } = sessionUser;

    if (!userId) {
        throw new Error('User ID is required');
    }

    const propertiesDocs = await Property.find({ owner: userId }).lean();
    const properties = propertiesDocs.map(convertToSerializeableObject);

    return (
        <div className='min-h-screen bg-slate-100 py-12'>
            <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='bg-white rounded-lg shadow-md overflow-hidden mb-8'>
                    <div className='p-6'>
                        <div className='flex flex-col md:flex-row md:items-center md:space-x-8'>
                            <div className='flex-shrink-0 mb-6 md:mb-0'>
                                <Image
                                    className='h-32 w-32 rounded-full object-cover hover:opacity-75 transition duration-300 ease-in-out'
                                    src={
                                        sessionUser.user.image || profileDefault
                                    }
                                    width={200}
                                    height={200}
                                    alt={sessionUser.user.name}
                                />
                            </div>
                            <div>
                                <h2 className='text-2xl font-semibold mb-2'>
                                    {sessionUser.user.name}
                                </h2>
                                <p className='text-gray-600'>
                                    {sessionUser.user.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className='text-2xl font-bold mb-4'>Your Listings</h2>
                    <p className='text-gray-600 mb-6'>
                        Total Listings: {properties.length}
                    </p>
                    {properties.length === 0 ? (
                        <p className='bg-white rounded-lg shadow-md p-6 text-center text-gray-500'>
                            You have no property listings
                        </p>
                    ) : (
                        <div className='rounded-lg overflow-hidden'>
                            <ProfileProperties properties={properties} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
