import { fail } from '@sveltejs/kit';

export const actions = {
    login: async ({ request, cookies }) => {
        try {
            const formData  = await request.formData();
            const email     = formData.get('email');
            const password  = formData.get('password');

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const result = await response.json();
            
            if (!response.ok) {
                return fail(response.status, {
                    success: false,
                    message: result.message || 'Terjadi kesalahan saat menyimpan data',
                    errors: result.errors || [],
                    values: { email, password }
                });
            }

            cookies.set('token', result.data.token, {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 
            });
            cookies.set('user', JSON.stringify(result.data.user), {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 
            });

            return { success: true };
            
        } catch (error) {
            console.error('Error:', error);
            return fail(500, { 
                success: false,
                message: 'Internal Server Error', 
            });
        }
    }
};