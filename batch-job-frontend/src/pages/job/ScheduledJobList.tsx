import styled from 'styled-components';
import { Button, Flex, Modal, Space, Table, TableProps, Tag } from 'antd';
import { useEffect, useState } from 'react';
import {
    BJob,
    JobType,
    modalState,
    TaskJobStatus,
} from '../../props/DataStructure.ts';
import { ExecuteJob, GetJobList, StopJob } from '../../service/api.ts';
import ScheduleJobForm from '../../component/Job/Batch/ScheduleJobForm.tsx';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import LanguageButton from '../../component/LanguageButton/LanguageButton.tsx';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';

const Wrapper = styled.div`
    height: 85vh;
`;

const ScheduledJobList = () => {
    const [jobList, setJobList] = useState<BJob[]>([]);
    const [job, setJob] = useState<BJob>();
    const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);
    const navigate = useNavigate();
    const [t] = useTranslation();
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
                          taskJobStatusDes: 'アクティブ',
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
                          taskJobStatusDes: '停止',
                      }
                    : e,
            );
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
            title: t('job.jobName'),
            dataIndex: 'jobName',
            key: ' jobName',
        },
        {
            title: t('job.scheduleType'),
            dataIndex: 'ScheduleType',
            key: 'ScheduleType',
            render: (_, { scheduleTypeStr }) => {
                return scheduleTypeStr;
            },
        },
        {
            title: t('job.cronExpressionStr'),
            dataIndex: 'cronExpressionStr',
            key: 'cronExpressionStr',
        },
        {
            title: t('job.jobUrl'),
            dataIndex: 'jobUrl',
            key: 'jobUrl',
            width: '300px',
            ellipsis: true, // 内容超出时显示省略号
        },
        {
            title: t('job.status'),
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
            title: t('job.status'),
            dataIndex: 'id',
            key: 'id',
            render: (_, { id, status }) => {
                return (
                    <>
                        <Space size={10}>
                            {status === TaskJobStatus.Stop && (
                                <a href="#" onClick={() => executeJob(id)}>
                                    {t('job.start')}
                                </a>
                            )}
                            {status === TaskJobStatus.Processing && (
                                <a href="#" onClick={() => stopJob(id)}>
                                    {t('job.stop')}
                                </a>
                            )}
                            <a href="#" onClick={() => editJob(id)}>
                                {t('job.edit')}
                            </a>
                        </Space>
                    </>
                );
            },
        },
    ];

    return (
        <Wrapper>
            <LanguageButton />
            <div style={{ padding: '30px' }}>
                <Flex justify={'space-between'} align={'center'}>
                    <Title level={2}>定時JOB一覧</Title>
                    <Flex gap={10}>
                        <Button
                            onClick={() => {
                                setJob(undefined);
                                setIsModalOpen(true);
                            }}
                        >
                            新規定時JOB
                        </Button>
                        <Button
                            onClick={() => {
                                navigate('/trigger');
                            }}
                        >
                            トリガーJOB一覧
                        </Button>
                    </Flex>
                </Flex>
                <Table dataSource={jobList} columns={columns}></Table>
                <Modal
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={''}
                    destroyOnClose
                    style={{
                        minHeight: '80vh',
                        maxHeight: '70vh',
                        overflowY: 'auto',
                    }} // 设置最大高度，并启用滚动
                    bodyStyle={{
                        height: '80vh',
                        maxHeight: '70vh',
                        overflowY: 'auto',
                    }} // 设置内容区域最大高度，并启用滚动
                >
                    {!job && <ScheduleJobForm closeModal={handleCancel} />}

                    {job && (
                        <ScheduleJobForm
                            jobParam={job}
                            closeModal={handleCancel}
                        />
                    )}
                </Modal>
            </div>
        </Wrapper>
    );
};

export default ScheduledJobList;
