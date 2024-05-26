import { JwtPayload } from 'jwt-decode';

export interface WorkInfoCardInfo {
    id: number;
    name: string;
    description?: string; // Optional since it's a nullable field in C#
    image?: string; // Optional since it's a nullable field in C#
}

export interface UserLoginParam {
    userMail: string;
    password: string;
}
export interface UserRegisterParam {
    accountName: string;
    userMail: string;
    orgId: string;
    password: string;
}

export interface UserProfile {
    username?: string;
    icon?: string;
    token?: string;
}

export interface WorkInfo {
    id: number;
    name: string;
    description?: string;
    image?: string;
    orgId: number;
    workContent?: string;
    downloadTime: number;
    author?: string;
    version?: string;
    commentId?: string;
    videoUrl?: string;
    priceId: number;
    deleteFlag: boolean;
    disable: boolean;
    carouselImages: string[];
    comments: CommentItem[];
    price: Price;
    org: Organization;
    categories?: WorkInfoCategory[];
}

export interface CommentItem {
    userId: number;
    author: string;
    avatar: string;
    content: string;
    datetime: string;
    userName: string;
    workId: number;
    key: number;
}

export interface CommentsProps {
    commentItems: CommentItem[];
    workId: number;
}

export interface Price {
    id: number;
    tekiyoFrom: string;
    tekiyoEnd: string;
    spec: string;
    price: number;
    currency: string;
    type: string;
    order: number;
}

export interface WorkInfoWithPagination {
    pageNumber: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: true;
    items: WorkInfoCardInfo[];
}

export interface Category {
    categoryId: number;
    categoryName: string;
}

export interface WorkImage {
    id: number;
    workId: number;
    url: string;
}

export interface WorkImagesProps {
    images: string[];
}

/**
 * Param
 */
export interface WorkInfoWithPaginationQueryParam {
    categoryId: number;
    pageNumber: number;
    pageSize: number;
}

export interface UserJwtPayLoad extends JwtPayload {
    id: number;
    userName: string;
    avatar: string;
}
export interface WorkInfoCategory {
    categoryId: number;
    category: string;
    workId: number;
}
export interface Organization {
    id: number;
    orgName: string;
    mainPage: string;
}

export interface BJobWithPagination {
    pageNumber: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: true;
    items: BJob[];
}

export interface BJob extends BaseAuditableEntity {
    jobName: string;
    key: number;
    jobGroup: string;
    jobType: JobType;
    jobUrl?: string;
    cronExpression?: string;
    scheduleType?: ScheduleType;
    scheduleTypeStr?: ScheduleType;
    year?: number;
    month?: number;
    day?: number;
    weekDay?: number;
    hour?: number;
    minute?: number;
    second?: number;
    jobTriggerId?: number;
    jobNo?: number;
    status: TaskJobStatus;
    taskJobStatusDes: string;
    taskJobStatusColor: string;
}

interface BaseAuditableEntity {
    id: number;
    createdDate: string;
    modifiedDate: string;
}

export interface JobPaginationQueryParam {
    jobType: JobType;
    pageNumber: number;
    pageSize: number;
}

export enum ScheduleType {
    Year = 1,
    Month = 2,
    Week = 3,
    Day = 4,
    Hour = 5,
    Minute = 6,
}
// {key: description}
export const ScheduleTypeDes: {
    [key in ScheduleType]: { description: string };
} = {
    [ScheduleType.Year]: { description: '年次処理' },
    [ScheduleType.Month]: { description: '月次処理' },
    [ScheduleType.Week]: { description: '週次処理' },
    [ScheduleType.Day]: { description: '日次処理' },
    [ScheduleType.Hour]: { description: '時間隔処理' },
    [ScheduleType.Minute]: { description: '分間隔処理' },
};

/**
 *  [Description("Default")]
 *     No = 0,
 *
 *     [Description("年次処理")]
 *     Year = 1,
 *     [Description("月次処理")]
 *     Month = 2,
 *     [Description("週次処理")]
 *     Week = 3,
 *     [Description("日次処理")]
 *     Day = 4,
 *     [Description("時間隔処理")]
 *     Hour = 5,
 *     [Description("分間隔処理")]
 *     Minute = 6,
 */

export enum JobType {
    Scheduled = 0,
    Trigger = 1,
}

export enum TaskJobStatus {
    Enqueued = 0,
    Scheduled = 1,
    Processing = 2,
    Succeeded = 3,
    Failed = 4,
    Deleted = 5,
    Awaiting = 6,
    Stop = 7, // Assuming 'Stop' should have a different value from 'Awaiting'
}