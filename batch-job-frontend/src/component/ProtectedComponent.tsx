import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 定义Props类型
interface ProtectedComponentProps {
    children: React.ReactNode;
}

const ProtectedComponent: React.FC<ProtectedComponentProps> = ({
    children,
}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // 从localStorage中获取token
    useEffect(() => {
        if (!token) {
            // 如果没有token，则重定向到登录页面
            navigate('/login', { replace: true });
        }
    }, [token, navigate]);

    return <div>{token ? children : 'Redirecting...'}</div>;
};

export default ProtectedComponent;
