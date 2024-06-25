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
            cronExpression = `${job.month}-${job.day}  ${job.hour}:${job.minute}`;
            break;
        case '2':
            cronExpression = `${genMonthDayString(job.batchLaunchMonthDay)} ${job.hour}:${job.minute}`;
            break;
        case '3':
            cronExpression = `${getDayOfWeek(Number(job.weekDay), currentLanguage)}${job.hour}:${job.minute}`;
            break;
        case '4':
            cronExpression = `${job.hour}:${job.minute}`;
            break;
        case '5':
            cronExpression = `${genLoopString(job.startType ?? 0, job.batchLaunchMonthDay, job.batchLaunchWeekDay)}. ${i18n.t('job.loopStep')}${job.loopStep}${i18n.t('job.hour')}`;
            break;
        case '6':
            cronExpression = `${genLoopString(job.startType ?? 0, job.batchLaunchMonthDay, job.batchLaunchWeekDay)}. ${i18n.t('job.workHours')}${job.workHourStart}${i18n.t('job.hour')}-${job.workHourEnd}${i18n.t('job.hour')},${i18n.t('job.loopStep')}${job.loopStep}${i18n.t('job.minute')}`;
            break;
    }
    return cronExpression;
}

function genMonthDayString(batchLaunchMonthDay: number[]) {
    return batchLaunchMonthDay.sort((a, b) => a - b).join(`,`);
}

function genLoopString(
    startType: StartType,
    batchLaunchMonthDay: number[],
    batchLaunchWeekDay: number[],
) {
    // バッチ起動日
    if (startType === 1) {
        return genMonthDayString(batchLaunchMonthDay);
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
];

// 获取星期的函数，增加了语言选项
function getDayOfWeek(index: number, language = 'en') {
    if (index < 0 || index > 6) {
        return 'Invalid day index'; // 确保传入的索引有效
    }
    console.log(language);
    console.log(index);
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

export function getScheduleTypeDes(type: ScheduleType) {
    const description = ScheduleTypeDes[type].description;
    return i18n.t(`job.${description}`);
}
