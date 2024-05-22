//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v14.0.3.0 (NJsonSchema v11.0.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import followIfLoginRedirect from './components/api-authorization/followIfLoginRedirect';

export class BatchJobsClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    createJob(command: CreateBatchJobCommand): Promise<BatchJob> {
        let url_ = this.baseUrl + "/api/BatchJobs";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processCreateJob(_response);
        });
    }

    protected processCreateJob(response: Response): Promise<BatchJob> {
        followIfLoginRedirect(response);
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = BatchJob.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<BatchJob>(null as any);
    }

    executeJob(jobId: number): Promise<number> {
        let url_ = this.baseUrl + "/api/BatchJobs/start/{jobId}";
        if (jobId === undefined || jobId === null)
            throw new Error("The parameter 'jobId' must be defined.");
        url_ = url_.replace("{jobId}", encodeURIComponent("" + jobId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processExecuteJob(_response);
        });
    }

    protected processExecuteJob(response: Response): Promise<number> {
        followIfLoginRedirect(response);
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<number>(null as any);
    }

    stopJob(jobId: number): Promise<void> {
        let url_ = this.baseUrl + "/api/BatchJobs/stop/{jobId}";
        if (jobId === undefined || jobId === null)
            throw new Error("The parameter 'jobId' must be defined.");
        url_ = url_.replace("{jobId}", encodeURIComponent("" + jobId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processStopJob(_response);
        });
    }

    protected processStopJob(response: Response): Promise<void> {
        followIfLoginRedirect(response);
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }
}

export abstract class BaseEntity implements IBaseEntity {
    id?: number;
    domainEvents?: BaseEvent[];

    constructor(data?: IBaseEntity) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            if (Array.isArray(_data["domainEvents"])) {
                this.domainEvents = [] as any;
                for (let item of _data["domainEvents"])
                    this.domainEvents!.push(BaseEvent.fromJS(item));
            }
        }
    }

    static fromJS(data: any): BaseEntity {
        data = typeof data === 'object' ? data : {};
        throw new Error("The abstract class 'BaseEntity' cannot be instantiated.");
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        if (Array.isArray(this.domainEvents)) {
            data["domainEvents"] = [];
            for (let item of this.domainEvents)
                data["domainEvents"].push(item.toJSON());
        }
        return data;
    }
}

export interface IBaseEntity {
    id?: number;
    domainEvents?: BaseEvent[];
}

export abstract class BaseAuditableEntity extends BaseEntity implements IBaseAuditableEntity {
    created?: Date;
    createdBy?: string | undefined;
    lastModified?: Date;
    lastModifiedBy?: string | undefined;

    constructor(data?: IBaseAuditableEntity) {
        super(data);
    }

    override init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.created = _data["created"] ? new Date(_data["created"].toString()) : <any>undefined;
            this.createdBy = _data["createdBy"];
            this.lastModified = _data["lastModified"] ? new Date(_data["lastModified"].toString()) : <any>undefined;
            this.lastModifiedBy = _data["lastModifiedBy"];
        }
    }

    static override fromJS(data: any): BaseAuditableEntity {
        data = typeof data === 'object' ? data : {};
        throw new Error("The abstract class 'BaseAuditableEntity' cannot be instantiated.");
    }

    override toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["created"] = this.created ? this.created.toISOString() : <any>undefined;
        data["createdBy"] = this.createdBy;
        data["lastModified"] = this.lastModified ? this.lastModified.toISOString() : <any>undefined;
        data["lastModifiedBy"] = this.lastModifiedBy;
        super.toJSON(data);
        return data;
    }
}

export interface IBaseAuditableEntity extends IBaseEntity {
    created?: Date;
    createdBy?: string | undefined;
    lastModified?: Date;
    lastModifiedBy?: string | undefined;
}

export class BatchJob extends BaseAuditableEntity implements IBatchJob {
    jobName?: string;
    jobGroup?: string;
    jobType?: JobType;
    jobUrl?: string | undefined;
    cronExpression?: string | undefined;
    scheduleType?: ScheduleType | undefined;
    startWeekDay?: string | undefined;
    year?: number | undefined;
    month?: number | undefined;
    day?: number | undefined;
    weekDay?: number | undefined;
    hour?: number | undefined;
    minute?: number | undefined;
    second?: number | undefined;
    jobTriggerId?: number | undefined;
    jobNo?: number | undefined;

    constructor(data?: IBatchJob) {
        super(data);
    }

