const serverConfig = {
    baseURL: import.meta.env.VITE_BASE_URL,
    useTokenAuthorization:
        import.meta.env.VITE_USE_TOKEN_AUTHORIZATION === 'false',
};
export default serverConfig;
