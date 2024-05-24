import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Button, Col, Flex, Form, Input, Select } from 'antd';
import {
    BJob,
    ScheduleType,
    ScheduleTypeDes,
} from '../../props/DataStructure.ts';

const Wrapper = styled.div`
    height: 85vh;
`;
// interface MinuteSelectProps {
//     defaultValue?: string;
//     onChange: (value: number) => void;
//     suffix: string;
// }
// 生成 0 到 59 的分钟选项
// const MinuteSelectComponent: React.FC<MinuteSelectProps> = ({
//     defaultValue,
//     onChange,
//     suffix,
// }) => {
//     const minuteOptions = Array.from({ length: 60 }, (_, i) => `${i}${suffix}`);
//
//     return (
//         <Select
//             defaultValue={defaultValue}
//             onChange={(v) => onChange(Number.parseInt(v))}
//         >
//             {minuteOptions.map((value, index) => (
//                 <Select.Option key={value} value={index}>
//                     {value}
//                 </Select.Option>
//             ))}
//         </Select>
//     );
// };

const ScheduleJobFormComponent = () => {
    useEffect(() => {
        setJob({
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
        });
    }, []);

    const [job, setJob] = useState<BJob>();
    const mustInputMessage = 'Please input!';
    const minuteOptions = Array.from({ length: 60 }, (_, i) => `${i}分`);
    const sumbit = (job: BJob) => {
        console.log(job);
    };

    return (
        <Wrapper>
            <Form
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
                    <Select defaultValue={job?.scheduleType}>
                        {Object.entries(ScheduleTypeDes).map(([key, value]) => (
                            <Select.Option key={key} value={key}>
                                {value.description}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Flex vertical={false} gap={20}>
                    <Form.Item
                        label="分"
                        name="minute"
                        style={{ minWidth: 80, maxWidth: 100 }}
                    >
                        <Select defaultValue={job?.minute}>
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
                        <Select defaultValue={job?.minute}>
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
                        label="時"
                        name="hour"
                        style={{ minWidth: 80, maxWidth: 100 }}
                    >
                        <Select defaultValue={job?.hour}>
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
                        label="日"
                        name="day"
                        style={{ minWidth: 80, maxWidth: 100 }}
                    >
                        <Select defaultValue={job?.day}>
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
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </Wrapper>
    );
};

export default ScheduleJobFormComponent;
