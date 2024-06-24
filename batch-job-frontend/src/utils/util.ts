import { BJob, StartType } from '../props/DataStructure.ts';
import i18n from 'i18next';

export const toURLParam = (param: any) => {
    const queryParam = new URLSearchParams();
    for (let key in param) {
        if (param[key] === undefined) continue;
        queryParam.set(key, param[key]);
    }
    return queryParam;
};

export const validateAlphanumeric = (_: any, value: any) => {
    const alphanumericPattern = /^[a-zA-Z0-9]*$/;
    if (!value || alphanumericPattern.test(value)) {
        return Promise.resolve();
    }
    return Promise.reject(new Error('英字と数字のみです'));
};
export function generateCronExpressionString(job: BJob) {
    const currentLanguage = i18n.language;

    let cronExpression = '';
    switch (job.scheduleType) {
        // 2月3日0時30分
        case '1':
            cronExpression = `${job.month}${i18n.t('job.month')}${job.day}${i18n.t('job.day')}${job.hour}${i18n.t('job.hour')}${job.minute}${i18n.t('job.minute')}`;
            break;
        case '2':
            cronExpression = `${genMonthDayString(job.batchLaunchMonthDay)}${job.hour}${i18n.t('job.hour')}${job.minute}${i18n.t('job.minute')}`;
            break;
        case '3':
            cronExpression = `${getWeekDayString(currentLanguage, Number(job.weekDay))}${job.hour}${i18n.t('job.hour')}${job.minute}${i18n.t('job.minute')}`;
            break;
        case '4':
            cronExpression = `${job.hour}${i18n.t('job.hour')}${job.minute}${i18n.t('job.minute')}`;
            break;
        case '5':
            cronExpression = `${genLoopString(job.startType ?? 0, job.batchLaunchMonthDay, job.batchLaunchWeekDay)},${i18n.t('job.loopStep')}${job.loopStep}${i18n.t('job.hours')}`;
            break;
        case '6':
            cronExpression = `${genLoopString(job.startType ?? 0, job.batchLaunchMonthDay, job.batchLaunchWeekDay)},${i18n.t('job.workHours')}:${job.workHourStart}${i18n.t('job.hour')}-${job.workHourEnd}${i18n.t('job.hour')},${i18n.t('job.loopStep')}:${job.loopStep}${i18n.t('job.minute')}`;
            break;
    }
    return cronExpression;
}

function genMonthDayString(batchLaunchMonthDay: number[]) {
    return (
        batchLaunchMonthDay.join(`$i18n.t('job.day')},${i18n.t('job.day')}`) +
        `${i18n.t('job.day')}`
    );
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
        return batchLaunchWeekDay
            .map((x) => getWeekDayString('ja-JP', x))
            .join(',');
    }
    throw new Error('Invalid job start type');
}

function getWeekDayString(locale: string, weekDay: number) {
    return new Date(2021, 0, weekDay).toLocaleDateString(locale, {
        weekday: 'long',
    });
}
