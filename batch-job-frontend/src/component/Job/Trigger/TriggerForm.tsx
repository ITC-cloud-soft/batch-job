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
import { useTranslation } from 'react-i18next';

const TriggerForm: React.FC<JobProps> = ({ closeModal, jobParam }) => {
    const [form] = useForm();
    const [job, setJob] = useState<BJob>();
    const [scJobList, setScJobList] = useState<BJob[]>();
    const [t] = useTranslation();
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
                        content: t('job.saveError'),
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
                <Title level={3}>{t('job.triggerJobSetting')}</Title>
            </Flex>
            <Form
                form={form}
                layout="vertical"
                style={{ minWidth: 200, maxWidth: 500, margin: 20 }}
                onFinish={submit}
                initialValues={job}
            >
                <Form.Item
                    label={t('job.jobName')}
                    name="jobName"
                    rules={[
                        {
                            required: true,
                            message: t('job.jobNameValidate'),
                        },
                    ]}
                >
                    <Input style={{ width: 300 }} />
                </Form.Item>

                <Form.Item
                    label={t('job.jobUrl')}
                    name="jobUrl"
                    rules={[
                        {
                            required: true,
                            message: t('job.jobUrlValidate'),
                        },
                    ]}
                >
                    <Input style={{ width: 300 }} />
                </Form.Item>
                <Form.Item label={t('job.scheduledJob')}>
                    <Space>
                        <Form.Item
                            name="jobTriggerId"
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    message: t('job.jobTriggerIdValidate'),
                                },
                            ]}
                        >
                            <Select style={{ width: 300 }} options={options} />
                        </Form.Item>
                    </Space>
                </Form.Item>

                <Form.Item label={t('job.jobNo')}>
                    <Space>
                        <Form.Item
                            name="jobNo"
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    message: t('job.jobNoValidate'),
                                },
                            ]}
                        >
                            <Input style={{ width: 300 }} />
                        </Form.Item>
                        <Tooltip title="Useful information">
                            <a>{t('job.jobManageNo')}</a>
                        </Tooltip>
                    </Space>
                </Form.Item>
                <Flex justify={'center'}>
                    <Button type="primary" htmlType="submit">
                        {t('job.save')}
                    </Button>
                </Flex>
            </Form>
        </Flex>
    );
};
export default TriggerForm;
