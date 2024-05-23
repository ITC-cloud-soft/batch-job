// navigateTo404.js
import { useNavigate } from 'react-router-dom';
export const navigateTo404 = () => {
    const navigate = useNavigate();
    return () => {
        navigate('/404');
    };
};
