import Headlines from "../Headlines/Headlines";
import NewsCategory from "../NewsCategory/NewsCategory";

function Home() {
  const categories = ["technology", "business", "sports", "health"];

  return (
    <div className="w-[90%] min-h-[90vh] py-10 m-auto">
      <Headlines />
      {categories.map((category) => {
        return (
          <>
            <br />
            <NewsCategory category={category} />
          </>
        );
      })}
    </div>
  );
}

export default Home;
