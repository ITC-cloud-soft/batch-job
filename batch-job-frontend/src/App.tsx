import routes from './routes';
import { RecoilRoot } from 'recoil';
import './locale/index';
import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router-dom';
import GlobalSpin from './component/GlobalSpin.tsx';

const App = () => {
    return (
        <RecoilRoot>
            <ConfigProvider
                theme={{
                    token: {
                        borderRadius: 6,
                        wireframe: true,
                        boxShadowSecondary:
                            '\n      0 6px 26px 0 rgba(0, 0, 0, 0.08),\n      0 3px 6px -4px rgba(0, 0, 0, 0.12),\n      0 9px 28px 8px rgba(0, 0, 0, 0.05)\n    ',
                        colorPrimary: '#c73099',
                        colorInfo: '#c73099',
                    },
                    components: {
                        Checkbox: {
                            controlInteractiveSize: 20,
                        },
                    },
                }}
            >
                <GlobalSpin />
                <RouterProvider router={routes} />
            </ConfigProvider>
        </RecoilRoot>
    );
};

export default App;
