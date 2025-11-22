export const getEnv = (key: string, defaultValue?: string): string => {
    if (typeof window !== 'undefined' && (window as any).__ENV && (window as any).__ENV[key]) {
        return (window as any).__ENV[key];
    }
    return process.env[key] || defaultValue || '';
};
