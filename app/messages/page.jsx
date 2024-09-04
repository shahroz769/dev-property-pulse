import connectDB from '@/config/database';
import Message from '@/models/Message';
import MessageCard from '@/components/MessageCard';
import '@/models/Property';
import { convertToSerializeableObject } from '@/utils/convertToObject';
import { getSessionUser } from '@/utils/getSessionUser';

const MessagePage = async () => {
    await connectDB();

    const sessionUser = await getSessionUser();

    const { userId } = sessionUser;

    const readMessages = await Message.find({ recipient: userId, read: true })
        .sort({ createdAt: -1 })
        .populate('sender', 'username')
        .populate('property', 'name')
        .lean();

    const unreadMessages = await Message.find({
        recipient: userId,
        read: false,
    })
        .sort({ createdAt: -1 })
        .populate('sender', 'username')
        .populate('property', 'name')
        .lean();

    const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
        const message = convertToSerializeableObject(messageDoc);
        message.sender = convertToSerializeableObject(messageDoc.sender);
        message.property = convertToSerializeableObject(messageDoc.property);
        return message;
    });

    return (
        <section className='bg-slate-50 flex-grow min-h-screen'>
            <div className='container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-6xl'>
                <h1 className='text-3xl font-bold mb-6'>Your Messages</h1>

                <div className='space-y-4'>
                    {messages.length === 0 ? (
                        <p className='text-center text-gray-500'>
                            You have no messages
                        </p>
                    ) : (
                        messages.map((message) => (
                            <MessageCard key={message._id} message={message} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default MessagePage;
