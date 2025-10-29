import { withAuth } from 'next-auth/middleware';

// Export the middleware function as default for Next.js 16 proxy
export default withAuth({
  pages: {
    signIn: '/api/auth/signin',
  },
});

// Configure which routes require authentication
export const config = {
  matcher: ['/properties/add', '/profile', '/properties/saved', '/messages'],
};
