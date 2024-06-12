import {
    AndroidOutlined,
    AppleOutlined,
    BellOutlined,
    CreditCardOutlined,
    LoginOutlined,
    LogoutOutlined,
    SearchOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { DefaultFooter, ProSettings } from '@ant-design/pro-components';
import { ProLayout } from '@ant-design/pro-components';
import { useState } from 'react';
import { Dropdown, Input, MenuProps, Tooltip } from 'antd';
import LayoutProps from './LayoutProps.tsx';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { jwtDecode } from 'jwt-decode';
import { UserJwtPayLoad } from '../../props/DataStructure.ts';

const AppLayout = () => {
    const navigate = useNavigate();
    const settings: ProSettings | undefined = {
        layout: 'mix',
        splitMenus: true,
    };
    const onClick: MenuProps['onClick'] = ({ key }) => {
        // change language
        i18n.changeLanguage(key).then(() => {
            console.log(`switch to ${key}`);
        });
    };

    const items: MenuProps['items'] = [
        {
            key: 'zh-CN',
            label: '中文简体',
        },
        {
            key: 'ja-JP',
            label: '日本語',
        },
        {
            key: 'en-US',
            label: 'English',
        },
    ];

    const token = localStorage.getItem('token');

    const { t } = useTranslation();
    const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1');
    return (
        <>
            <ProLayout
                id="1"
                title="Cloud Store"
                {...LayoutProps}
                location={{
                    pathname,
                }}
                menu={{
                    type: 'group',
                }}
                avatarProps={
                    token
                        ? {
                              src: jwtDecode<UserJwtPayLoad>(token).avatar,
                              size: 'default',
                              title: jwtDecode<UserJwtPayLoad>(token).userName,
                              render: (_props, dom) => {
                                  return (
                                      <Dropdown
                                          menu={{
                                              items: [
                                                  {
                                                      key: 'creditCard',
                                                      icon: (
                                                          <CreditCardOutlined />
                                                      ),
                                                      label: t(
                                                          'home.creditCardManage',
                                                      ),
                                                  },
                                                  {
                                                      key: 'logout',
                                                      icon: <LogoutOutlined />,
                                                      label: t('home.logout'),
                                                      onClick: () => {
                                                          localStorage.removeItem(
                                                              'token',
                                                          );
                                                          navigate('/login');
                                                      },
                                                  },
                                              ],
                                          }}
                                      >
                                          {dom}
                                      </Dropdown>
                                  );
                              },
                          }
                        : undefined
                }
                actionsRender={(props) => {
                    if (props.isMobile) return [];
                    return [
                        props.layout !== 'side' &&
                        document.body.clientWidth > 1400 ? (
                            <div
                                key="SearchOutlined"
                                aria-hidden
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginInlineEnd: 24,
                                }}
                                onMouseDown={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                }}
                            >
                                <Input
                                    style={{
                                        borderRadius: 4,
                                        marginInlineEnd: 12,
                                        backgroundColor: 'rgba(0,0,0,0.03)',
                                    }}
                                    prefix={
                                        <SearchOutlined
                                            style={{
                                                color: 'rgba(0, 0, 0, 0.15)',
                                            }}
                                        />
                                    }
                                    placeholder="Search"
                                    variant="borderless"
                                />
                            </div>
                        ) : undefined,
                        <BellOutlined key="infoCircle" />,
                        <SettingOutlined key="settring" />,
                        <Dropdown
                            menu={{
                                items,
                                onClick,
                            }}
                            arrow
                        >
                            <i className="anticon">
                                <svg
                                    viewBox="0 0 24 24"
                                    focusable="false"
                                    width="1em"
                                    height="1em"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                    <path
                                        d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "
                                        className="css-c4d79v"
                                    ></path>
                                </svg>
                            </i>
                        </Dropdown>,
                        token ? undefined : (
                            <Tooltip placement="left" title="Login">
                                <LoginOutlined
                                    onClick={() => navigate('/login')}
                                />
                            </Tooltip>
                        ),
                    ];
                }}
                menuHeaderRender={() => {
                    return (
                        <>
                            <>CloudStore</>
                        </>
                    );
                }}
                menuFooterRender={(props) => {
                    if (props?.collapsed) return undefined;
                    return (
                        <div
                            style={{
                                textAlign: 'center',
                                paddingBlockStart: 12,
                            }}
                        >
                            <div>© 2021 Made with love</div>
                            <div>by Ant Design</div>
                        </div>
                    );
                }}
                menuItemRender={(item, dom) => {
                    const onClick = () => {
                        if (
                            item.path &&
                            item.path !== window.location.pathname
                        ) {
                            setPathname(pathname);
                            navigate(item.path);
                        }
                    };
                    return (
                        <div onClick={onClick} style={{ cursor: 'pointer' }}>
                            {dom}
                        </div>
                    );
                }}
                {...settings}
                footerRender={() => (
                    <DefaultFooter
                        links={[
                            {
                                key: 'test',
                                title: (
                                    <>
                                        <AppleOutlined /> Apple
                                    </>
                                ),
                                href: 'www.alipay.com',
                            },
                            {
                                key: 'test2',
                                title: (
                                    <>
                                        <AndroidOutlined /> Android
                                    </>
                                ),
                                href: 'www.alipay.com',
                            },
                        ]}
                        copyright="Copyright © 2022-2024"
                    />
                )}
            >
                <Outlet /> {/* 这里将渲染匹配的子路由组件 */}
            </ProLayout>
        </>
    );
};
export default AppLayout;
