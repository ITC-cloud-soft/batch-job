import { Flex, Form, Select } from 'antd';
import { HmProps } from '../../props/DataStructure.ts';
import React from 'react';

const HourMinComponent: React.FC<HmProps> = () => {
    const minuteOptions = Array.from({ length: 60 }, (_, i) => `${i}分`);
    const hourOptions = Array.from({ length: 23 }, (_, i) => `${i}時`);

    return (
        <Flex gap={20}>
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
                    {hourOptions.map((value, index) => (
                        <Select.Option key={value} value={index}>
                            {value}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </Flex>
    );
};
export default HourMinComponent;