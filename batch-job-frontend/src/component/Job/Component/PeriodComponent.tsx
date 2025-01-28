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
        // 设置星期为 i + 1，确保从周一开始
        date.setDate(date.getDate() - ((date.getDay() + 6) % 7) + i);
        const weekDay = dayOfWeekFormatter.format(date);
        return { label: weekDay, value: (i + 1).toString() };
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
                                {daysOfWeek.map(({ label, value }) => (
                                    <Col span={6} key={value}>
                                        <Checkbox value={value}>
                                            {label}
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
