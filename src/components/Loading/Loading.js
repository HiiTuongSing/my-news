const Loading = () => {
  return (
    <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-white/50 z-10">
      <h1 className="animate-pulse bg-blue-500 text-white px-4 py-2 rounded">
        Loading ...
      </h1>
    </div>
  );
};

export default Loading;
