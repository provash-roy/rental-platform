"use client";

import UserMenu from "./UserMenu";
import Search from "./Search";
import Container from "../Container";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <>
      <nav className="fixed w-full bg-white h-16 shadow-sm z-50">
        <Container>
          <div className="flex justify-between items-center ">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </nav>
    </>
  );
};

export default Navbar;
