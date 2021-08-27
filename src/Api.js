export function getUserList() {
    return fetch('https://jsonplaceholder.typicode.com/todos/')
        .then(data => data.json())
}