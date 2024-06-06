import styled from 'styled-components';
import { Modal, Space, Table, TableProps, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { BJob, JobType } from '../../props/DataStructure.ts';
import { GetJobList } from '../../service/api.ts';
import TriggerForm from '../../component/Job/Trigger/TriggerForm.tsx';

const Wrapper = styled.div`
    height: 85vh;
`;

const TriggerList = () => {
    const [jobList, setJobList] = useState<BJob[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [job, setJob] = useState<BJob>();

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
        },
        {
            title: '状態',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => {
                return (
                    <Tag color={record.taskJobStatusColor}>
                        {record.taskJobStatusDes}
                    </Tag>
                );
            },
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
            <Table dataSource={jobList} columns={columns}></Table>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                style={{ minHeight: 'auto' }}
                title="編集"
                footer={''}
                destroyOnClose
            >
                <TriggerForm jobParam={job} closeModal={handleCancel} />
            </Modal>
        </Wrapper>
    );
};

export default TriggerList;
