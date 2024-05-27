import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Button, Checkbox, Col, Flex, Form, Input, Row, Select } from 'antd';
import { BJob, ScheduleTypeDes } from '../../props/DataStructure.ts';
import HourMinComponent from './HourMinComponent.tsx';

const Wrapper = styled.div`
    height: 85vh;
`;
const ScheduleJobFormComponent = () => {
    const [job, setJob] = useState<BJob>();
    const mustInputMessage = 'Please input!';
    const minuteOptions = Array.from({ length: 60 }, (_, i) => `${i}分`);
    const sumbit = (s: BJob) => {
        console.log(s);
        console.log(job);
    };
    const [form] = Form.useForm();
    useEffect(() => {
        // 模拟异步数据加载
        setTimeout(() => {
            const initialJob: BJob = {
                createdDate: '',
                cronExpression: '',
                day: 0,
                hour: 0,
                id: 1,
                jobGroup: '',
                jobNo: 1,
                jobTriggerId: 0,
                jobType: 1,
                jobUrl: '',
                key: 0,
                minute: 0,
                modifiedDate: '',
                month: 0,
                scheduleType: undefined,
                scheduleTypeStr: undefined,
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
                <Form.Item label="定時周期：" name="scheduleType">
                    <Select>
                        {Object.entries(ScheduleTypeDes).map(([key, value]) => (
                            <Select.Option key={key} value={key}>
                                {value.description}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Flex vertical={false} gap={20}>
                    <HourMinComponent />
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
                <Flex vertical={false} gap={20}>
                    <Form.Item
                        label="分"
                        name="minute"
                        style={{ minWidth: 80, maxWidth: 100 }}
                    >
                        <Select>
                            {minuteOptions.map((value, index) => (
                                <Select.Option key={value} value={index}>
                                    {value}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="時"
                        name="hour"
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
                <Flex vertical={false} gap={20}>
                    <Form.Item>
                        <Checkbox.Group>
                            <Row>
                                {Array.from({ length: 31 }, (_, i) => (
                                    <Col span={6} key={i}>
                                        <Checkbox value={i + 1}>
                                            {i + 1}日
                                        </Checkbox>
                                    </Col>
                                ))}
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                </Flex>

                <HourMinComponent />
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </Wrapper>
    );
};

export default ScheduleJobFormComponent;
