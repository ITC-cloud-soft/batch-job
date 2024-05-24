import styled from 'styled-components';
import { Space, Table, TableProps, Tag } from 'antd';
import { useEffect, useState } from 'react';
import {
    BJob,
    JobType,
    TaskJobStatusDescriptions,
} from '../props/DataStructure.ts';
import { GetJobList } from '../service/api.ts';

const Wrapper = styled.div`
    height: 85vh;
`;

const BatchList = () => {
    const [jobList, setJobList] = useState<BJob[]>([]);
    useEffect(() => {
        GetJobList(JobType.Scheduled).then((data) => {
            const jobList = data.items.map((job) => ({ ...job, key: job.id }));
            setJobList(jobList);
        });
    }, []);

    const executeJob = (jobId: number) => {
        console.log(jobId);
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
            dataIndex: 'scheduleType',
            key: 'scheduleType',
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
                            <a href="#" onClick={() => executeJob(id)}>
                                起動
                            </a>
                            <a>編集</a>
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

export default BatchList;
