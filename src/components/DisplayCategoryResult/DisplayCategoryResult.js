import Headlines from "../Headlines/Headlines";
import MoreNews from "../MoreNews/MoreNews";

export default function DisplayCategoryResult() {
  return (
    <div className="w-[90%] min-h-[90vh] m-auto py-10">
      <Headlines />
      <br />
      <MoreNews />
    </div>
  );
}
