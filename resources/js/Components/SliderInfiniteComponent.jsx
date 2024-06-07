import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';
import '../../css/SliderInfiniteComponent.css';

const SliderInfiniteComponent = ({imagenes}) => {
    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
        >
            {imagenes.map((imagen, index) => (
                <SwiperSlide key={index}>
                    <img src={`/storage/${imagen.imagen}`} alt={`Slide ${index + 1}`} />
                    <div className="text-overlay">{imagen.nombre}</div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SliderInfiniteComponent;


