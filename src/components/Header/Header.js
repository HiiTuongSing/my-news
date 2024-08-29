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
    <div className="w-[100vw] h-[10vh]">
      <div className="flex w-[98%] lg:w-[90%] m-auto justify-between h-full items-center relative">
        <Link to="/">My News</Link>

        {!isMobile ? (
          <>
            <ul className="flex w-[60%] justify-between">
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
            <form onSubmit={(e) => handleSearch(e)}>
              <input
                name="search"
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Search news..."
                required
              />
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
              <li onClick={() => setCategory("general")}>General</li>
              <li onClick={() => setCategory("health")}>Health</li>
              <li onClick={() => setCategory("sports")}>Sports</li>
              <li onClick={() => setCategory("business")}>Business</li>
              <li onClick={() => setCategory("technology")}>Technology</li>
              <li onClick={() => setCategory("science")}>Science</li>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Header;
