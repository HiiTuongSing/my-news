import Headlines from "../Headlines/Headlines";
import NewsCategory from "../NewsCategory/NewsCategory";

function Home() {
  return (
    <div className="w-[100vw]">
      <div className="w-[90%] min-h-[90vh] m-auto">
        <Headlines />
        <br />
        <NewsCategory />
        <br />
        <NewsCategory />
        <br />
        <NewsCategory />
        <br />
        <NewsCategory />
      </div>
    </div>
  );
}

export default Home;
