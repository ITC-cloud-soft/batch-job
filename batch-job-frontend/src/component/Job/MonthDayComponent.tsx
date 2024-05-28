import React from 'react';
import { HmProps } from '../../props/DataStructure.ts';
import { Checkbox, Col, Flex, Form, Row } from 'antd';

const MonthDayComponent: React.FC<HmProps> = () => {
    return (
        <Flex vertical={false} gap={20}>
            <Form.Item name={'batchLaunchMonthDay'}>
                <Checkbox.Group>
                    <Row>
                        {Array.from({ length: 31 }, (_, i) => (
                            <Col span={6} key={i}>
                                <Checkbox value={i + 1}>{i + 1}日</Checkbox>
                            </Col>
                        ))}
                    </Row>
                </Checkbox.Group>
            </Form.Item>
        </Flex>
    );
};
export default MonthDayComponent;
