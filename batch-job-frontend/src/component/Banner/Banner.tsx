import styled from 'styled-components';
import './../../assets/css/bootstrap.css';
import './../../assets/css/boxicon.min.css';
import './../../assets/css/custom.css';
import './../../assets/css/templatemo.css';
const Wrapper = styled.div`
    work_banner {
        background-image: url('./../../assets/img/banner-bg-02.jpg');
        background-position: center center;
        background-size: cover;
        height: 100%;
        width: 100%;
    }
`;
const Banner = () => {
    return (
        <Wrapper>
            <div
                id="work_banner"
                className="banner-wrapper bg-light w-100 py-5"
            >
                <div className="banner-vertical-center-work container text-light d-flex justify-content-center align-items-center py-5 p-0">
                    <div className="banner-content col-lg-8 col-12 m-lg-auto text-center">
                        <h1 className="banner-heading h2 display-3 pb-5 semi-bold-600 typo-space-line-center">
                            Our Work
                        </h1>
                        <h3 className="h4 pb-2 regular-400">
                            Elit, sed do eiusmod tempor incididunt
                        </h3>
                        <p className="banner-body pb-2 light-300">
                            Vector illustration{' '}
                            <a
                                className="text-white"
                                href="http://freepik.com/"
                                target="_blank"
                            >
                                Freepik
                            </a>
                            . Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Quis ipsum suspendisse ultrices
                            gravida. Risus commodo viverra maecenas accumsan
                            lacus.
                        </p>
                        <button
                            type="submit"
                            className="btn rounded-pill btn-secondary text-light px-4 light-300"
                        >
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Banner;
