import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

function Header() {
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      toggleRef.current &&
      !toggleRef.current.contains(e.target)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-[100vw] h-[10vh]">
      <div className="flex w-[98%] lg:w-[80%] m-auto justify-between h-full items-center relative">
        <h1>My News</h1>
        {!isMobile ? (
          <>
            <ul className="flex w-[60%] justify-between">
              <li>Malaysia</li>
              <li>General</li>
              <li>Health</li>
              <li>Sports</li>
              <li>Business</li>
              <li>Technology</li>
              <li>Science</li>
            </ul>
            <form>
              <input type="text" placeholder="Search news..." />
              <button type="submit">Search</button>
            </form>
          </>
        ) : (
          <button ref={toggleRef} type="button" onClick={toggleMenu}>
            Menu
          </button>
        )}
        {isMenuOpen ? (
          <div
            ref={menuRef}
            role="menu"
            className="absolute left-[0px] top-[100%] w-full p-2 bg-red-200"
          >
            <form className="w-full">
              <input type="text" placeholder="Search news..." />
              <button type="submit">Search</button>
            </form>
            <ul className=" w-[60%] ">
              <li>Malaysia</li>
              <li>General</li>
              <li>Health</li>
              <li>Sports</li>
              <li>Business</li>
              <li>Technology</li>
              <li>Science</li>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Header;
