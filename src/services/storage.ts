export const createStorage = <T>(storage = localStorage) => ({
    setItem(key: string, data: T) {
        storage.setItem(key, JSON.stringify(data));
    },
    getData(key: string): T | null {
        const data = storage.getItem(key);
        return data ? JSON.parse(data) as T : null;
    },
});

// export const storage = createStorage<>();
