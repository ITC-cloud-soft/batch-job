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
