const LayoutProps = {
    route: {
        path: '/',
        routes: [
            {
                name: 'Home',
                path: '/',
                // routes: [
                //     {
                //         path: '/list/sub-page',
                //         name: '列表页面',
                //         icon: <CrownFilled />,
                //         routes: [
                //             {
                //                 path: 'sub-sub-page1',
                //                 name: '一一级列表页面',
                //                 icon: <CrownFilled />,
                //                 Component: './Welcome',
                //             },
                //             {
                //                 path: 'sub-sub-page2',
                //                 name: '一二级列表页面',
                //                 icon: <CrownFilled />,
                //                 Component: './Welcome',
                //             },
                //             {
                //                 path: 'sub-sub-page3',
                //                 name: '一三级列表页面',
                //                 icon: <CrownFilled />,
                //                 Component: './Welcome',
                //             },
                //         ],
                //     },
                //     {
                //         path: '/list/sub-page2',
                //         name: '二级列表页面',
                //         icon: <CrownFilled />,
                //         Component: './Welcome',
                //     },
                //     {
                //         path: '/list/sub-page3',
                //         name: '三级列表页面',
                //         icon: <CrownFilled />,
                //         Component: './Welcome',
                //     },
                // ],
            },
        ],
    },
    location: {
        pathname: '/',
    },
    appList: [
        {
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            title: 'Ant Design',
            desc: '杭州市较知名的 UI 设计语言',
            url: 'https://ant.design',
        },
        {
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
            title: 'AntV',
            desc: '蚂蚁集团全新一代数据可视化解决方案',
            url: 'https://antv.vision/',
            target: '_blank',
        },
    ],
};
export default LayoutProps;
