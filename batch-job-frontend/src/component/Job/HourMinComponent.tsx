import { Flex, Form, Select } from 'antd';
import { ScheduleTypeDes } from '../../props/DataStructure.ts';

const HourMinComponent = () => {
    const minuteOptions = Array.from({ length: 60 }, (_, i) => `${i}分`);

    return (
        <Flex gap={20}>
            <Form.Item
                label="分"
                name="minute"
                style={{ minWidth: 80, maxWidth: 100 }}
            >
                <Select>
                    {minuteOptions.map((value, index) => (
                        <Select.Option key={value} value={index}>
                            {value}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label="時"
                name="hour"
                style={{ minWidth: 80, maxWidth: 100 }}
            >
                <Select>
                    {Object.entries(ScheduleTypeDes).map(([key, value]) => (
                        <Select.Option key={key} value={key}>
                            {value.description}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </Flex>
    );
};
export default HourMinComponent;
