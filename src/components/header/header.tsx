

const Header = () => {

  return (
    <div className="z-50 flex justify-between items-center bg-white px-5 py-2.5 w-full">
      <div className="flex justify-between items-center bg-[#C8E0FF4D] p-2.5 max-w-59.5">
        {/* <img
          className="h-10 size-full object-contain aspect-square"
          src={imageUrl(logoUrl) || Logo}
        /> */}
      </div>

      <div className="flex items-center gap-x-1">
        {/* <Notification /> */}
        {/* <Hamburger /> */}
      </div>
    </div>
  );
};

export default Header;
