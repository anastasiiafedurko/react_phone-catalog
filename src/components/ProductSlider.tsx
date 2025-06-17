import Slider from "react-slick";

const baseUrl = "../../../../public";

type Props = {
  images: string[];
};

export const ProductSlider: React.FC<Props> = ({ images }) => {
  const settings = {
    customPaging: function (i: number) {
      return (
        <a>
          <img src={`${baseUrl}/${images[i]}`} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image}>
            <img src={baseUrl + "/" + image} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
