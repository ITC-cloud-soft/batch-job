import styled from 'styled-components';
import { Button, Card, Flex, Pagination, Space } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Category, WorkInfoWithPagination } from '../../props/DataStructure.ts';
import {
    getAllCategories,
    getWorkInfoWithPagination,
} from '../../service/api.ts';
import { useTranslation } from 'react-i18next';
import featureWorkImg from '/src/assets/img/feature-work-3.jpg';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 40px;
    margin-top: 40px;
`;

const AppList = () => {
    const [categories, setCategory] = useState<Category[]>([]);

    const { t } = useTranslation();
    const [workInfoWithPagination, setWorkInfoWithPagination] =
        useState<WorkInfoWithPagination>({
            hasNextPage: true,
            hasPreviousPage: false,
            items: [],
            pageSize: 0,
            pageNumber: 0,
            totalCount: 0,
            totalPages: 0,
        });

    const [currentCategory, setCurrentCategory] = useState<Category>({
        categoryId: 0,
        categoryName: '',
    });

    useEffect(() => {
        getAllCategories()
            .then((res) => {
                setCategory(res);
            })
            .catch((ex) => {
                console.error(ex);
            });

        // set default work info initially
        queryWorkInfoByCategory(0);
    }, []);

    const pageSize = 6;

    const queryWorkInfoByCategory = (categoryId: number, pageNumber = 1) => {
        setCurrentCategory({ categoryId: categoryId, categoryName: '' });
        getWorkInfoWithPagination({
            categoryId: categoryId,
            pageSize: pageSize,
            pageNumber: pageNumber,
        })
            .then((result) => {
                if (result.totalCount <= 0) {
                    result.items = [];
                }
                console.log(result);
                setWorkInfoWithPagination(result);
            })
            .catch((e) => {
                console.error(e);
            });
    };
    return (
        <Wrapper>
            <Flex gap="5px" wrap="wrap">
                {categories.map((category) => (
                    <Button
                        key={category.categoryId}
                        type="primary"
                        shape="round"
                        size="large"
                        onClick={() =>
                            queryWorkInfoByCategory(category.categoryId)
                        }
                    >
                        {category.categoryName}
                    </Button>
                ))}
            </Flex>
            <Flex gap="10px" justify="left" align="flex-start" wrap="wrap">
                {workInfoWithPagination.items.map((workInfo) => {
                    return (
                        <Card
                            key={workInfo.id} // 最好使用一个唯一标识符，而不是 index，如果 appInfo 有 id 或类似的字段，使用那个字段
                            hoverable
                            style={{
                                width: '460px',
                            }}
                            cover={
                                <img
                                    style={{ height: '380px' }}
                                    alt="example"
                                    src={featureWorkImg}
                                />
                            }
                        >
                            <Meta
                                title={workInfo.name}
                                description={workInfo.description}
                            />
                            <Space
                                style={{
                                    display: 'flex',
                                }}
                            >
                                <Link to={`/work/${workInfo.id}`}>
                                    {t('home.more')}
                                </Link>
                                <a type={'text'}>{t('home.download')}</a>
                            </Space>
                        </Card>
                    );
                })}
            </Flex>
            {workInfoWithPagination.totalCount > 0 && (
                <Pagination
                    total={workInfoWithPagination.totalCount}
                    pageSize={pageSize}
                    onChange={(pageNumber) =>
                        queryWorkInfoByCategory(
                            currentCategory?.categoryId,
                            pageNumber,
                        )
                    }
                />
            )}
        </Wrapper>
    );
};

export default AppList;
