import { fail } from '@sveltejs/kit';

export const actions = {
    register: async ({ request }) => {
        try {
            const formData  = await request.formData();
            const name      = formData.get('name');
            const email     = formData.get('email');
            const password  = formData.get('password');

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
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
                    values: { name, email, password }
                });
            }

            return { success: true };
            
        } catch (error) {
            if (error instanceof Response) {
                throw error;
            }
            console.error('Error:', error);
            return fail(500, { 
                success: false,
                message: 'Internal Server Error', 
            });
        }
    }
};