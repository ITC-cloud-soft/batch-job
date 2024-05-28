import React from 'react';
import { HmProps, StartType } from '../../props/DataStructure.ts';
import { Checkbox, Col, Flex, Form, Radio, Row } from 'antd';

const PeriodComponent: React.FC<HmProps> = ({ job, setJob }) => {
    const dayOfWeekFormatter = new Intl.DateTimeFormat('ja-JP', {
        weekday: 'long',
    });
    const daysOfWeek = [...Array(7).keys()].map((i) => {
        const date = new Date();
        date.setDate(date.getDate() - date.getDay() + i);
        return dayOfWeekFormatter.format(date);
    });
    console.log(daysOfWeek);
    return (
        <Flex vertical>
            <Flex gap={20}>
                <Form.Item name={'startType'}>
                    <Radio.Group
                        onChange={(e) =>
                            setJob &&
                            setJob({ ...job!, startType: e.target.value })
                        }
                    >
                        <Radio value={1}>バッチ起動日</Radio>
                        <Radio value={2}>バッチ起動日(曜日)</Radio>
                    </Radio.Group>
                </Form.Item>
            </Flex>
            <Flex gap={20}>
                {job?.startType == StartType.Day && (
                    <Form.Item name={'BatchLaunchMonthDay'}>
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
                )}
                {job?.startType == StartType.Week && (
                    <Form.Item name={'BatchLaunchWeekDay'}>
                        <Checkbox.Group>
                            <Row>
                                {daysOfWeek.map((value, i) => (
                                    <Col span={6} key={i}>
                                        <Checkbox value={i}>{value}</Checkbox>
                                    </Col>
                                ))}
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                )}
            </Flex>
        </Flex>
    );
};

export default PeriodComponent;
