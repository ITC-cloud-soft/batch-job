import {
    BJob,
    ScheduleType,
    ScheduleTypeDes,
    StartType,
} from '../props/DataStructure.ts';
import i18n from 'i18next';

export const toURLParam = (param: any) => {
    const queryParam = new URLSearchParams();
    for (let key in param) {
        if (param[key] === undefined) continue;
        queryParam.set(key, param[key]);
    }
    return queryParam;
};

export function generateCronExpressionString(job: BJob) {
    const currentLanguage = i18n.language;

    let cronExpression = '';
    switch (job.scheduleType) {
        // 2月3日0時30分
        case '1':
            cronExpression = `${getMonthOfYear(Number(job.month), currentLanguage)}${getDayOfMonth(Number(job.day), currentLanguage)}  ${getHoursOfDay(Number(job.hour), currentLanguage)}${getMinOfHour(Number(job.minute), currentLanguage)}`;
            break;
        case '2':
            cronExpression = `${genMonthDayString(job.batchLaunchMonthDay, currentLanguage)}${getHoursOfDay(Number(job.hour), currentLanguage)}${getMinOfHour(Number(job.minute), currentLanguage)}`;
            break;
        case '3':
            cronExpression = `${getDayOfWeek(Number(job.weekDay), currentLanguage)}${getHoursOfDay(Number(job.hour), currentLanguage)}${getMinOfHour(Number(job.minute), currentLanguage)}`;
            break;
        case '4':
            cronExpression = `${getHoursOfDay(Number(job.hour), currentLanguage)}${getMinOfHour(Number(job.minute), currentLanguage)}`;
            break;
        case '5':
            cronExpression = `${genLoopString(job.startType ?? 0, job.batchLaunchMonthDay, job.batchLaunchWeekDay, currentLanguage)}. ${i18n.t('job.loopStep')}${job.loopStep}${i18n.t('job.hour')}`;
            break;
        case '6':
            cronExpression = `${genLoopString(job.startType ?? 0, job.batchLaunchMonthDay, job.batchLaunchWeekDay, currentLanguage)}. ${i18n.t('job.workHours')}${job.workHourStart}-${job.workHourEnd},${i18n.t('job.loopStep')}${job.loopStep}${i18n.t('job.minute')}`;
            break;
    }
    return cronExpression;
}

function genMonthDayString(
    batchLaunchMonthDay: number[],
    currentLanguage: string,
) {
    return batchLaunchMonthDay
        .sort((a, b) => a - b)
        .map((e) => getDayOfMonth(e, currentLanguage))
        .join(`,`);
}

function genLoopString(
    startType: StartType,
    batchLaunchMonthDay: number[],
    batchLaunchWeekDay: number[],
    currentLanguage: string,
) {
    // バッチ起動日
    if (startType === 1) {
        return genMonthDayString(batchLaunchMonthDay, currentLanguage);
    }
    // バッチ起動曜日
    if (startType === 2) {
        const currentLanguage = i18n.language;
        return batchLaunchWeekDay
            .map((a) => Number(a))
            .sort((a, b) => a - b)
            .map((x) => getDayOfWeek(x, currentLanguage))
            .join(',');
    }
    throw new Error('Invalid job start type');
}
// 创建一个多维数组，其中包括英文、中文和日文的星期名称
const daysOfWeek = [
    ['Sun', '周日', '日曜日'],
    ['Mon', '周一', '月曜日'],
    ['Tue', '周二', '火曜日'],
    ['Wed', '周三', '水曜日'],
    ['Thu', '周四', '木曜日'],
    ['Fri', '周五', '金曜日'],
    ['Sat', '周六', '土曜日'],
    ['Sun', '周日', '日曜日'],
];
// 创建一个多维数组，其中包括英文、中文和日文的月份名称
const monthsOfYear = [
    ['Jan', '1月', '1月'],
    ['Feb', '2月', '2月'],
    ['Mar', '3月', '3月'],
    ['Apr', '4月', '4月'],
    ['May', '5月', '5月'],
    ['Jun', '6月', '6月'],
    ['Jul', '7月', '7月'],
    ['Aug', '8月', '8月'],
    ['Sep', '9月', '9月'],
    ['Oct', '10月', '10月'],
    ['Nov', '11月', '11月'],
    ['Dec', '12月', '12月'],
];

