declare global {
    interface Window {
        api: {
            minimize: () => void;
            maximize: () => void;
            close: () => void;
            createUser: (data: {user: string, admission: string}) => { success: boolean, message: string};
        }
    }
}

export {};
