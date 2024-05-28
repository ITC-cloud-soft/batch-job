import React from 'react';
import { HmProps } from '../../props/DataStructure.ts';
import { Flex, Form, Radio } from 'antd';

const PeriodComponent: React.FC<HmProps> = () => {
    return (
        <Flex gap={20}>
            <Form.Item name={'startType'}>
                <Radio.Group>
                    <Radio value={1}>バッチ起動日</Radio>
                    <Radio value={2}>バッチ起動日(曜日)</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item name={'BatchLaunchMonthDay'}>
                <Radio.Group>
                    <Radio value={1}>バッチ起動日</Radio>
                    <Radio value={2}>バッチ起動日(曜日)</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item name={'BatchLaunchMonthDay'}>
                <Radio.Group>
                    <Radio value={1}>バッチ起動日</Radio>
                    <Radio value={2}>バッチ起動日(曜日)</Radio>
                </Radio.Group>
            </Form.Item>
        </Flex>
    );
};

export default PeriodComponent;
