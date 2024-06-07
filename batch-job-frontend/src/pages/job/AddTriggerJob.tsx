import { Flex } from 'antd';
import TriggerForm from '../../component/Job/Trigger/TriggerForm.tsx';
import Title from 'antd/es/typography/Title';

const AddTriggerJob = () => {
    return (
        <Flex vertical align={'center'}>
            <Flex>
                <Title level={2}>トリガーJOB設定</Title>
            </Flex>
            <Flex>
                <TriggerForm
                    closeModal={function (): void {
                        throw new Error('Function not implemented.');
                    }}
                />
            </Flex>
        </Flex>
    );
};
export default AddTriggerJob;
