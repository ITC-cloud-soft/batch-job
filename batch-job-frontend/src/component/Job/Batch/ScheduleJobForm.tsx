import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Button, Flex, Form, Input, message, Select } from 'antd';
import {
    BJob,
    JobProps,
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

const Wrapper = styled.div`
    height: 85vh;
`;

const ScheduleJobForm: React.FC<JobProps> = ({ jobParam, closeModal }) => {
    const [job, setJob] = useState<BJob>();
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const sumbit = (bJob: BJob) => {
        console.log(bJob);
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
                    debugger;
                    console.error(error);
                    messageApi.open({
                        type: 'error',
                        content: '保存に失敗しました。もう一度お試しください',
                    });
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
        ([key, value]) => ({ value: key, label: value.description }),
    );

    const daySelectOptios = Array.from({ length: 31 }, (_, i) => ({
        value: `${i + 1}`,
        label: `${i + 1}日`,
    }));
    const monthSelectOptios = Array.from({ length: 12 }, (_, i) => ({
        value: `${i + 1}`,
        label: `${i + 1}月`,
    }));
    return (
        <Wrapper>
            {contextHolder}
            <Flex align="center" vertical={true} style={{ minHeight: '500px' }}>
                <Flex justify={'space-between'} align={'center'}>
                    <Title level={3}>定時周期JOB設定</Title>
                </Flex>
                <Form
                    form={form}
                    layout="vertical"
                    style={{ width: 400, margin: 20 }}
                    onFinish={sumbit}
                    initialValues={job}
                >
                    <Form.Item
                        label="バッチ名"
                        name="jobName"
                        rules={[
                            {
                                required: true,
                                message: 'バッチ名を入力してください',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="バッチURL"
                        name="jobUrl"
                        rules={[
                            {
                                required: true,
                                message: 'バッチURLを入力してください',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="定時周期：" name="scheduleType">
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
                                label="日"
                                name="day"
                                style={{ width: '70px' }}
                                rules={[
                                    {
                                        required: true,
                                        message: '日付を入力してください',
                                    },
                                ]}
                            >
                                <Select options={daySelectOptios} />
                            </Form.Item>

                            <Form.Item
                                label={'月'}
                                name="month"
                                style={{ width: '70px' }}
                                rules={[
                                    {
                                        required: true,
                                        message: '日付を入力してください',
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
                            <Form.Item name="loopStep" label={'間隔値：'}>
                                <Input />
                            </Form.Item>
                            <PeriodComponent job={job} setJob={setJob} />
                        </>
                    )}

                    {job?.scheduleType == ScheduleType.Minute && (
                        <>
                            <Flex>
                                <Form.Item name="loopStep" label={'間隔値：'}>
                                    <Input />
                                </Form.Item>
                            </Flex>

                            <Flex>
                                <Form.Item label={'稼働時間帯：'}>
                                    <Form.Item
                                        name="workHourStart"
                                        style={{
                                            display: 'inline-block',
                                            width: 'calc(50% - 28px)',
                                        }}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    '稼働時間帯を入力してください',
                                            },
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
                            保存
                        </Button>
                    </Flex>
                </Form>
            </Flex>
        </Wrapper>
    );
};

export default ScheduleJobForm;