// 创建一个多维数组，其中包括英文、中文和日文的日期（1日到31日）的名称
const daysOfMonth = [
    ['1st', '1日', '1日'],
    ['2nd', '2日', '2日'],
    ['3rd', '3日', '3日'],
    ['4th', '4日', '4日'],
    ['5th', '5日', '5日'],
    ['6th', '6日', '6日'],
    ['7th', '7日', '7日'],
    ['8th', '8日', '8日'],
    ['9th', '9日', '9日'],
    ['10th', '10日', '10日'],
    ['11th', '11日', '11日'],
    ['12th', '12日', '12日'],
    ['13th', '13日', '13日'],
    ['14th', '14日', '14日'],
    ['15th', '15日', '15日'],
    ['16th', '16日', '16日'],
    ['17th', '17日', '17日'],
    ['18th', '18日', '18日'],
    ['19th', '19日', '19日'],
    ['20th', '20日', '20日'],
    ['21st', '21日', '21日'],
    ['22nd', '22日', '22日'],
    ['23rd', '23日', '23日'],
    ['24th', '24日', '24日'],
    ['25th', '25日', '25日'],
    ['26th', '26日', '26日'],
    ['27th', '27日', '27日'],
    ['28th', '28日', '28日'],
    ['29th', '29日', '29日'],
    ['30th', '30日', '30日'],
    ['31st', '31日', '31日'],
];

// 创建一个多维数组，其中包括英文、中文和日文的分钟（0分到59分）的名称
const minutesOfHour = [
    ['00', '0分', '00分'],
    ['01', '01分', '01分'],
    ['02', '02分', '02分'],
    ['03', '03分', '03分'],
    ['04', '04分', '04分'],
    ['05', '05分', '05分'],
    ['06', '06分', '06分'],
    ['07', '07分', '07分'],
    ['08', '08分', '08分'],
    ['09', '09分', '09分'],
    ['10', '10分', '10分'],
    ['11', '11分', '11分'],
    ['12', '12分', '12分'],
    ['13', '13分', '13分'],
    ['14', '14分', '14分'],
    ['15', '15分', '15分'],
    ['16', '16分', '16分'],
    ['17', '17分', '17分'],
    ['18', '18分', '18分'],
    ['19', '19分', '19分'],
    ['20', '20分', '20分'],
    ['21', '21分', '21分'],
    ['22', '22分', '22分'],
    ['23', '23分', '23分'],
    ['24', '24分', '24分'],
    ['25', '25分', '25分'],
    ['26', '26分', '26分'],
    ['27', '27分', '27分'],
    ['28', '28分', '28分'],
    ['29', '29分', '29分'],
    ['30', '30分', '30分'],
    ['31', '31分', '31分'],
    ['32', '32分', '32分'],
    ['33', '33分', '33分'],
    ['34', '34分', '34分'],
    ['35', '35分', '35分'],
    ['36', '36分', '36分'],
    ['37', '37分', '37分'],
    ['38', '38分', '38分'],
    ['39', '39分', '39分'],
    ['40', '40分', '40分'],
    ['41', '41分', '41分'],
    ['42', '42分', '42分'],
    ['43', '43分', '43分'],
    ['44', '44分', '44分'],
    ['45', '45分', '45分'],
    ['46', '46分', '46分'],
    ['47', '47分', '47分'],
    ['48', '48分', '48分'],
    ['49', '49分', '49分'],
    ['50', '50分', '50分'],
    ['51', '51分', '51分'],
    ['52', '52分', '52分'],
    ['53', '53分', '53分'],
    ['54', '54分', '54分'],
    ['55', '55分', '55分'],
    ['56', '56分', '56分'],
    ['57', '57分', '57分'],
    ['58', '58分', '58分'],
    ['59', '59分', '59分'],
];

