import { Flex } from 'antd';
import TriggerForm from '../../component/Job/Trigger/TriggerForm.tsx';

const AddTriggerJob = () => {
    return (
        <Flex vertical align={'center'}>
            <Flex>
                <h2>トリガーJOB設定</h2>
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
