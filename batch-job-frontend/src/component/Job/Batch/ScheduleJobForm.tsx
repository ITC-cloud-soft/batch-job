import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Button, Flex, Form, Input, message, Select } from 'antd';
import {
    BJob,
    JobProps,
    modalState,
    ScheduleType,
    ScheduleTypeDes,
    TaskJobStatus,
} from '../../../props/DataStructure.ts';
import HourMinComponent from '../Component/HourMinComponent.tsx';
import MonthDayComponent from '../Component/MonthDayComponent.tsx';
import WeekDayComponent from '../Component/WeekDayComponent.tsx';
import PeriodComponent from '../Component/PeriodComponent.tsx';
import { SaveJob, UpdateJob } from '../../../service/api.ts';
import Title from 'antd/es/typography/Title';
import { useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import {
    generateCronExpressionString,
    isValidUrl,
} from '../../../utils/util.ts';

const Wrapper = styled.div`
    height: 85vh;
`;

const ScheduleJobForm: React.FC<JobProps> = ({ jobParam, closeModal }) => {
    const [job, setJob] = useState<BJob>();
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [, setIsModalOpen] = useRecoilState(modalState);
    const [t] = useTranslation();
    const submit = (bJob: BJob) => {
        bJob.cronExpressionStr = generateCronExpressionString(bJob);
        setIsModalOpen(false);
        if (jobParam) {
            UpdateJob({ ...jobParam, ...bJob }).then(() => {
                closeModal();
            });
        } else {
            bJob.status = TaskJobStatus.Stop;
            SaveJob(bJob)
                .then((res) => {
                    closeModal();
                    console.log(res);
                })
                .catch((error) => {
                    console.error(error);
                    closeModal();
                    messageApi
                        .open({
                            type: 'error',
                            content:
                                '保存に失敗しました。もう一度お試しください',
                        })
                        .then((r) => r);
                });
        }
    };

    useEffect(() => {
        if (jobParam) {
            console.log('effect', jobParam);
            setJob(jobParam);
            form.setFieldsValue(jobParam);
        }
    }, [jobParam, form]);

    const scheduleTypeOptions = Object.entries(ScheduleTypeDes).map(
        ([key, value]) => ({
            value: key,
            label: t(`job.${value.description}`),
        }),
    );

    const daySelectOptios = Array.from({ length: 31 }, (_, i) => ({
        value: `${i + 1}`,
        label: `${i + 1}${t('job.day')}`,
    }));
    const monthSelectOptios = Array.from({ length: 12 }, (_, i) => ({
        value: `${i + 1}`,
        label: `${i + 1}${t('job.month')}`,
    }));

    const array = [
        {
            validator: (_: any, value: string) => {
                const numberValue = Number(value);
                if (numberValue > 0) {
                    return Promise.resolve().then((r) => r);
                }
                return Promise.reject(new Error(t('job.greaterThan0')));
            },
        },
        {
            validator: (_: any, value: string) => {
                if (Number.isInteger(Number(value))) {
                    return Promise.resolve().then((r) => r);
                }
                return Promise.reject(new Error(t('job.greaterThan0')));
            },
        },
    ];

    return (
        <Wrapper>
            {contextHolder}
            <Flex align="center" vertical={true} style={{ minHeight: '500px' }}>
                <Flex justify={'space-between'} align={'center'}>
                    <Title level={3}>{t('job.scheduledJobSetting')}</Title>
                </Flex>
                <Form
                    form={form}
                    layout="vertical"
                    style={{ width: 400, margin: 20 }}
                    onFinish={submit}
                    initialValues={job}
                >
                    <Form.Item
                        label={t('job.jobName')}
                        name="jobName"
                        rules={[
                            {
                                required: true,
                                message: t('job.jobNameValidate'),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={t('job.jobUrl')}
                        name="jobUrl"
                        rules={[
                            {
                                validator: (_, value) => {
                                    return isValidUrl(value)
                                        ? Promise.resolve()
                                        : Promise.reject(
                                              new Error(t('job.urlValidate')),
                                          );
                                },
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t('job.scheduleType')}
                        name={'scheduleType'}
                    >
                        <Select
                            onChange={(value) => {
                                console.log(value);
                                setJob({ ...job!, scheduleType: value });
                            }}
                            options={scheduleTypeOptions}
                        />
                    </Form.Item>
                    {job?.scheduleType == ScheduleType.Year && (
                        <Flex vertical={false} gap={20}>
                            <HourMinComponent job={job} />
                            <Form.Item
                                label={t('job.day')}
                                name="day"
                                style={{ width: '70px' }}
                                rules={[
                                    {
                                        required: true,
                                        message: t('job.dateValidate'),
                                    },
                                ]}
                            >
                                <Select options={daySelectOptios} />
                            </Form.Item>

                            <Form.Item
                                label={t('job.month')}
                                name="month"
                                style={{ width: '70px' }}
                                rules={[
                                    {
                                        required: true,
                                        message: t('job.monthValidate'),
                                    },
                                ]}
                            >
                                <Select options={monthSelectOptios} />
                            </Form.Item>
                        </Flex>
                    )}
                    {job?.scheduleType == ScheduleType.Month && (
                        <>
                            <HourMinComponent />
                            <MonthDayComponent />
                        </>
                    )}

                    {job?.scheduleType == ScheduleType.Week && (
                        <>
                            <Flex gap={20}>
                                <HourMinComponent />
                                <WeekDayComponent />
                            </Flex>
                        </>
                    )}

                    {job?.scheduleType == ScheduleType.Day && (
                        <Flex vertical={false} gap={20}>
                            <HourMinComponent job={job} />
                        </Flex>
                    )}

                    {job?.scheduleType == ScheduleType.Hour && (
                        <>
                            <Form.Item
                                name="loopStep"
                                label={t('job.loopStep')}
                                rules={[
                                    {
                                        validator: (_, value) => {
                                            const numberValue = Number(value);
                                            return Number.isInteger(
                                                numberValue,
                                            ) && numberValue > 0
                                                ? Promise.resolve()
                                                : Promise.reject(
                                                      new Error(
                                                          t('job.greaterThan0'),
                                                      ),
                                                  );
                                        },
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <PeriodComponent job={job} setJob={setJob} />
                        </>
                    )}

                    {job?.scheduleType == ScheduleType.Minute && (
                        <>
                            <Flex>
                                <Form.Item
                                    name="loopStep"
                                    label={t('job.loopStep')}
                                    rules={[
                                        {
                                            validator: (_, value) => {
                                                const numberValue =
                                                    Number(value);
                                                return Number.isInteger(
                                                    numberValue,
                                                ) && numberValue > 0
                                                    ? Promise.resolve()
                                                    : Promise.reject(
                                                          new Error(
                                                              t(
                                                                  'job.greaterThan0',
                                                              ),
                                                          ),
                                                      );
                                            },
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Flex>

                            <Flex>
                                <Form.Item label={t('job.workHours')}>
                                    <Form.Item
                                        name="workHourStart"
                                        style={{
                                            display: 'inline-block',
                                            width: 'calc(50% - 28px)',
                                        }}
                                        rules={[
                                            {
                                                required: true,
                                                message: t(
                                                    'job.workHoursValidate',
                                                ),
                                            },
                                            ...array,
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="workHourEnd"
                                        style={{
                                            display: 'inline-block',
                                            width: 'calc(50% - 28px)',
                                            margin: '0 8px',
                                        }}
                                        rules={[
                                            {
                                                required: true,
                                                message: t(
                                                    'job.workHoursValidate',
                                                ),
                                            },
                                            ...array,
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Form.Item>
                            </Flex>
                            <PeriodComponent job={job} setJob={setJob} />
                        </>
                    )}

                    <Flex justify={'center'}>
                        <Button type="primary" htmlType="submit">
                            {t('job.save')}
                        </Button>
                    </Flex>
                </Form>
            </Flex>
        </Wrapper>
    );
};

export default ScheduleJobForm;
