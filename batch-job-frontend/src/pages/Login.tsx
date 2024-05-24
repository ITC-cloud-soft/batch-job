'use client';

import { Alert } from 'antd';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    DefaultFooter,
    LoginForm,
    ProFormCheckbox,
    ProFormText,
} from '@ant-design/pro-components';
import {
    AndroidOutlined,
    AppleOutlined,
    GithubFilled,
    GoogleCircleFilled,
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import LanguageButton from '../component/LanguageButton/LanguageButton.tsx';
import { UserLoginParam } from '../props/DataStructure.ts';
import { login } from '../service/api.ts';
import featureWorkImg from '/src/assets/img/banner-img-01.svg';

const Wrapper = styled.div`
    height: 85vh;
`;

const useStyles = createStyles(({ token }) => {
    return {
        action: {
            marginLeft: '8px',
            color: 'rgba(0, 0, 0, 0.2)',
            fontSize: '24px',
            verticalAlign: 'middle',
            cursor: 'pointer',
            transition: 'color 0.3s',
            '&:hover': {
                color: token.colorPrimaryActive,
            },
        },
        lang: {
            width: 42,
            height: 42,
            lineHeight: '42px',
            position: 'fixed',
            right: 16,
            borderRadius: token.borderRadius,
            ':hover': {
                backgroundColor: token.colorBgTextHover,
            },
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'auto',
            backgroundImage:
                "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
            backgroundSize: '100% 100%',
        },
    };
});
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
const ActionIcons = () => {
    const { styles } = useStyles();
    return (
        <>
            <GithubFilled
                size={20}
                key="GithubOutlined"
                className={styles.action}
                onClick={() => {
                    window.location.href =
                        'https://github.com/login/oauth/authorize?client_id=5503e92a98b97e2bb88c&scope=user:email';
                }}
            />
            <GoogleCircleFilled
                key="TaobaoCircleOutlined"
                className={styles.action}
                onClick={() => {
                    const clientId =
                        '729990845534-c145j6j8o80kjdbmefivel12rate842j.apps.googleusercontent.com';
                    const redirectUri = encodeURIComponent(
                        'https://e110-240f-140-ba1-1-ed2e-5bfe-103a-9d16.ngrok-free.app/oauth/google/callback',
                    );
                    const responseType = 'code';
                    const scope = encodeURIComponent('email profile');
                    const state = Math.random().toString(36).substring(7); // TODO 生成随机字符串作为 state 参数
                    const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}&access_type=offline`;
                    window.location.href = googleUrl;
                }}
            />
        </>
    );
};

const Login = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [warning, showWaring] = useState(false);
    const Actions = () => {
        return (
            <>
                <Link style={{ marginRight: '30px' }} to={'/register'}>
                    {t('login.switchToLogin')}
                </Link>
                {t('login.othersLoginWay')}
                <ActionIcons key="icons" />
            </>
        );
    };

    return (
        <Wrapper>
            <LanguageButton />
            <LoginForm<UserLoginParam>
                contentStyle={{
                    minWidth: 280,
                    maxWidth: '75vw',
                }}
                logo={<img alt="logo" src={featureWorkImg} />}
                title="Cloud Store"
                subTitle={'Yaml は世界一番好き.....'}
                initialValues={{
                    autoLogin: true,
                }}
                actions={<Actions />}
                onFinish={async (user) => {
                    try {
                        await login(user)
                            .then((token) => {
                                localStorage.setItem('token', token);
                                navigate('/');
                            })
                            .catch((e) => {
                                console.error('login failed', e);
                            });
                    } catch (error) {
                        console.error('Error occurred during login:', error);
                        showWaring(true);
                    }
                }}
            >
                {warning && <LoginMessage content={t('login.passwordError')} />}
                <ProFormText
                    name="UserMail"
                    fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined />,
                    }}
                    placeholder={t('login.userName')}
                    rules={[
                        {
                            required: true,
                            message: t('login.usernameEmpty'),
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
                <div
                    style={{
                        marginBottom: 24,
                    }}
                >
                    <ProFormCheckbox noStyle name="autoLogin">
                        {t('login.autoLogin')}
                    </ProFormCheckbox>
                    <a
                        style={{
                            float: 'right',
                        }}
                    >
                        {t('login.forgetPassword')}
                    </a>
                </div>
            </LoginForm>
            <DefaultFooter
                links={[
                    {
                        key: 'test',
                        title: (
                            <>
                                <AppleOutlined /> Yamler
                            </>
                        ),
                        href: 'www.alipay.com',
                    },
                    {
                        key: 'test2',
                        title: (
                            <>
                                <AndroidOutlined /> SaasFlow
                            </>
                        ),
                        href: 'www.alipay.com',
                    },
                ]}
                copyright="Copyright © 2022-2024"
            />
        </Wrapper>
    );
};
export default Login;
