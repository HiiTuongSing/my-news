import Headlines from "../Headlines/Headlines";
import NewsCategory from "../NewsCategory/NewsCategory";

function Home() {
  return (
    <div className="w-[100vw] py-10">
      <div className="w-[90%] min-h-[90vh] m-auto">
        <Headlines />
        <br />
        <NewsCategory category="technology" />
        <br />
        <NewsCategory category="business" />
        <br />
        <NewsCategory category="sports" />
        <br />
        <NewsCategory category="health" />
      </div>
    </div>
  );
}

export default Home;
