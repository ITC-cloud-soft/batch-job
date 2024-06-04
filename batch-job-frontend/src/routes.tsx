import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage.tsx';
import ServerErrorPage from './pages/ServerErrorPage.tsx';
import ScheduledJobList from './pages/job/ScheduledJobList.tsx';
import ScheduleJobFormComponent from './component/Job/Batch/ScheduleJobFormComponent.tsx';
import AddTriggerJob from './pages/job/AddTriggerJob.tsx';
import TriggerListPage from './pages/job/TriggerListPage.tsx';

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
        path: '/scheduled',
        element: <ScheduledJobList />,
    },
    {
        path: '/trigger',
        element: <TriggerListPage />,
    },
    {
        path: '/scheduled/add',
        element: <ScheduleJobFormComponent />,
    },
    {
        path: '/trigger/add',
        element: <AddTriggerJob />,
    },
    // 可以在这里添加更多顶级路由
]);

export default routes;
