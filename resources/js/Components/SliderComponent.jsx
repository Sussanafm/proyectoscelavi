import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import '../../css/SliderComponent.css';

const SliderComponent = ({ imagenes }) => {
    return (
        <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
        >
            {imagenes.map((imagen, index) => (
                <SwiperSlide key={index} className="relative">
                    <a href={`/coleccion/${imagen.id}/${imagen.nombre}`}>
                        <img
                            src={`/storage/${imagen.imagen}`}
                            alt={`Slide ${index + 1}`}
                            className="object-cover w-full h-64 md:h-80 lg:h-96"
                        />
                    </a>
                    <div className="text-overlay">{imagen.nombre}</div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SliderComponent;
