import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Button, Flex, Form, Input, Select } from 'antd';
import {
    BJob,
    ScheduleType,
    ScheduleTypeDes,
} from '../../props/DataStructure.ts';
import HourMinComponent from './HourMinComponent.tsx';
import MonthDayComponent from './MonthDayComponent.tsx';
import WeekDayComponent from './WeekDayComponent.tsx';

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
                createdDate: '',
                cronExpression: '',
                day: 0,
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
                month: 0,
                scheduleType: ScheduleType.Year,
                scheduleTypeStr: '年次処理',
                second: 0,
                status: 1,
                taskJobStatusColor: '',
                taskJobStatusDes: '',
                weekDay: 0,
                year: 0,
                jobName: '123',
            };
            setJob(initialJob);
            form.setFieldsValue(initialJob);
        }, 1000); // 模拟延迟加载
    }, []);

    return (
        <Wrapper>
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
                        {Object.entries(ScheduleTypeDes).map(([key, value]) => (
                            <Select.Option key={key} value={key}>
                                {value.description}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                {job?.scheduleType == ScheduleType.Year && (
                    <Flex vertical={false} gap={20}>
                        <HourMinComponent job={job} />
                        <Form.Item
                            label="日"
                            name="day"
                            style={{ minWidth: 80, maxWidth: 100 }}
                        >
                            <Select>
                                {Object.entries(ScheduleTypeDes).map(
                                    ([key, value]) => (
                                        <Select.Option key={key} value={key}>
                                            {value.description}
                                        </Select.Option>
                                    ),
                                )}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label={'月'}
                            name="day"
                            style={{ minWidth: 80, maxWidth: 100 }}
                        >
                            <Select>
                                {Object.entries(ScheduleTypeDes).map(
                                    ([key, value]) => (
                                        <Select.Option key={key} value={key}>
                                            {value.description}
                                        </Select.Option>
                                    ),
                                )}
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
                        <Flex wrap={'nowrap'} gap={20}>
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

                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </Wrapper>
    );
};

export default ScheduleJobFormComponent;
