import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {

    const token = event.cookies.get('token');

    const { pathname } = event.url;

    const publicPaths = ['/login', '/register'];

    const isAdminPath = pathname.startsWith('/admin');

    if (token && publicPaths.includes(pathname)) {
        throw redirect(302, '/admin/dashboard');
    }

    if (!token && isAdminPath) {
        throw redirect(302, '/login');
    }

    return await resolve(event);
}