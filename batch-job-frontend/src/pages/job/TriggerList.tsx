import styled from 'styled-components';
import { Button, Flex, Modal, Space, Table, TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { BJob, JobType } from '../../props/DataStructure.ts';
import { GetJobList } from '../../service/api.ts';
import TriggerForm from '../../component/Job/Trigger/TriggerForm.tsx';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    height: 85vh;
`;

const TriggerList = () => {
    const [jobList, setJobList] = useState<BJob[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [job, setJob] = useState<BJob>();

    const navigate = useNavigate();
    useEffect(() => {
        GetJobList(JobType.Trigger).then((data) => {
            const jobList = data.items.map((job) => ({ ...job, key: job.id }));
            setJobList(jobList);
        });
    }, []);

    const editJob = (jobId: number) => {
        setIsModalOpen(true);
        setJob(jobList.find((e) => e.id == jobId)!);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        GetJobList(JobType.Trigger).then((data) => {
            const jobList = data.items.map((job) => ({ ...job, key: job.id }));
            setJobList(jobList);
        });
    };
    const columns: TableProps<BJob>['columns'] = [
        {
            title: 'バッチ名',
            dataIndex: 'jobName',
            key: ' jobName',
        },
        {
            title: '定時周期JOB',
            dataIndex: 'jobTriggerId',
            key: 'jobTriggerId',
            render: (_, { jobTriggerId }) => {
                return jobTriggerId;
            },
        },
        {
            title: 'バッチ番号',
            dataIndex: 'jobNo',
            key: 'jobNo',
        },
        {
            title: 'バッチURL',
            dataIndex: 'jobUrl',
            key: 'jobUrl',
            width: '300px',
            ellipsis: true, // 内容超出时显示省略号
        },
        {
            title: '操作',
            dataIndex: 'id',
            key: 'id',
            render: (_, { id }) => {
                return (
                    <>
                        <Space size={10}>
                            <a href="#" onClick={() => editJob(id)}>
                                編集
                            </a>
                        </Space>
                    </>
                );
            },
        },
    ];

    return (
        <Wrapper>
            <Flex justify={'space-between'} align={'center'}>
                <Title level={2}>トリガーJOB一覧</Title>
                <Flex gap={10}>
                    <Button
                        onClick={() => {
                            setJob(undefined);
                            setIsModalOpen(true);
                        }}
                    >
                        新規トリガーJOB
                    </Button>
                    <Button
                        onClick={() => {
                            navigate('/scheduled');
                        }}
                    >
                        定時JOB一覧
                    </Button>
                </Flex>
            </Flex>
            <Table dataSource={jobList} columns={columns}></Table>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                style={{ minHeight: 'auto' }}
                footer={''}
                destroyOnClose
            >
                {!job && <TriggerForm closeModal={handleCancel} />}
                {job && (
                    <TriggerForm jobParam={job} closeModal={handleCancel} />
                )}
            </Modal>
        </Wrapper>
    );
};

export default TriggerList;
