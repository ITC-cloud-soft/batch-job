import routes from './routes';
import { RecoilRoot } from 'recoil';
import './locale/index';
import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router-dom';

const App = () => {
    return (
        <RecoilRoot>
            <ConfigProvider
                theme={{
                    token: {
                        fontSize: 15,
                        borderRadius: 6,
                        wireframe: false,
                    },
                    components: {
                        Checkbox: {
                            controlInteractiveSize: 20,
                        },
                    },
                }}
            >
                <RouterProvider router={routes} />
            </ConfigProvider>
        </RecoilRoot>
    );
};

export default App;
