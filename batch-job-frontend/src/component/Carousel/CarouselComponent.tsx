import styled from 'styled-components';
import { Avatar, Carousel, Flex, Segmented } from 'antd';
import { FC, useRef } from 'react';
import { CarouselRef } from 'antd/es/carousel';
import { WorkImagesProps } from '../../props/DataStructure.ts';

const Wrapper = styled.div`
    width: 90%;
    .ant-segmented-group {
        gap: 20px;
    }
`;

const CarouselComponent: FC<WorkImagesProps> = ({ images }) => {
    const carouselRef = useRef<CarouselRef>(null);

    return (
        <Wrapper>
            <Carousel ref={carouselRef} style={{ marginBottom: '10px' }}>
                {images?.map((image, index) => (
                    <div key={index}>
                        <img
                            src={image}
                            alt={`Slide ${index}`}
                            style={{ width: '100%', height: '800px' }}
                        />
                    </div>
                ))}
            </Carousel>

            <Flex vertical={true} align={'center'}>
                <Segmented
                    onChange={(value) => {
                        carouselRef.current?.goTo(Number(value));
                    }}
                    style={{ gap: '10px' }}
                    options={images?.map((image, index) => ({
                        label: (
                            <div style={{ padding: 4 }}>
                                <Avatar src={image} />
                            </div>
                        ),
                        value: `${index}`,
                    }))}
                />
            </Flex>
        </Wrapper>
    );
};
export default CarouselComponent;
