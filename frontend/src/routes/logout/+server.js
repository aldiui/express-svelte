import { redirect } from '@sveltejs/kit';

export async function GET({ cookies }) {
    cookies.delete('token', { path: '/' });

    cookies.delete('user', { path: '/' });
    
    throw redirect(302, '/login');
}