// 创建一个多维数组，其中包括英文、中文和日文的小时（1时到24时）的名称
const hoursOfDay = [
    ['0', '0时', '0時'],
    ['1', '1时', '1時'],
    ['2', '2时', '2時'],
    ['3', '3时', '3時'],
    ['4', '4时', '4時'],
    ['5', '5时', '5時'],
    ['6', '6时', '6時'],
    ['7', '7时', '7時'],
    ['8', '8时', '8時'],
    ['9', '9时', '9時'],
    ['10', '10时', '10時'],
    ['11', '11时', '11時'],
    ['12', '12时', '12時'],
    ['13', '13时', '13時'],
    ['14', '14时', '14時'],
    ['15', '15时', '15時'],
    ['16', '16时', '16時'],
    ['17', '17时', '17時'],
    ['18', '18时', '18時'],
    ['19', '19时', '19時'],
    ['20', '20时', '20時'],
    ['21', '21时', '21時'],
    ['22', '22时', '22時'],
    ['23', '23时', '23時'],
];

function getHoursOfDay(index: number, language = 'en') {
    if (index < 0 || index > 60) {
        return 'Invalid day index'; // 确保传入的索引有效
    }
    switch (language) {
        case 'en-US':
            return hoursOfDay[index][0]; // 英文
        case 'zh-CN':
            return hoursOfDay[index][1]; // 中文
        case 'ja-JP':
            return hoursOfDay[index][2]; // 日文
        default:
            return 'Invalid language code'; // 语言代码无效
    }
}
function getMinOfHour(index: number, language = 'en') {
    if (index < 0 || index > 60) {
        return 'Invalid getMinOfHour'; // 确保传入的索引有效
    }
    switch (language) {
        case 'en-US':
            return minutesOfHour[index][0]; // 英文
        case 'zh-CN':
            return minutesOfHour[index][1]; // 中文
        case 'ja-JP':
            return minutesOfHour[index][2]; // 日文
        default:
            return 'Invalid language code'; // 语言代码无效
    }
}

// 获取星期的函数，增加了语言选项
function getDayOfWeek(index: number, language = 'en') {
    if (index < 0 || index > 7) {
        return 'Invalid getDayOfWeek'; // 确保传入的索引有效
    }
    switch (language) {
        case 'en-US':
            return daysOfWeek[index][0]; // 英文
        case 'zh-CN':
            return daysOfWeek[index][1]; // 中文
        case 'ja-JP':
            return daysOfWeek[index][2]; // 日文
        default:
            return 'Invalid language code'; // 语言代码无效
    }
}

function getMonthOfYear(index: number, language = 'en') {
    index -= 1;
    if (index < 0 || index > 12) {
        return 'Invalid getMonthOfYear'; // 确保传入的索引有效
    }
    switch (language) {
        case 'en-US':
            return monthsOfYear[index][0]; // 英文
        case 'zh-CN':
            return monthsOfYear[index][1]; // 中文
        case 'ja-JP':
            return monthsOfYear[index][2]; // 日文
        default:
            return 'Invalid language code'; // 语言代码无效
    }
}
function getDayOfMonth(index: number, language = 'en') {
    // 数组从0开始 而天数从1号开始
    index -= 1;
    if (index < 0 || index > 31) {
        return 'Invalid getDayOfMonth'; // 确保传入的索引有效
    }
    switch (language) {
        case 'en-US':
            return daysOfMonth[index][0]; // 英文
        case 'zh-CN':
            return daysOfMonth[index][1]; // 中文
        case 'ja-JP':
            return daysOfMonth[index][2]; // 日文
        default:
            return 'Invalid language code'; // 语言代码无效
    }
}

export function getScheduleTypeDes(type: ScheduleType) {
    const description = ScheduleTypeDes[type].description;
    return i18n.t(`job.${description}`);
}

export function isValidUrl(url: string) {
    const urlPattern = /^(https?:\/\/)/i; // 只检查是否以 http:// 或 https:// 开头
    return urlPattern.test(url);
}
