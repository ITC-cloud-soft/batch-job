import { Flex, Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

const WeekDayComponent = () => {
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

    const [t] = useTranslation();

    return (
        <Flex gap={20} vertical={false}>
            <Form.Item
                label={t('job.weekday')}
                name="weekDay"
                style={{ width: '80px' }}
                rules={[
                    {
                        required: true,
                        message: t('job.weekValidate'),
                    },
                ]}
            >
                <Select options={daysOfWeek} />
            </Form.Item>
        </Flex>
    );
};
export default WeekDayComponent;
