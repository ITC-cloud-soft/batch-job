import { Spin } from 'antd';
import { useRecoilState } from 'recoil';
import { loadingState } from '../props/DataStructure.ts';

const GlobalSpin = () => {
    const [loading] = useRecoilState(loadingState);
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
