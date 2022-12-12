const Error = () => {
  return (
    <div className="min-h-[80vh] grid place-items-center">
      <div className="space-y-4">
        <h1 className="text-4xl">Oops.. Something Went wrong..</h1>
        <p>
          If error persists: Please contact support at{" "}
          <a href="mailto:whatsnext">support@whatsnext.help</a>
        </p>
      </div>
    </div>
  );
};

export default Error;
