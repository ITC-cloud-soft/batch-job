import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage.tsx';
import ServerErrorPage from './pages/ServerErrorPage.tsx';
import ScheduledJobList from './pages/job/ScheduledJobList.tsx';
import ScheduleJobFormComponent from './component/Job/Batch/ScheduleJobFormComponent.tsx';
import AddTriggerJob from './pages/job/AddTriggerJob.tsx';
import TriggerList from './pages/job/TriggerList.tsx';
import ResultPage from './pages/job/ResultPage.tsx';

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
        element: <TriggerList />,
    },
    {
        path: '/scheduled/add',
        element: (
            <ScheduleJobFormComponent
                closeModal={function (): void {
                    throw new Error('Function not implemented.');
                }}
            />
        ),
    },
    {
        path: '/trigger/add',
        element: <AddTriggerJob />,
    },
    {
        path: '/success/:id/type/:type',
        element: <ResultPage />,
    },
]);

export default routes;
