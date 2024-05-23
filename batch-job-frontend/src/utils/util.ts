export const toURLParam = (param: any) => {
    const queryParam = new URLSearchParams();
    for (let key in param) {
        if (param[key] === undefined) continue;
        queryParam.set(key, param[key]);
    }
    return queryParam;
};
