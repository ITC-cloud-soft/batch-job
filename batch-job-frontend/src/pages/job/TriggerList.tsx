import styled from 'styled-components';
import { Button, Flex, Modal, Space, Table, TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { BJob, JobType } from '../../props/DataStructure.ts';
import { GetJobList } from '../../service/api.ts';
import TriggerForm from '../../component/Job/Trigger/TriggerForm.tsx';
import Title from 'antd/es/typography/Title';
import { useLocation, useNavigate } from 'react-router-dom';
import LanguageButton from '../../component/LanguageButton/LanguageButton.tsx';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
    height: 85vh;
`;

const TriggerList = () => {
    const [jobList, setJobList] = useState<BJob[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [job, setJob] = useState<BJob>();
    const [t, i18n] = useTranslation();
    const [lng, setLng] = useState<string>();
    const [showForwardButton, setShowForwardButton] = useState<boolean>(true);
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };
    const query = useQuery();

    const navigate = useNavigate();
    useEffect(() => {
        // 获取参数，例如 ?id=123 则 query.get('id') 会返回 '123'
        const language = query.get('lng');
        if (language) {
            setShowForwardButton(false);
            setLng(language);
            i18n.changeLanguage(language);
        }

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
            title: t('job.jobName'),
            dataIndex: 'jobName',
            key: ' jobName',
        },
        {
            title: t('job.scheduledJob'),
            dataIndex: 'jobTriggerId',
            key: 'jobTriggerId',
            render: (_, { jobTriggerId }) => {
                return jobTriggerId;
            },
        },
        {
            title: t('job.jobNo'),
            dataIndex: 'jobNo',
            key: 'jobNo',
        },
        {
            title: t('job.jobUrl'),
            dataIndex: 'jobUrl',
            key: 'jobUrl',
            width: '300px',
            ellipsis: true, // 内容超出时显示省略号
        },
        {
            title: t('job.action'),
            dataIndex: 'id',
            key: 'id',
            render: (_, { id }) => {
                return (
                    <>
                        <Space size={10}>
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
                    <Title level={2}> {t('job.triggerJobList')}</Title>
                    <Flex gap={10}>
                        <Button
                            onClick={() => {
                                setJob(undefined);
                                setIsModalOpen(true);
                            }}
                        >
                            {t('job.newTriggerJob')}
                        </Button>
                        {showForwardButton && (
                            <Button
                                onClick={() => {
                                    navigate('/scheduled');
                                }}
                            >
                                {t('job.scheduledJobList')}
                            </Button>
                        )}
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
            </div>
        </Wrapper>
    );
};

export default TriggerList;
