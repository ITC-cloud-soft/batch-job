import React from 'react';
import { HmProps, StartType } from '../../../props/DataStructure.ts';
import { Checkbox, Col, Flex, Form, Radio, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

const PeriodComponent: React.FC<HmProps> = ({ job, setJob }) => {
    const [t] = useTranslation();

    const currentLanguage = i18n.language;

    const dayOfWeekFormatter = new Intl.DateTimeFormat(currentLanguage, {
        weekday: 'long',
    });

    const daysOfWeek = [...Array(7).keys()].map((i) => {
        const date = new Date();
        date.setDate(date.getDate() - date.getDay() + i);
        return dayOfWeekFormatter.format(date);
    });

    return (
        <Flex vertical>
            <Flex>
                <Form.Item
                    name={'startType'}
                    rules={[
                        {
                            required: true,
                            message: t('job.startTypeValidate'),
                        },
                    ]}
                >
                    <Radio.Group
                        onChange={(e) =>
                            setJob &&
                            setJob({ ...job!, startType: e.target.value })
                        }
                    >
                        <Radio value={1}>{t('job.startTypeMonthDay')}</Radio>
                        <Radio value={2}>{t('job.startTypeWeekDay')}</Radio>
                    </Radio.Group>
                </Form.Item>
            </Flex>
            <Flex>
                {job?.startType == StartType.Day && (
                    <Form.Item
                        name={'batchLaunchMonthDay'}
                        rules={[
                            {
                                required: true,
                                message: t('job.batchLaunchMonthDayValidate'),
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
                )}
                {job?.startType == StartType.Week && (
                    <Form.Item
                        name={'batchLaunchWeekDay'}
                        rules={[
                            {
                                required: true,
                                message: t('job.batchLaunchMonthDayValidate'),
                            },
                        ]}
                    >
                        <Checkbox.Group>
                            <Row>
                                {daysOfWeek.map((value, i) => (
                                    <Col span={6} key={i}>
                                        <Checkbox value={`${i}`}>
                                            {value}
                                        </Checkbox>
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
