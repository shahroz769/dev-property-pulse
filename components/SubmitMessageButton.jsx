import { useFormStatus } from 'react-dom';
import { MessageCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SubmitMessageButton() {
    const { pending } = useFormStatus();

    return (
        <Button className='w-full' type='submit' disabled={pending}>
            {pending ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
                <MessageCircle className='mr-2 h-4 w-4' />
            )}
            {pending ? 'Sending...' : 'Send Message'}
        </Button>
    );
}
