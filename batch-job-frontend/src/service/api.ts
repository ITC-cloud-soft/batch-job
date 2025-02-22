import {
    Category,
    WorkInfo,
    UserLoginParam,
    UserRegisterParam,
    WorkInfoWithPaginationQueryParam,
    WorkInfoWithPagination,
    CommentItem,
    JobType,
    JobPaginationQueryParam,
    BJobWithPagination,
    BJob,
} from '../props/DataStructure.ts';
import request from '../utils/request.tsx';
import { toURLParam } from '../utils/util.ts';

/**
 * User
 * @param user
 */
export async function login(user: UserLoginParam) {
    return await request.post<never, string>('/oauth/login', user);
}

export async function register(user: UserRegisterParam) {
    return await request.post<never, UserRegisterParam>('oauth/register', user);
}

/**
 * WorkInfo
 * @param id
 */
export function getWorkInfo(id: string | undefined) {
    return request.get<never, WorkInfo>(`api/WorkInfos/${id}`);
}

export function getWorkInfoWithPagination(
    param: WorkInfoWithPaginationQueryParam,
) {
    const queryParams = toURLParam(param).toString();
    return request.get<never, WorkInfoWithPagination>(
        `api/WorkInfos?${queryParams}`,
    );
}

/**
 * Category
 */
export function getAllCategories() {
    return request.get<never, Category[]>(`api/Categories`);
}

/**
 * Comments
 */
export function createCommand(comment: CommentItem) {
    return request.post<never, CommentItem>(`api/Comments`, comment);
}

/**
 * Download File
 */
export async function downloadJsonFile(id: number): Promise<void> {
    try {
        const response = await request.get<never, Blob>(
            `api/WorkInfos/download/${id}`,
            { responseType: 'blob' },
        );
        const blob = new Blob([response], { type: 'application/json' });
        // 创建一个 Blob URL
        const blobUrl = URL.createObjectURL(blob);

        // 创建一个虚拟的下载链接并设置其属性
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = 'template.json'; // 指定下载的文件名
        // 触发点击事件来下载文件
        a.click();

        // 释放 Blob URL
        URL.revokeObjectURL(blobUrl);
    } catch (e) {
        console.error('文件下载失败：', e);
    }
}

export async function viewTemplateFile(id: number): Promise<string> {
    const response = await request.get<never, string>(
        `api/WorkInfos/view/${id}`,
    );
    console.log(response);
    return response;
}

/**
 * Batch Task Area
 */
export async function GetJobList(jobType: JobType) {
    const param: JobPaginationQueryParam = {
        jobType,
        pageNumber: 1,
        pageSize: 100,
    };
    const queryParams = toURLParam(param).toString();
    return request.get<never, BJobWithPagination>(
        `api/BatchJobs?${queryParams}`,
    );
}

export async function GetJob(id: string) {
    return request.get<never, BJob>(`api/BatchJobs/${id}`);
}

export async function ExecuteJob(jobId: number) {
    return request.get<never>(`api/BatchJobs/start/${jobId}`);
}

export async function StopJob(jobId: number) {
    return request.delete<never>(`api/BatchJobs/stop/${jobId}`);
}

export async function SaveJob(job: BJob) {
    return request.post<never, BJob>(`api/BatchJobs/`, job);
}

export async function UpdateJob(job: BJob) {
    return request.put<never, BJob>(`api/BatchJobs/${job.id}`, job);
}
