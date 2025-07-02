const divClass = "w-full h-auto object-cover";
const imgClass = "w-full h-auto mb-6";
const textXlClass = "text-xl font-mont text-primary mb-1";
const textSmClass = "text-sm font-mont text-secondary";

export const ShopByCategory = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-1 gap-4">
      <div className={divClass}>
        <img
          // src="../../../../public/img/category-phones1.png"
          src={`${import.meta.env.BASE_URL}img/category-phones1.png`}
          className={imgClass}
        />
        <p className={textXlClass}>Mobile phones</p>
        <p className={textSmClass}>95 models</p>
      </div>
      <div className={divClass}>
        <img
          // src="../../../../public/img/category-tablets1.png"
          src={`${import.meta.env.BASE_URL}img/category-tablets1.png`}
          className={imgClass}
        />
        <p className={textXlClass}>Tablets</p>
        <p className={textSmClass}>95 models</p>
      </div>
      <div className={divClass}>
        <img
          // src="../../../../public/img/category-accessories1.png"
          src={`${import.meta.env.BASE_URL}img/category-accessories1.png`}
          className={imgClass}
        />
        <p className={textXlClass}>Accessories</p>
        <p className={textSmClass}>95 models</p>
      </div>
    </div>
  );
};
