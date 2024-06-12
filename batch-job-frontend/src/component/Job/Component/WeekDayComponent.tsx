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
        date.setDate(date.getDate() - date.getDay() + i);
        const weekDay = dayOfWeekFormatter.format(date);

        return { label: weekDay, value: i + '' };
    });

    const [t] = useTranslation();

    return (
        <Flex gap={20} vertical={false}>
            <Form.Item
                label={t('job.weekday')}
                name="weekDay"
                style={{ width: '80px' }}
            >
                <Select options={daysOfWeek} />
            </Form.Item>
        </Flex>
    );
};
export default WeekDayComponent;
