import "./PicturesSlider.scss";
import { useEffect, useRef } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Slider from "react-slick";
import { Banner } from "../Banner/Banner";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const PicturesSlider = () => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bunner relative min-h-[320px] md:min-h-[189px] lg:min-h-[400px]">
      <ChevronLeft
        className="slick-prev"
        onClick={() => sliderRef.current?.slickPrev()}
      />

      <Slider ref={sliderRef} {...settings}>
        <Banner color="bg-black" />
        <Banner color="bg-red-400" />
        <Banner color="bg-cyan-700" />
      </Slider>

      <ChevronRight
        className="slick-next"
        onClick={() => sliderRef.current?.slickNext()}
      />
    </div>
  );
};
