import { Flex, Form, Select } from 'antd';

const WeekDayComponent = () => {
    const dayOfWeekFormatter = new Intl.DateTimeFormat('ja-JP', {
        weekday: 'long',
    });
    const daysOfWeek = [...Array(7).keys()].map((i) => {
        const date = new Date();
        date.setDate(date.getDate() - date.getDay() + i);
        return dayOfWeekFormatter.format(date);
    });
    return (
        <Flex gap={20} vertical={false}>
            <Form.Item
                label="曜日："
                name="minute"
                style={{ minWidth: 80, maxWidth: 100 }}
            >
                <Select>
                    {daysOfWeek.map((value, index) => (
                        <Select.Option key={value} value={index}>
                            {value}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </Flex>
    );
};
export default WeekDayComponent;
