import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './component/AppLayout/AppLayout.tsx';
import WorkPage from './pages/WorkPage.tsx';
import WorkDetailPage from './pages/WorkDetailPage.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import ServerErrorPage from './pages/ServerErrorPage.tsx';
import BatchList from './pages/BatchList.tsx';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <WorkPage />,
            },
            {
                path: '/work/:id',
                element: <WorkDetailPage />,
            },
        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/404',
        element: <NotFoundPage />,
    },
    {
        path: '/500',
        element: <ServerErrorPage />,
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
    {
        path: '/batchList',
        element: <BatchList />,
    },
    // 可以在这里添加更多顶级路由
]);

export default routes;
