import type { Router as RemixRouter } from '@remix-run/router/dist/router';
import { WorkInfoCardInfo } from './DataStructure.ts';

export interface AppLayoutProps {
    router: RemixRouter;
}
export interface AppListProps {
    appInfo: WorkInfoCardInfo[];
}
