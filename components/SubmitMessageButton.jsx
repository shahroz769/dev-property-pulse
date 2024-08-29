import { useFormStatus } from 'react-dom';
import { MessageCircle } from 'lucide-react';

const SubmitMessageButton = () => {
    const { pending } = useFormStatus();
    return (
        <button
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md w-full focus:outline-none focus:shadow-outline flex items-center justify-center'
            type='submit'
            disabled={pending}
        >
            <MessageCircle className='mr-2' />{' '}
            {pending ? 'Sending...' : 'Send Message'}
        </button>
    );
};

export default SubmitMessageButton;
