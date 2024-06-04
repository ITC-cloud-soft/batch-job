import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Button, Flex, Form, Input, Select } from 'antd';
import {
    BJob,
    ScheduleProps,
    ScheduleType,
    ScheduleTypeDes,
} from '../../../props/DataStructure.ts';
import HourMinComponent from './HourMinComponent.tsx';
import MonthDayComponent from './MonthDayComponent.tsx';
import WeekDayComponent from './WeekDayComponent.tsx';
import PeriodComponent from './PeriodComponent.tsx';
import { SaveScheduledJob, UpdateScheduledJob } from '../../../service/api.ts';

const Wrapper = styled.div`
    height: 85vh;
`;

const ScheduleJobFormComponent: React.FC<ScheduleProps> = ({
    jobParam,
    closeModal,
}) => {
    const [job, setJob] = useState<BJob>();
    const mustInputMessage = 'Please input!';
    const [form] = Form.useForm();

    const sumbit = (bJob: BJob) => {
        console.log(bJob);
        if (jobParam) {
            console.log('update job');
            UpdateScheduledJob(bJob).then((r) => {
                console.log(r);
                closeModal();
            });
        } else {
            console.log('save job');
            SaveScheduledJob(bJob).then((r) => {
                console.log(r);
            });
        }
    };
    useEffect(() => {
        if (jobParam) {
            setJob(jobParam);
            form.setFieldsValue(jobParam);
        }
    }, []);

    console.log('job:', job);

    return (
        <Wrapper>
            <Flex justify="center" style={{ minHeight: '500px' }}>
                <Form
                    preserve={false}
                    form={form}
                    layout="vertical"
                    style={{ width: 400, margin: 20 }}
                    onFinish={sumbit}
                    initialValues={job}
                >
                    <Form.Item
                        label="バッチ名"
                        name="jobName"
                        rules={[{ required: true, message: mustInputMessage }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="バッチURL"
                        name="jobUrl"
                        rules={[{ required: true, message: mustInputMessage }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="定時周期：" name="scheduleType">
                        <Select
                            onChange={(value) => {
                                console.log(value);
                                setJob({ ...job!, scheduleType: value });
                            }}
                        >
                            {Object.entries(ScheduleTypeDes).map(
                                ([key, value]) => (
                                    <Select.Option key={key} value={key}>
                                        {value.description}
                                    </Select.Option>
                                ),
                            )}
                        </Select>
                    </Form.Item>
                    {job?.scheduleType == ScheduleType.Year && (
                        <Flex vertical={false} gap={20}>
                            <HourMinComponent job={job} />
                            <Form.Item label="日" name="day">
                                <Select>
                                    {Array.from({ length: 31 }, (_, i) => (
                                        <Select.Option
                                            key={i + 1}
                                            value={i + 1}
                                        >
                                            {i + 1}日
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item label={'月'} name="month">
                                <Select>
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <Select.Option
                                            key={i + 1}
                                            value={i + 1}
                                        >
                                            {i + 1}月
                                        </Select.Option>
                                    ))}
                                </Select>
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

                    <Button
                        style={{ float: 'right' }}
                        type="primary"
                        htmlType="submit"
                    >
                        保存
                    </Button>
                </Form>
            </Flex>
        </Wrapper>
    );
};

export default ScheduleJobFormComponent;
