type T = any

const api = async (url: string): Promise<T> => {
    const response = await fetch(url);
    const data = await response.json();
    return data
}

export default api