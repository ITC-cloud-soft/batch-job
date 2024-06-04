import styled from 'styled-components';
import { Space, Table, TableProps, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { BJob, JobType } from '../../props/DataStructure.ts';
import { GetJobList } from '../../service/api.ts';

const Wrapper = styled.div`
    height: 85vh;
`;

const TriggerListPage = () => {
    const [jobList, setJobList] = useState<BJob[]>([]);

    useEffect(() => {
        GetJobList(JobType.Trigger).then((data) => {
            const jobList = data.items.map((job) => ({ ...job, key: job.id }));
            setJobList(jobList);
        });
    }, []);

    const editJob = (jobId: number) => {
        console.log(jobId);
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
                console.log(id, 'x');
                console.log(_, 'x');
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
        </Wrapper>
    );
};

export default TriggerListPage;
