import { Flex, Form, Select } from 'antd';
import { HmProps } from '../../../props/DataStructure.ts';
import React from 'react';
import { useTranslation } from 'react-i18next';

const HourMinComponent: React.FC<HmProps> = () => {
    const [t] = useTranslation();

    const minuteOptions = Array.from(
        { length: 60 },
        (_, i) => `${i}${t('job.minute')}`,
    );

    const hourOptions = Array.from(
        { length: 24 },
        (_, i) => `${i}${t('job.hour')}`,
    );

    return (
        <Flex gap={20}>
            <Form.Item
                style={{ width: '70px' }}
                label={t('job.minute')}
                name="minute"
                rules={[
                    {
                        required: true,
                        message: t('job.minValidate'),
                    },
                ]}
            >
                <Select>
                    {minuteOptions.map((value, index) => (
                        <Select.Option key={index} value={`${index}`}>
                            {value}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label={t('job.hour')}
                name="hour"
                style={{ minWidth: 70 }}
                rules={[
                    {
                        required: true,
                        message: t('job.hourValidate'),
                    },
                ]}
            >
                <Select>
                    {hourOptions.map((value, index) => (
                        <Select.Option key={index} value={`${index}`}>
                            {value}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </Flex>
    );
};
export default HourMinComponent;
