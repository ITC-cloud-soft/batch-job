Mock.mock('/api/profile', 'post', function (options) {
    return Mock.mock({
        success: true,
        'data|1-10': [
            {
                'id|+1': 100,
                name: '@name',
                'age|18-60': 1,
                city: '@city(true)',
            },
        ],
    });
});
