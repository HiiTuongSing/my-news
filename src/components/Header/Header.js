import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [keywords, setKeywords] = useState("");
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const categories = ["Health", "Sports", "Business", "Technology", "Science"];

  const navigate = useNavigate();

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

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(`/search/${keywords}`);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-[100vw] h-[10vh] bg-blue-100">
      <div className="flex w-[98%] lg:w-[90%] m-auto justify-between h-full items-center relative">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-500 hover:text-blue-700"
        >
          My News
        </Link>

        {!isMobile ? (
          <>
            <ul className="flex w-[60%] justify-around text-blue-500">
              {categories.map((category, index) => (
                <li key={index} className="hover:text-blue-700">
                  <Link
                    to={`/category/${category.toLocaleLowerCase()}`}
                    className="transition duration-300 ease-in-out"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
            <form
              onSubmit={(e) => handleSearch(e)}
              className="flex items-center space-x-2"
            >
              <input
                name="search"
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Search news..."
                className="outline-blue-500 hover:outline-blue-700 rounded p-1 text-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-700 rounded transition duration-300 ease-in-out"
              >
                Search
              </button>
            </form>
          </>
        ) : (
          <button
            ref={toggleRef}
            type="button"
            onClick={toggleMenu}
            className="text-blue-500 hover:text-blue-700"
          >
            Menu
          </button>
        )}
        {isMenuOpen && (
          <div
            ref={menuRef}
            role="menu"
            className="absolute left-0 top-[100%] w-full p-4 bg-blue-100 border-t-2 border-blue-500 z-20"
          >
            <form onSubmit={(e) => handleSearch(e)} className="mb-4">
              <input
                name="search"
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Search news..."
                className="outline-blue-500 hover:outline-blue-700 rounded p-2 w-full mb-2"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white w-full py-2 hover:bg-blue-700 rounded transition duration-300 ease-in-out"
              >
                Search
              </button>
            </form>
            <ul className="text-blue-500 space-y-2">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link
                    to={`/category/${category.toLocaleLowerCase()}`}
                    className="block hover:text-blue-700 transition duration-300 ease-in-out"
                    onClick={() => toggleMenu()}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
