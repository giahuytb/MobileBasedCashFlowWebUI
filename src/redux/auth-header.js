
export default function authHader() {

    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('authToken'));

    if (user && token) {
        return { Authorization: `Bearer ${token}` };
    }return {}; 
}

