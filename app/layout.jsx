import { Poppins } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { GlobalProvider } from '@/context/GlobalContext';
import { Toaster } from 'sonner';
import '@/assets/styles/globals.css';
import 'photoswipe/dist/photoswipe.css';

export const metadata = {
    title: 'PropertyPulse',
    description: 'Find The Perfect Rental Property',
    keywords: 'rental, property, real estate',
};

const poppins = Poppins({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
    display: 'swap',
});

const MainLayout = ({ children }) => {
    return (
        <AuthProvider>
            <GlobalProvider>
                <html lang='en' className={poppins.className}>
                    <body className='flex flex-col min-h-screen'>
                        <Navbar />
                        <main className='flex-grow'>{children}</main>
                        <Footer />
                        <Toaster
                            position='top-right'
                            expand={false}
                            richColors
                            closeButton
                        />
                    </body>
                </html>
            </GlobalProvider>
        </AuthProvider>
    );
};

export default MainLayout;
