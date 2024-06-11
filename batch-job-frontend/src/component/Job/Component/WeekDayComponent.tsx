import { Flex, Form, Select } from 'antd';

const WeekDayComponent = () => {
    const dayOfWeekFormatter = new Intl.DateTimeFormat('ja-JP', {
        weekday: 'long',
    });
    const daysOfWeek = [...Array(7).keys()].map((i) => {
        const date = new Date();
        date.setDate(date.getDate() - date.getDay() + i);
        const weekDay = dayOfWeekFormatter.format(date);

        return { label: weekDay, value: i + '' };
    });

    return (
        <Flex gap={20} vertical={false}>
            <Form.Item label="曜日：" name="weekDay" style={{ width: '80px' }}>
                <Select options={daysOfWeek} />
            </Form.Item>
        </Flex>
    );
};
export default WeekDayComponent;
