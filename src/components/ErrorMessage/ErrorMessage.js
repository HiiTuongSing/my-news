const ErrorMessage = (error) => {
  <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-white/50 z-10">
    <h1 className="bg-red-500 text-white px-4 py-2 rounded">Error: {error}</h1>
  </div>;
};

export default ErrorMessage;
