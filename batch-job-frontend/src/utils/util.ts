export const toURLParam = (param: any) => {
    const queryParam = new URLSearchParams();
    for (let key in param) {
        if (param[key] === undefined) continue;
        queryParam.set(key, param[key]);
    }
    return queryParam;
};

export const validateAlphanumeric = (_: any, value: any) => {
    const alphanumericPattern = /^[a-zA-Z0-9]*$/;
    if (!value || alphanumericPattern.test(value)) {
        return Promise.resolve();
    }
    return Promise.reject(new Error('英字と数字のみです'));
};