    override init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.jobName = _data["jobName"];
            this.jobGroup = _data["jobGroup"];
            this.jobType = _data["jobType"];
            this.jobUrl = _data["jobUrl"];
            this.cronExpression = _data["cronExpression"];
            this.scheduleType = _data["scheduleType"];
            this.startWeekDay = _data["startWeekDay"];
            this.year = _data["year"];
            this.month = _data["month"];
            this.day = _data["day"];
            this.weekDay = _data["weekDay"];
            this.hour = _data["hour"];
            this.minute = _data["minute"];
            this.second = _data["second"];
            this.jobTriggerId = _data["jobTriggerId"];
            this.jobNo = _data["jobNo"];
        }
    }

    static override fromJS(data: any): BatchJob {
        data = typeof data === 'object' ? data : {};
        let result = new BatchJob();
        result.init(data);
        return result;
    }

    override toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["jobName"] = this.jobName;
        data["jobGroup"] = this.jobGroup;
        data["jobType"] = this.jobType;
        data["jobUrl"] = this.jobUrl;
        data["cronExpression"] = this.cronExpression;
        data["scheduleType"] = this.scheduleType;
        data["startWeekDay"] = this.startWeekDay;
        data["year"] = this.year;
        data["month"] = this.month;
        data["day"] = this.day;
        data["weekDay"] = this.weekDay;
        data["hour"] = this.hour;
        data["minute"] = this.minute;
        data["second"] = this.second;
        data["jobTriggerId"] = this.jobTriggerId;
        data["jobNo"] = this.jobNo;
        super.toJSON(data);
        return data;
    }
}

export interface IBatchJob extends IBaseAuditableEntity {
    jobName?: string;
    jobGroup?: string;
    jobType?: JobType;
    jobUrl?: string | undefined;
    cronExpression?: string | undefined;
    scheduleType?: ScheduleType | undefined;
    startWeekDay?: string | undefined;
    year?: number | undefined;
    month?: number | undefined;
    day?: number | undefined;
    weekDay?: number | undefined;
    hour?: number | undefined;
    minute?: number | undefined;
    second?: number | undefined;
    jobTriggerId?: number | undefined;
    jobNo?: number | undefined;
}

export enum JobType {
    Scheduled = 0,
    Trigger = 1,
}

export enum ScheduleType {
    Year = 0,
    Month = 0,
    Week = 0,
    Day = 0,
    Hour = 0,
    Minute = 0,
}

export abstract class BaseEvent implements IBaseEvent {

    constructor(data?: IBaseEvent) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
    }

    static fromJS(data: any): BaseEvent {
        data = typeof data === 'object' ? data : {};
        throw new Error("The abstract class 'BaseEvent' cannot be instantiated.");
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        return data;
    }
}

export interface IBaseEvent {
}

export class CreateBatchJobCommand implements ICreateBatchJobCommand {
    jobName?: string | undefined;
    jobGroup?: string | undefined;
    jobType?: JobType;
    jobUrl?: string | undefined;
    cronExpression?: string | undefined;
    scheduleType?: ScheduleType | undefined;
    startWeekDay?: string | undefined;
    year?: number | undefined;
    month?: number | undefined;
    day?: number | undefined;
    weekDay?: number | undefined;
    hour?: number | undefined;
    minute?: number | undefined;
    second?: number | undefined;
    jobTriggerId?: number | undefined;
    jobNo?: number | undefined;

    constructor(data?: ICreateBatchJobCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.jobName = _data["jobName"];
            this.jobGroup = _data["jobGroup"];
            this.jobType = _data["jobType"];
            this.jobUrl = _data["jobUrl"];
            this.cronExpression = _data["cronExpression"];
            this.scheduleType = _data["scheduleType"];
            this.startWeekDay = _data["startWeekDay"];
            this.year = _data["year"];
            this.month = _data["month"];
            this.day = _data["day"];
            this.weekDay = _data["weekDay"];
            this.hour = _data["hour"];
            this.minute = _data["minute"];
            this.second = _data["second"];
            this.jobTriggerId = _data["jobTriggerId"];
            this.jobNo = _data["jobNo"];
        }
    }

    static fromJS(data: any): CreateBatchJobCommand {
        data = typeof data === 'object' ? data : {};
        let result = new CreateBatchJobCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["jobName"] = this.jobName;
        data["jobGroup"] = this.jobGroup;
        data["jobType"] = this.jobType;
        data["jobUrl"] = this.jobUrl;
        data["cronExpression"] = this.cronExpression;
        data["scheduleType"] = this.scheduleType;
        data["startWeekDay"] = this.startWeekDay;
        data["year"] = this.year;
        data["month"] = this.month;
        data["day"] = this.day;
        data["weekDay"] = this.weekDay;
        data["hour"] = this.hour;
        data["minute"] = this.minute;
        data["second"] = this.second;
        data["jobTriggerId"] = this.jobTriggerId;
        data["jobNo"] = this.jobNo;
        return data;
    }
}

export interface ICreateBatchJobCommand {
    jobName?: string | undefined;
    jobGroup?: string | undefined;
    jobType?: JobType;
    jobUrl?: string | undefined;
    cronExpression?: string | undefined;
    scheduleType?: ScheduleType | undefined;
    startWeekDay?: string | undefined;
    year?: number | undefined;
    month?: number | undefined;
    day?: number | undefined;
    weekDay?: number | undefined;
    hour?: number | undefined;
    minute?: number | undefined;
    second?: number | undefined;
    jobTriggerId?: number | undefined;
    jobNo?: number | undefined;
}

export class SwaggerException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new SwaggerException(message, status, response, headers, null);
}