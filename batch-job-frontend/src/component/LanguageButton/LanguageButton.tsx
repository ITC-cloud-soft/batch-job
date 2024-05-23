import styled from 'styled-components';
import { Dropdown, MenuProps, message } from 'antd';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
    width: 42px;
    height: 42px;
    line-height: 42px;
    position: fixed;
    right: 16px;
    border-radius: 6px;

    .ant-dropdown-trigger {
        cursor: pointer;
        padding: 12px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        vertical-align: middle;
    }
`;

const items: MenuProps['items'] = [
    {
        label: '简体中文',
        key: 'zh-CN',
    },
    {
        label: '日本語',
        key: 'ja',
    },
    {
        label: 'English',
        key: 'en-US',
    },
];

const LanguageButton = () => {
    const { i18n } = useTranslation();
    const onClick: MenuProps['onClick'] = ({ key }) => {
        message.info(`Click on item ${key}`);
        // change language
        i18n.changeLanguage(key).then(() => {
            console.log(`switch to ${key}`);
        });
    };
    return (
        <Wrapper>
            <Dropdown menu={{ items, onClick }}>
                <span className="ant-dropdown-trigger">
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
                </span>
            </Dropdown>
        </Wrapper>
    );
};
export default LanguageButton;
