import styled from 'styled-components';
import Banner from '../component/Banner/Banner.tsx';
import AppList from '../component/AppList/AppList.tsx';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column; /* 子项从上到下排列 */
    justify-content: flex-start; /* 子项在纵轴上从顶部开始排列 */
`;
const WorkPage = () => {
    return (
        <Wrapper>
            <Banner />
            <AppList />
        </Wrapper>
    );
};
export default WorkPage;
