import { BJob, JobProps, JobType } from '../../../props/DataStructure.ts';
import {
    Button,
    Flex,
    Form,
    Input,
    message,
    Select,
    Space,
    Tooltip,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import { GetJobList, SaveJob, UpdateJob } from '../../../service/api.ts';
import Title from 'antd/es/typography/Title';
import { validateAlphanumeric } from '../../../utils/util.ts';

const TriggerForm: React.FC<JobProps> = ({ closeModal, jobParam }) => {
    const [form] = useForm();
    const [job, setJob] = useState<BJob>();
    const [scJobList, setScJobList] = useState<BJob[]>();

    const [messageApi, contextHolder] = message.useMessage();
    const submit = async (param: BJob) => {
        if (jobParam) {
            UpdateJob({ ...jobParam, ...param }).then((r) => {
                console.log(r);
                closeModal();
            });
        } else {
            param = { ...param, jobType: JobType.Trigger };
            SaveJob(param)
                .then((res) => {
                    console.log(res);
                    closeModal();
                })
                .catch((e) => {
                    console.error(e);
                    messageApi.open({
                        type: 'error',
                        content: '保存に失敗しました。もう一度お試しください',
                    });
                });
        }
    };

    useEffect(() => {
        if (jobParam) {
            setJob(jobParam);
            form.setFieldsValue(jobParam);
        }
        GetJobList(JobType.Scheduled).then((res) => {
            setScJobList(res.items);
        });
    }, [form, jobParam]);
    const options = scJobList?.map((e) => ({ value: e.id, label: e.jobName }));
    return (
        <Flex align="center" vertical={true} style={{ minHeight: '500px' }}>
            {contextHolder}
            <Flex justify={'space-between'} align={'center'}>
                <Title level={3}>トリガーJOB設定</Title>
            </Flex>
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
                            rules={[
                                {
                                    required: true,
                                    message: 'バッチ名を入力してください',
                                },
                                { validator: validateAlphanumeric },
                            ]}
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
                    rules={[
                        {
                            required: true,
                            message: 'バッチURLを入力してください',
                        },
                    ]}
                >
                    <Input style={{ width: 300 }} />
                </Form.Item>
                <Form.Item label="定時周期JOB">
                    <Space>
                        <Form.Item
                            name="jobTriggerId"
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    message: '定時周期JOBを入力してください',
                                },
                            ]}
                        >
                            <Select style={{ width: 300 }} options={options} />
                        </Form.Item>
                    </Space>
                </Form.Item>

                <Form.Item label="バッチ番号：">
                    <Space>
                        <Form.Item
                            name="jobNo"
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    message: 'バッチ番号を入力してください',
                                },
                            ]}
                        >
                            <Input style={{ width: 300 }} />
                        </Form.Item>
                        <Tooltip title="Useful information">
                            <a>※バッチ管理番号</a>
                        </Tooltip>
                    </Space>
                </Form.Item>
                <Flex justify={'center'}>
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                </Flex>
            </Form>
        </Flex>
    );
};
export default TriggerForm;
