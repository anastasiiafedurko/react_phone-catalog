export const Wrapper = ({ children }) => {
  return (
    // <div className="md:w-full md:container md:mx-auto md:px-4">{children}</div>
    <div className="flex flex-col min-h-screen px-4 md:px-6 lg:px-8 xl:px-36">
      {children}
    </div>
  );
};
