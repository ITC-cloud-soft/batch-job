import { BJob, JobProps, JobType } from '../../../props/DataStructure.ts';
import { Button, Form, Input, Space, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import { SaveJob, UpdateJob } from '../../../service/api.ts';

const TriggerForm: React.FC<JobProps> = ({ closeModal, jobParam }) => {
    const [form] = useForm();
    const mustInputMessage = 'Please input!';
    const [job, setJob] = useState<BJob>();
    const submit = (param: BJob) => {
        if (jobParam) {
            UpdateJob({ ...jobParam, ...param }).then((r) => {
                console.log(r);
                closeModal();
            });
        } else {
            param = { ...param, jobType: JobType.Trigger };
            SaveJob(param)
                .then((r) => {
                    console.log(r);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    };

    useEffect(() => {
        if (jobParam) {
            setJob(jobParam);
            form.setFieldsValue(jobParam);
        }
    }, [form, jobParam]);

    return (
        <Form
            form={form}
            layout="vertical"
            style={{ minWidth: 200, maxWidth: 500, margin: 20 }}
            onFinish={submit}
            initialValues={job}
        >
            <Form.Item label="バッチ名">
                <Space>
                    <Form.Item
                        name="jobName"
                        noStyle
                        rules={[{ required: true, message: mustInputMessage }]}
                    >
                        <Input style={{ width: 300 }} />
                    </Form.Item>
                    <Tooltip title="Useful information">
                        <a>※英数字</a>
                    </Tooltip>
                </Space>
            </Form.Item>

            <Form.Item
                label="バッチURL"
                name="jobUrl"
                rules={[{ required: true, message: mustInputMessage }]}
            >
                <Input style={{ width: 300 }} />
            </Form.Item>
            <Form.Item label="定時周期JOB">
                <Space>
                    <Form.Item
                        name="jobTriggerId"
                        noStyle
                        rules={[{ required: true, message: mustInputMessage }]}
                    >
                        <Input style={{ width: 300 }} />
                    </Form.Item>
                    <Tooltip title="Useful information">
                        <a>※TODO</a>
                    </Tooltip>
                </Space>
            </Form.Item>

            <Form.Item label="バッチ番号：">
                <Space>
                    <Form.Item
                        name="jobNo"
                        noStyle
                        rules={[{ required: true, message: mustInputMessage }]}
                    >
                        <Input style={{ width: 300 }} />
                    </Form.Item>
                    <Tooltip title="Useful information">
                        <a>※バッチ管理番号</a>
                    </Tooltip>
                </Space>
            </Form.Item>
            <Space size={'large'}>
                <Button type="primary" htmlType="submit">
                    保存
                </Button>
                <Button type="default">戻る</Button>
            </Space>
        </Form>
    );
};
export default TriggerForm;
