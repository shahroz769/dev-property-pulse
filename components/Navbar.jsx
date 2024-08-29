'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';
import logo from '@/assets/images/logo-white.png';
import profileDefault from '@/assets/images/profile.png';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import UnreadMessageCount from '@/components/UnreadMessageCount';

const Navbar = () => {
    const { data: session, status } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [providers, setProviders] = useState(null);
    const [isLoadingProviders, setIsLoadingProviders] = useState(true);
    const pathname = usePathname();
    const router = useRouter();
    const profileMenuRef = useRef(null);
    const isLoading = status === 'loading' || isLoadingProviders;

    const handleClickOutside = useCallback((event) => {
        if (
            profileMenuRef.current &&
            !profileMenuRef.current.contains(event.target)
        ) {
            setIsProfileMenuOpen(false);
        }
    }, []);

    useEffect(() => {
        const setAuthProviders = async () => {
            if (!providers) {
                // Avoid fetching providers again if they are already fetched
                setIsLoadingProviders(true);
                const res = await getProviders();
                setProviders(res);
                setIsLoadingProviders(false);
            }
        };
        setAuthProviders();

        const handleResize = () => setIsMobileMenuOpen(false);
        window.addEventListener('resize', handleResize);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [providers, handleClickOutside]);

    const handleMenuItemClick = (href) => {
        setIsProfileMenuOpen(false);
        router.push(href);
    };

    return (
        <nav className='bg-blue-700 shadow-lg border-b border-blue-500'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between h-16'>
                    <div className='flex items-center'>
                        <Link
                            href='/'
                            className='flex-shrink-0 flex items-center'
                        >
                            <Image
                                className='h-8 w-auto'
                                src={logo}
                                alt='PropertyPulse'
                                priority
                            />
                            <span className='text-white text-xl font-bold ml-2 hidden sm:block'>
                                PropertyPulse
                            </span>
                        </Link>
                        <div className='hidden md:ml-6 md:flex md:space-x-4'>
                            <NavLink href='/' active={pathname === '/'}>
                                Home
                            </NavLink>
                            <NavLink
                                href='/properties'
                                active={pathname === '/properties'}
                            >
                                Properties
                            </NavLink>
                            {session && (
                                <NavLink
                                    href='/properties/add'
                                    active={pathname === '/properties/add'}
                                >
                                    Add Property
                                </NavLink>
                            )}
                        </div>
                    </div>
                    <div className='flex items-center'>
                        {isLoading ? (
                            <div className='hidden md:flex items-center space-x-4'>
                                <div className='w-24 h-8 bg-gray-300 animate-pulse rounded'></div>
                            </div>
                        ) : !session ? (
                            <div className='hidden md:flex'>
                                {providers &&
                                    Object.values(providers).map((provider) => (
                                        <button
                                            key={provider.name}
                                            onClick={() => signIn(provider.id)}
                                            className='flex items-center text-white bg-gray-700 hover:bg-gray-600 text-sm hover:text-white rounded-md px-3 py-2 transition duration-300'
                                        >
                                            <FaGoogle className='mr-2' />
                                            <span>Login</span>
                                        </button>
                                    ))}
                            </div>
                        ) : (
                            <div className='hidden md:flex md:items-center md:space-x-4'>
                                <Link
                                    href='/messages'
                                    className='text-white hover:text-blue-200 bg-gray-700 hover:bg-gray-600 rounded-full p-2 transition duration-300'
                                >
                                    <div className='relative'>
                                        <svg
                                            className='h-6 w-6'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            stroke='currentColor'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth={2}
                                                d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                                            />
                                        </svg>
                                        <UnreadMessageCount />
                                    </div>
                                </Link>
                                <div className='relative' ref={profileMenuRef}>
                                    <button
                                        onClick={() =>
                                            setIsProfileMenuOpen(
                                                !isProfileMenuOpen
                                            )
                                        }
                                        className='flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white'
                                    >
                                        <Image
                                            className='h-8 w-8 rounded-full'
                                            src={
                                                session?.user?.image ||
                                                profileDefault
                                            }
                                            alt='Profile'
                                            width={32}
                                            height={32}
                                        />
                                    </button>
                                    {isProfileMenuOpen && (
                                        <div className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50'>
                                            <button
                                                onClick={() =>
                                                    handleMenuItemClick(
                                                        '/profile'
                                                    )
                                                }
                                                className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                            >
                                                Your Profile
                                            </button>
                                            <div className='border-t border-gray-200'></div>
                                            <button
                                                onClick={() =>
                                                    handleMenuItemClick(
                                                        '/properties/saved'
                                                    )
                                                }
                                                className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                            >
                                                Saved Properties
                                            </button>
                                            <div className='border-t border-gray-200'></div>
                                            <button
                                                onClick={() => {
                                                    setIsProfileMenuOpen(false);
                                                    signOut({
                                                        callbackUrl: '/',
                                                    });
                                                }}
                                                className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='flex items-center md:hidden'>
                        <button
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className='inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                        >
                            <svg
                                className={`${
                                    isMobileMenuOpen ? 'hidden' : 'block'
                                } h-6 w-6`}
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                aria-hidden='true'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M4 6h16M4 12h16M4 18h16'
                                />
                            </svg>
                            <svg
                                className={`${
                                    isMobileMenuOpen ? 'block' : 'hidden'
                                } h-6 w-6`}
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                aria-hidden='true'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className='md:hidden'>
                    <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                        <NavLink href='/' active={pathname === '/'} mobile>
                            Home
                        </NavLink>
                        <NavLink
                            href='/properties'
                            active={pathname === '/properties'}
                            mobile
                        >
                            Properties
                        </NavLink>
                        {isLoading ? (
                            <div className='w-full h-8 bg-gray-300 animate-pulse rounded'></div>
                        ) : session ? (
                            <>
                                <NavLink
                                    href='/properties/add'
                                    active={pathname === '/properties/add'}
                                    mobile
                                >
                                    Add Property
                                </NavLink>
                                <NavLink
                                    href='/profile'
                                    active={pathname === '/profile'}
                                    mobile
                                >
                                    Profile
                                </NavLink>
                                <NavLink
                                    href='/messages'
                                    active={pathname === '/messages'}
                                    mobile
                                >
                                    Messages
                                    <UnreadMessageCount mobile={true} />
                                </NavLink>
                                <NavLink
                                    href='/properties/saved'
                                    active={pathname === '/properties/saved'}
                                    mobile
                                >
                                    Saved Properties
                                </NavLink>
                                <button
                                    onClick={() =>
                                        signOut({ callbackUrl: '/' })
                                    }
                                    className='w-full text-left block text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300'
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='w-full text-sm text-left block text-white hover:bg-blue-600 px-3 py-2 rounded-md font-medium'
                                >
                                    Login
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

const NavLink = ({ href, children, active, mobile }) => (
    <Link
        href={href}
        className={`
      ${
          active
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'text-white hover:bg-blue-600'
      }
      ${mobile ? 'block' : 'inline-flex items-center'}
      px-3 py-2 rounded-md text-sm font-medium transition duration-300
    `}
    >
        {children}
    </Link>
);

export default Navbar;
