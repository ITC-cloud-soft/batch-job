import styled from 'styled-components';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { Alert } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LanguageButton from '../component/LanguageButton/LanguageButton.tsx';
import { useTranslation } from 'react-i18next';
import { register } from '../service/api.ts';
import { UserRegisterParam } from '../props/DataStructure.ts';
import featureWorkImg from '/src/assets/img/banner-img-01.svg';

const Wrapper = styled.div``;
const LoginMessage: React.FC<{
    content: string;
}> = ({ content }) => {
    return (
        <Alert
            style={{
                marginBottom: 24,
            }}
            message={content}
            type="error"
            showIcon
        />
    );
};

const Actions = () => {
    const { t } = useTranslation();
    return (
        <div>
            <Link to={'/login'}>{t('registerPage.login')}</Link>
        </div>
    );
};

const Register = () => {
    const { t } = useTranslation();
    const [registerFlag, setRegisterFlag] = useState(false);
    const navigate = useNavigate();

    return (
        <Wrapper>
            <LanguageButton />
            <LoginForm<UserRegisterParam>
                onFinish={async (param) => {
                    console.log(param);
                    try {
                        await register(param);
                        navigate('/');
                    } catch (e) {
                        console.log(e);
                        setRegisterFlag(true);
                    }
                }}
                submitter={{
                    searchConfig: {
                        submitText: t('registerPage.register'), // 自定义登录按钮的文本
                    },
                    resetButtonProps: {
                        style: {
                            // 可选，自定义重置按钮样式
                        },
                    },
                }}
                contentStyle={{
                    minWidth: 280,
                    maxWidth: '75vw',
                }}
                logo={
                    <img alt="logo" src={featureWorkImg} />
                }
                title="Cloud Store"
                subTitle={t('registerPage.subTitle')}
                initialValues={{
                    autoLogin: true,
                }}
                actions={<Actions />}
            >
                {registerFlag && <LoginMessage content="Register Failed" />}
                <ProFormText
                    name="accountName"
                    fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined />,
                    }}
                    placeholder={t('login.userName')}
                    rules={[
                        {
                            required: true,
                            message: t('registerPage.inputUsername'),
                        },
                    ]}
                />
                <ProFormText
                    name="userMail"
                    fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined />,
                    }}
                    placeholder="Email:"
                    rules={[
                        {
                            required: true,
                            message: t('registerPage.inputEmail'),
                        },
                    ]}
                />
                <ProFormText
                    name="orgId"
                    fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined />,
                    }}
                    placeholder={t('registerPage.company')}
                    rules={[
                        {
                            required: true,
                            message: t('registerPage.inputCompany'),
                        },
                    ]}
                />
                <ProFormText.Password
                    name="password"
                    fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined />,
                    }}
                    placeholder={t('login.password')}
                    rules={[
                        {
                            required: true,
                            message: t('login.pwdEmpty'),
                        },
                    ]}
                />
                <ProFormText.Password
                    name="password"
                    fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined />,
                    }}
                    placeholder={t('registerPage.confirmPassword')}
                    rules={[
                        {
                            required: true,
                            message: t('login.pwdEmpty'),
                        },
                    ]}
                />
            </LoginForm>
        </Wrapper>
    );
};

export default Register;
