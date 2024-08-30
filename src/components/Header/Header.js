import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [keywords, setKeywords] = useState("");
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const categories = [
    "General",
    "Health",
    "Sports",
    "Business",
    "Technology",
    "Science",
  ];

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
            <ul className="flex w-[60%] justify-between text-blue-500">
              {categories.map((category, index) => {
                return (
                  <li key={index} className="hover:text-blue-700">
                    <Link to={`/category/${category.toLocaleLowerCase()}`}>
                      {category}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <form
              onSubmit={(e) => handleSearch(e)}
              className="text-blue-500 hover:text-blue-700"
            >
              <input
                name="search"
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Search news..."
                className="outline-blue-500 hover:outline-blue-700 rounded me-2 p-1"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-2 py-1 hover:bg-blue-700 rounded"
              >
                Search
              </button>
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
            <form onSubmit={(e) => handleSearch(e)}>
              <input
                name="search"
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Search news..."
              />
              <button type="submit">Search</button>
            </form>
            <ul className=" w-[60%] ">
              {categories.map((category, index) => {
                return (
                  <li key={index}>
                    <Link to={`/category/${category.toLocaleLowerCase()}`}>
                      {category}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Header;
