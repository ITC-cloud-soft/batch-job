import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage.tsx';
import ServerErrorPage from './pages/ServerErrorPage.tsx';
import ScheduledJobList from './pages/job/ScheduledJobList.tsx';
import TriggerList from './pages/job/TriggerList.tsx';
import ResultPage from './pages/job/ResultPage.tsx';
import Login from './pages/Login.tsx';

const routes = createBrowserRouter([
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
        path: '/',
        element: <ScheduledJobList />,
    },
    {
        path: '/scheduled',
        element: <ScheduledJobList />,
    },
    {
        path: '/trigger',
        element: <TriggerList />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/success/:id/type/:type',
        element: <ResultPage />,
    },
]);

export default routes;
