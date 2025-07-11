import { useState } from "react";

type Props = {
  images: string[];
};

export const ProductGallery: React.FC<Props> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex gap-6 lg:gap-10">
      <div className="flex flex-col gap-4">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`border overflow-hidden ${
              index === activeIndex
                ? "ring-2 ring-primary"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={`${import.meta.env.BASE_URL}${img}`}
              alt={`thumb-${index}`}
              className="w-20 h-20 object-cover"
            />
          </button>
        ))}
      </div>

      <div className="flex-1 flex items-center justify-center">
        <img
          src={`${import.meta.env.BASE_URL}${images[activeIndex]}`}
          alt="main-product"
          className="max-w-full max-h-[500px] object-contain rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};
