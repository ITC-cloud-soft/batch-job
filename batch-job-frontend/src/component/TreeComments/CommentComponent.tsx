import { Avatar, Button, Form, Input, List } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Comment } from '@ant-design/compatible';
import styled from 'styled-components';
import {
    CommentItem,
    CommentsProps,
    UserJwtPayLoad,
} from '../../props/DataStructure.ts';
import { createCommand } from '../../service/api.ts';
import { useTranslation } from 'react-i18next';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
const { TextArea } = Input;

interface EditorProps {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    submitting: boolean;
    value: string;
}

const Wrapper = styled.div`
    .d-comment {
        background: #f5f4f4;
    }
`;

const CommentList = ({ comments }: { comments: CommentItem[] }) => {
    const { t } = useTranslation();
    return (
        <List
            className={'d-comment'}
            dataSource={comments}
            header={`${comments.length} ${comments.length > 1 ? t('workDetail.replies') : t('workDetail.reply')}`}
            itemLayout="horizontal"
            renderItem={(props) => (
                <Comment className={'d-comment'} {...props} />
            )}
        />
    );
};

const Editor = ({ onChange, onSubmit, submitting, value }: EditorProps) => {
    const { t } = useTranslation();

    return (
        <div className={'d-comment'}>
            <Form.Item style={{ width: '80%' }}>
                <TextArea rows={4} onChange={onChange} value={value} />
            </Form.Item>
            <Form.Item>
                <Button
                    htmlType="submit"
                    loading={submitting}
                    onClick={onSubmit}
                    type="primary"
                >
                    {t('workDetail.addComment')}
                </Button>
            </Form.Item>
        </div>
    );
};

const CommentComponent: React.FC<CommentsProps> = ({
    commentItems,
    workId,
}) => {
    const [comments, setComments] = useState<CommentItem[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');
    const { t } = useTranslation();
    const navigate = useNavigate();

    // 初始化 comments 状态
    useEffect(() => {
        if (commentItems) {
            setComments(commentItems);
        }
    }, [commentItems]); // 依赖项列表中包含 commentItems

    const handleSubmit = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            debugger;
            navigate('/login');
            return;
        }

        if (!value) return;
        setSubmitting(true);

        const payLoad: UserJwtPayLoad = jwtDecode(token);
        console.log(payLoad);

        const currentComment: CommentItem = {
            userId: payLoad.id,
            author: payLoad.userName,
            avatar: payLoad.avatar,
            content: value,
            datetime: moment.now().toString(),
            userName: payLoad.userName,
            workId: workId,
            key: workId,
        };

        createCommand(currentComment)
            .then((e) => {
                setSubmitting(false);
                setValue('');
                setComments([...comments, e]);
            })
            .catch((ex) => {
                console.error(ex);
            });
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    return (
        <Wrapper>
            <h3>{t('workDetail.comments')}</h3>
            {comments.length > 0 && <CommentList comments={comments} />}
            <Comment
                className={'d-comment'}
                avatar={
                    <Avatar
                        src="https://joeschmoe.io/api/v1/random"
                        alt="Han Solo"
                    />
                }
                content={
                    <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={value}
                    />
                }
            />
        </Wrapper>
    );
};

export default CommentComponent;
