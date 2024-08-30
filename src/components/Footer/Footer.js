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
    <div className="w-[100vw] min-h-[30vh] bg-blue-100 text-blue-500 pt-5">
      <div className="w-[90%] m-auto grid grid-cols-1 sm:grid-cols-4 gap-5 items-center">
        <div className="h-full flex flex-col justify-center sm:border-e-2 border-blue-700/25">
          <h1 className="text-2xl font-bold mb-5">My News Sdn Bhd</h1>
          <p>
            Tel: <span className="underline">03-123456789</span>
          </p>
          <p>
            Email: <span className="underline">mynews@xmail.com</span>
          </p>
        </div>
        <div className="sm:col-span-2">
          <p className="text-sm leading-relaxed">
            At My News, we believe that staying informed should be easy and
            tailored to your interests. We bring you the latest headlines,
            in-depth articles, and breaking news from around the world, all
            curated to match what matters most to you. Whether you're into tech,
            sports, global events, or entertainment, My News delivers the
            stories that keep you connected and informed.
          </p>
        </div>
        <div className="sm:border-s-2 border-blue-700/25">
          <ul className="sm:ms-10">
            {categories.map((category, index) => {
              return (
                <li key={index} className="underline hover:text-blue-700">
                  <Link to={`/category/${category}`}>{category}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="text-center w-[80%] m-auto mt-10 pb-5 text-sm">
        <p className="mt-5">Copyright © 2024 My News Sdn Bhd</p>
        <p>Created by Hii Tuong Sing </p>
      </div>
    </div>
  );
}

export default Footer;
