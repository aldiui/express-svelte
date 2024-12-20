export async function load({ cookies }) {

    const userData = cookies.get('user');

    return {
        user: JSON.parse(userData)
    };
}