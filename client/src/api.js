export const headers = new Headers({
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('authUser'))?.token || ''}`,
    'Content-Type': 'application/json'
});