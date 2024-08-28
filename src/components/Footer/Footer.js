import { Link } from "react-router-dom";

function Footer() {
  const categories = [
    "General",
    "Health",
    "Sports",
    "Business",
    "Technology",
    "Science",
  ];

  return (
    <div className="w-[100vw] min-h-[30vh]">
      <div className="w-[90%] m-auto grid grid-cols-1 sm:grid-cols-4 gap-5">
        <div>
          <h1>My News Sdn Bhd</h1>
          <br />
          <p>Tel: 03-123456789</p>
          <p>Email: mynews@xmail.com</p>
        </div>
        <div className="sm:col-span-2">
          <p>
            At My News, we believe that staying informed should be easy and
            tailored to your interests. We bring you the latest headlines,
            in-depth articles, and breaking news from around the world, all
            curated to match what matters most to you. Whether you're into tech,
            sports, global events, or entertainment, My News delivers the
            stories that keep you connected and informed.
          </p>
        </div>
        <div>
          <ul>
            {categories.map((category, index) => {
              return (
                <li key={index}>
                  <Link to={`/category/${category}`}>{category}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <br />
      <div className="text-center w-[80%] m-auto">
        <p>Copyright © 2024 My News Sdn Bhd</p>
        <p>Created by Hii Tuong Sing </p>
      </div>
    </div>
  );
}

export default Footer;
