import { Spin } from 'antd';
import { useEffect, useState } from 'react';

const GlobalSpin = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const handleShowSpin = () => setLoading(true);
        const handleHideSpin = () => setLoading(false);

        window.addEventListener('showSpin', handleShowSpin);
        window.addEventListener('hideSpin', handleHideSpin);

        return () => {
            window.removeEventListener('showSpin', handleShowSpin);
            window.removeEventListener('hideSpin', handleHideSpin);
        };
    }, []);
    return (
        loading && (
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1000,
                }}
            >
                <Spin size="large" />
            </div>
        )
    );
};

export default GlobalSpin;
