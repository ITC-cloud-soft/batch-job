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
import { useLocation, useNavigate } from 'react-router-dom';
import LanguageButton from '../../component/LanguageButton/LanguageButton.tsx';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { getScheduleTypeDes } from '../../utils/util.ts';

const Wrapper = styled.div`
    height: 85vh;
`;

const ScheduledJobList = () => {
    const [jobList, setJobList] = useState<BJob[]>([]);
    const [job, setJob] = useState<BJob>();
    const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);
    const navigate = useNavigate();
    const [t, i18n] = useTranslation();
    const [lng, setLng] = useState<string>();
    const [showForwardButton, setShowForwardButton] = useState<boolean>(true);

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };
    const query = useQuery();

    useEffect(() => {
        // 获取参数，例如 ?id=123 则 query.get('id') 会返回 '123'
        const language = query.get('lng');
        if (language) {
            setShowForwardButton(false);
            setLng(language);
            i18n.changeLanguage(language);
        }
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
            render: (_, { scheduleType }) => {
                return getScheduleTypeDes(scheduleType);
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
                        {record.status == 7 ? t('job.stop') : t('job.start')}
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
            {!lng && <LanguageButton />}
            <div style={{ padding: '30px' }}>
                <Flex justify={'space-between'} align={'center'}>
                    <Title level={2}>{t('job.scheduledJobList')}</Title>
                    <Flex gap={10}>
                        <Button
                            onClick={() => {
                                setJob(undefined);
                                setIsModalOpen(true);
                            }}
                        >
                            {t('job.newScheduleJob')}
                        </Button>
                        {showForwardButton && (
                            <Button
                                onClick={() => {
                                    navigate('/trigger');
                                }}
                            >
                                {t('job.triggerJobList')}
                            </Button>
                        )}
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
