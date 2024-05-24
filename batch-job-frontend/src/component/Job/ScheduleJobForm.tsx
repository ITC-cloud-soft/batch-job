import styled from 'styled-components';
import { useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import { ScheduleType } from '../../props/DataStructure.ts';

const Wrapper = styled.div`
    height: 85vh;
`;

const ScheduleJobFormComponent = () => {
    useEffect(() => {}, []);

    const mustInputMessage = 'Please input!';
    return (
        <Wrapper>
            <Form layout="vertical" style={{ maxWidth: 400, margin: 20 }}>
                <Form.Item
                    label="バッチ名"
                    name="jobName"
                    rules={[{ required: true, message: mustInputMessage }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="scheduleType" name="定時周期：">
                    <Select>
                        <Select.Option value={ScheduleType.Year}>
                            年次処理
                        </Select.Option>
                        <Select.Option value={ScheduleType.Month}>
                            月次処理
                        </Select.Option>
                        <Select.Option value={ScheduleType.Week}>
                            週次処理
                        </Select.Option>
                        <Select.Option value={ScheduleType.Day}>
                            日次処理
                        </Select.Option>
                        <Select.Option value={ScheduleType.Hour}>
                            時間隔処理
                        </Select.Option>
                        <Select.Option value={ScheduleType.Minute}>
                            分間隔処理
                        </Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Wrapper>
    );
};

export default ScheduleJobFormComponent;
