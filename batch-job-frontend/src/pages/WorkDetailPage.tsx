import styled from 'styled-components';
import {
    ProDescriptionsActionType,
    ProSkeleton,
    StatisticCard,
} from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { Avatar, Button, Empty, Flex, Modal, Space, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import {
    CheckCircleOutlined,
    CommentOutlined,
    DownloadOutlined,
    ForkOutlined,
    GithubOutlined,
    HddFilled,
    HeartFilled,
    ProjectOutlined,
} from '@ant-design/icons';
import Markdown from 'react-markdown';

import remarkGfm from 'remark-gfm';
import CarouselComponent from '../component/Carousel/CarouselComponent.tsx';
import CommentComponent from '../component/TreeComments/CommentComponent.tsx';
import {
    downloadJsonFile,
    getWorkInfo,
    viewTemplateFile,
} from '../service/api.ts';
import { WorkInfo } from '../props/DataStructure.ts';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;

    .d-container {
        display: flex;
        align-self: self-start;
        margin-top: 60px;
        min-width: 90%;
    }

    .d-right-menu {
        padding: 10px;
        gap: 10px;
        display: flex;
        flex-direction: column;
        width: 20%;
    }

    .d-carousel {
        margin-top: 30px;
    }

    .d-container {
        display: flex;
        flex-direction: row; /* 按需调整，这里假设是行布局 */
    }

    .d-description {
        flex-grow: 1;
        flex-shrink: 1;
        min-width: 300px; /* 根据需要调整最小宽度 */
        max-width: 100%; /* 允许填充至父容器宽度 */
    }
`;

const imgStyle = {
    display: 'block',
    width: 42,
    height: 42,
};
// 辅助函数来创建初始 WorkInfo 对象
const createInitialWorkInfo = (): WorkInfo => ({
    author: '',
    carouselImages: [],
    categories: [],
    commentId: '',
    comments: [],
    deleteFlag: false,
    description: '',
    disable: false,
    downloadTime: 0,
    id: 0,
    image: '',
    name: '',
    org: {
        id: 0,
        orgName: '',
        mainPage: '',
    },
    orgId: 0,
    price: {
        id: 0,
        tekiyoFrom: '',
        tekiyoEnd: '',
        spec: '',
        price: 0,
        currency: '',
        type: '',
        order: 0,
    },
    priceId: 0,
    version: '',
    videoUrl: '',
    workContent: '',
});

const WorkDetailPage = () => {
    const actionRef = useRef<ProDescriptionsActionType>();
    const { id } = useParams();
    const { t } = useTranslation();

    const [workInfo, setWorkInfo] = useState<WorkInfo>(createInitialWorkInfo());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewTemplate, setViewTemplate] = useState<string>('');

    // view json modal
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // <ProSkeleton type="descriptions" />
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getWorkInfo(id).then((res) => {
            res && setWorkInfo(res);
            setLoading(false);
        });
    }, [id]);

    const download = async () => {
        await downloadJsonFile(workInfo.id);
    };
    return (
        <Wrapper>
            {loading ? (
                <ProSkeleton type="descriptions" />
            ) : (
                <div>
                    <Modal
                        style={{ minWidth: '90%' }}
                        title="Template View"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <div>
                            <Markdown remarkPlugins={[remarkGfm]}>
                                {viewTemplate}
                            </Markdown>
                        </div>
                    </Modal>
                    <div className={'d-title'}>
                        <ProDescriptions
                            actionRef={actionRef}
                            title={
                                <Flex align={'center'} gap={10}>
                                    <Avatar
                                        style={{
                                            verticalAlign: 'middle',
                                        }}
                                        size={{
                                            xs: 24,
                                            sm: 32,
                                            md: 40,
                                            lg: 64,
                                            xl: 60,
                                            xxl: 80,
                                        }}
                                        gap={1}
                                        src={<img src={workInfo.image} />}
                                    />
                                    <Flex vertical={true}>
                                        <Flex gap={18}>
                                            <h2>ソリューション</h2>
                                            <Flex
                                                style={{ marginTop: '5px' }}
                                                vertical={false}
                                                align={'flex-start'}
                                            >
                                                {workInfo.categories &&
                                                    workInfo.categories.map(
                                                        (c, index) => (
                                                            <Tag
                                                                icon={
                                                                    <ForkOutlined />
                                                                }
                                                                key={index}
                                                                color="#55acee"
                                                            >
                                                                {c.category}
                                                            </Tag>
                                                        ),
                                                    )}
                                            </Flex>
                                        </Flex>
                                        <Flex gap={15}>
                                            <Space
                                                size={'small'}
                                                onClick={() => {
                                                    window.location.href =
                                                        'https://www.google.com';
                                                }}
                                            >
                                                <GithubOutlined />
                                                <a>{workInfo.author}</a>
                                            </Space>

                                            {workInfo.org && (
                                                <>
                                                    <Space size={'small'}>
                                                        <CheckCircleOutlined />
                                                        <a>
                                                            {
                                                                workInfo.org
                                                                    .orgName
                                                            }
                                                        </a>
                                                    </Space>
                                                    <Space
                                                        size={'small'}
                                                        onClick={() => {
                                                            window.location.href = `https://${workInfo.org.mainPage}`;
                                                        }}
                                                    >
                                                        <ProjectOutlined />
                                                        <a>主页</a>
                                                    </Space>
                                                </>
                                            )}
                                        </Flex>
                                    </Flex>
                                </Flex>
                            }
                            style={{
                                marginBottom: '20px',
                            }}
                            dataSource={{
                                id: workInfo.description,
                                date: '20200809',
                                money: '1212100',
                                state: 'all',
                                state2: 'open',
                            }}
                            columns={[
                                {
                                    title: 'description',
                                    key: 'text',
                                    dataIndex: 'id',
                                    ellipsis: true,
                                    copyable: true,
                                },
                                {
                                    title: '操作',
                                    valueType: 'option',
                                    render: () => [
                                        <Button
                                            type={'text'}
                                            icon={<CommentOutlined />}
                                        />,
                                        <Button
                                            type={'text'}
                                            icon={<HeartFilled />}
                                        />,
                                    ],
                                },
                            ]}
                        ></ProDescriptions>
                    </div>
                    <Flex
                        style={{ width: ' 100%' }}
                        className={'d-carousel'}
                        vertical={true}
                        align={'center'}
                        justify={'center'}
                    >
                        <CarouselComponent images={workInfo.carouselImages} />
                    </Flex>
                    <div className={'d-container'}>
                        <div className={'d-description'}>
                            {workInfo.workContent ? (
                                <Markdown remarkPlugins={[remarkGfm]}>
                                    {workInfo.workContent}
                                </Markdown>
                            ) : (
                                <Empty description={true} />
                            )}

                            <CommentComponent
                                commentItems={workInfo.comments}
                                workId={workInfo.id}
                                key={workInfo.id}
                            />
                        </div>
                        <div className={'d-right-menu'}>
                            <Button
                                onClick={download}
                                icon={<DownloadOutlined />}
                            >
                                {t('workDetail.download')}
                            </Button>
                            <Button
                                icon={<HddFilled />}
                                onClick={() => {
                                    viewTemplateFile(workInfo.id)
                                        .then((r) => {
                                            showModal();
                                            setViewTemplate(JSON.stringify(r));
                                        })
                                        .catch((e) => {
                                            console.error(e);
                                        });
                                }}
                            >
                                {t('workDetail.jsonView')}
                            </Button>

                            <StatisticCard
                                statistic={{
                                    title: t('workDetail.paymentAmount'),
                                    value: `${workInfo.price ? workInfo.price.price : 0}￥`,
                                    icon: (
                                        <img
                                            style={imgStyle}
                                            src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*dr_0RKvVzVwAAAAAAAAAAABkARQnAQ"
                                            alt="icon"
                                        />
                                    ),
                                }}
                            />

                            <StatisticCard
                                statistic={{
                                    title: t('workDetail.pageViews'),
                                    value: workInfo.downloadTime,
                                    icon: (
                                        <img
                                            style={imgStyle}
                                            src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*pUkAQpefcx8AAAAAAAAAAABkARQnAQ"
                                            alt="icon"
                                        />
                                    ),
                                }}
                            />
                            {workInfo.videoUrl && (
                                <ReactPlayer
                                    url={workInfo.videoUrl}
                                    controls={true}
                                    style={{
                                        maxWidth: '100%',
                                        borderRadius: '5px',
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Wrapper>
    );
};
export default WorkDetailPage;
