type Props = {
  color: string;
};

export const Banner: React.FC<Props> = ({ color }) => {
  return (
    <div className={`w-auto min-h-[inherit] grid grid-cols-2 ${color}`}>
      <div className="flex flex-col justify-center min-h-[inherit] bg-primary border border-primary rounded-xl p-4 m-2">
        <p className="text-4xl font-mont-bold bg-gradient-to-r from-violet-700 via-blue-600 to-fuchsia-700 bg-clip-text text-transparent">
          Now availble in our store!
        </p>
        <p className="text-sm text-secondary">Be the first</p>
        <button
          type="button"
          className="col-span-2 mt-10 rounded-3xl border border-neutral-600 h-[40px] w-auto lg:w-[160px] font-mont text-white text-xs md:text-sm whitespace-nowrap bg-primary hover:bg-white hover:text-primary focus:outline-none focus:ring-4 focus:ring-gray-300 px-5 py-2.5"
        >
          Order now
        </button>
      </div>
      <div className="flex flex-col justify-center min-h-[inherit] p-4">
        <p className="text-white text-center">iPhone 16</p>
        <img src="public/img/iPhone16.png" />
      </div>
    </div>
  );
};
