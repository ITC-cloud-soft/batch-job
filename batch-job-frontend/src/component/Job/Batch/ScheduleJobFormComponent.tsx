import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Button, Flex, Form, Input, Select } from 'antd';
import {
    BJob,
    ScheduleType,
    ScheduleTypeDes,
} from '../../../props/DataStructure.ts';
import HourMinComponent from './HourMinComponent.tsx';
import MonthDayComponent from './MonthDayComponent.tsx';
import WeekDayComponent from './WeekDayComponent.tsx';
import PeriodComponent from './PeriodComponent.tsx';

const Wrapper = styled.div`
    height: 85vh;
`;

const ScheduleJobFormComponent = () => {
    const [job, setJob] = useState<BJob>();
    const mustInputMessage = 'Please input!';
    const sumbit = (s: BJob) => {
        console.log(s);
    };
    const [form] = Form.useForm();
    useEffect(() => {
        // 模拟异步数据加载
        setTimeout(() => {
            const initialJob: BJob = {
                startType: 1,
                scheduleType: ScheduleType.Year,
                createdDate: '',
                cronExpression: '',
                day: 1,
                hour: 3,
                id: 1,
                jobGroup: '',
                jobNo: 1,
                jobTriggerId: 0,
                jobType: 1,
                jobUrl: '',
                key: 0,
                minute: 2,
                modifiedDate: '',
                month: 1,
                scheduleTypeStr: '年次処理',
                second: 0,
                status: 1,
                taskJobStatusColor: '',
                taskJobStatusDes: '',
                weekDay: '0',
                year: 0,
                jobName: '123',
                batchLaunchMonthDay: [1, 2, 3],
                batchLaunchWeekDay: [1, 2, 3],
                loopStep: 1,
                workHourStart: 1,
                workHourEnd: 2,
            };
            setJob(initialJob);
            form.setFieldsValue(initialJob);
        }, 1000); // 模拟延迟加载
    }, []);

    console.log('job:', job);

    return (
        <Wrapper>
            <Flex justify="center" style={{ minHeight: '500px' }}>
                <Form
                    form={form}
                    layout="vertical"
                    style={{ maxWidth: 400, margin: 20 }}
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

                    <Button type="primary" htmlType="submit">
                        登録
                    </Button>
                </Form>
            </Flex>
        </Wrapper>
    );
};

export default ScheduleJobFormComponent;
