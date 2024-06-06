import React, { useEffect, useState } from 'react';
import { Button, Result } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { GetJob } from '../../service/api.ts';
import { BJob } from '../../props/DataStructure.ts';

const ResultPage: React.FC = () => {
    const [job, setJob] = useState<BJob>();
    const [jobType, setType] = useState<string>();
    const { id, type } = useParams();
    useEffect(() => {
        if (id) {
            GetJob(id).then((res) => {
                setJob(res);
            });
        }
        if (type) {
            setType(type);
        }
    }, []);
    return (
        <Result
            status="success"
            title="Successfully Create Job!"
            subTitle={`Job Id:${job?.id} Job Name: ${job?.jobName}`}
            extra={[
                <Button type="primary" key="console">
                    <Link to={jobType == '1' ? '/trigger' : '/scheduled'}>
                        Go to Job List Page
                    </Link>
                </Button>,
                <Button key="buy">
                    <Link
                        to={jobType == '1' ? '/trigger/add' : '/scheduled/add'}
                    >
                        Create Again
                    </Link>
                </Button>,
            ]}
        />
    );
};

export default ResultPage;
