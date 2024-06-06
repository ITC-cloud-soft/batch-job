import styled from 'styled-components';
import { Modal, Space, Table, TableProps, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { BJob, JobType, TaskJobStatus } from '../../props/DataStructure.ts';
import { ExecuteJob, GetJobList, StopJob } from '../../service/api.ts';
import ScheduleJobFormComponent from '../../component/Job/Batch/ScheduleJobFormComponent.tsx';

const Wrapper = styled.div`
    height: 85vh;
`;

const ScheduledJobList = () => {
    const [jobList, setJobList] = useState<BJob[]>([]);
    const [job, setJob] = useState<BJob>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        GetJobList(JobType.Scheduled).then((data) => {
            const jobList = data.items.map((job) => ({ ...job, key: job.id }));
            setJobList(jobList);
        });
    }, []);

    const executeJob = (jobId: number) => {
        ExecuteJob(jobId).then(() => {
            const list = jobList.map((e) =>
                e.id == jobId
                    ? {
                          ...e,
                          status: TaskJobStatus.Processing,
                          taskJobStatusColor: 'green',
                          taskJobStatusDes: 'processing',
                      }
                    : e,
            );
            console.log(list);
            setJobList(list);
        });
    };

    const stopJob = (jobId: number) => {
        console.log(jobId);
        StopJob(jobId).then(() => {
            const list = jobList.map((e) =>
                e.id === jobId
                    ? {
                          ...e,
                          status: TaskJobStatus.Stop,
                          taskJobStatusColor: 'black',
                          taskJobStatusDes: 'stopped',
                      }
                    : e,
            );
            console.log(list);
            setJobList(list);
        });
    };

    const editJob = (jobId: number) => {
        setIsModalOpen(true);
        setJob(jobList.find((e) => e.id == jobId)!);
    };

    const handleOk = () => {
        // update job
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        GetJobList(JobType.Scheduled).then((data) => {
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
            title: '実行種類',
            dataIndex: 'ScheduleType',
            key: 'ScheduleType',
            render: (_, { scheduleTypeStr }) => {
                return scheduleTypeStr;
            },
        },
        {
            title: '実行設定',
            dataIndex: 'cronExpressionStr',
            key: 'cronExpressionStr',
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
                            <a href="#" onClick={() => executeJob(id)}>
                                起動
                            </a>
                            <a href="#" onClick={() => stopJob(id)}>
                                停止
                            </a>
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
                title="編集"
                footer={''}
                destroyOnClose
                style={{ maxHeight: '80vh', overflowY: 'auto' }} // 设置最大高度，并启用滚动
                bodyStyle={{ maxHeight: '60vh', overflowY: 'auto' }} // 设置内容区域最大高度，并启用滚动
            >
                <ScheduleJobFormComponent
                    jobParam={job}
                    closeModal={handleCancel}
                />
            </Modal>
        </Wrapper>
    );
};

export default ScheduledJobList;
