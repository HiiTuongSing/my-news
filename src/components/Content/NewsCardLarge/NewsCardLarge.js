function NewsCardLarge() {
  return (
    <div className="w-full relative">
      <img
        src="https://placehold.co/600x400"
        alt="headline news"
        className="w-full"
      />
      <div className="absolute bottom-0">
        <h1>
          Source <span>Time</span>
        </h1>
        <p>The title/description of the news.</p>
      </div>
    </div>
  );
}

export default NewsCardLarge;
