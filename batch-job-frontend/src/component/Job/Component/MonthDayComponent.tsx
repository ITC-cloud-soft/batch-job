import React from 'react';
import { HmProps } from '../../../props/DataStructure.ts';
import { Checkbox, Col, Flex, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';

const MonthDayComponent: React.FC<HmProps> = () => {
    const [t] = useTranslation();
    return (
        <Flex vertical={false} gap={20}>
            <Form.Item
                name={'batchLaunchMonthDay'}
                rules={[
                    {
                        required: true,
                        message: '日付を入力してください',
                    },
                ]}
            >
                <Checkbox.Group>
                    <Row>
                        {Array.from({ length: 31 }, (_, i) => (
                            <Col span={6} key={i}>
                                <Checkbox value={`${i + 1}`}>
                                    {i + 1}
                                    {t('job.day')}
                                </Checkbox>
                            </Col>
                        ))}
                    </Row>
                </Checkbox.Group>
            </Form.Item>
        </Flex>
    );
};
export default MonthDayComponent;
