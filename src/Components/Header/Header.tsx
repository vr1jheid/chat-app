import UserMenu from "./UserMenu";

const Header = () => {
  return (
    <header className="p-4 px-10 h-22 w-full fixed z-50 [&_svg]:text-white bg-black text-white flex justify-between">
      {
        <h1 className="text-5xl h-[50px] font-medium inline-flex items-center">
          React Chat
        </h1>
      }
      <UserMenu />
    </header>
  );
};

export default Header;
