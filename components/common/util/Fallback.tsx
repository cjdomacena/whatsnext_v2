type FallbackProps = {
  error: Error;
  componentStack: string | null;
  eventId: string | null;
  resetError: () => void;
};

const Fallback: React.FC<FallbackProps> = ({
  error,
  componentStack,
  eventId,
  resetError,
}) => {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="container mx-auto h-auto w-fit text-center space-y-4">
        <h1 className="text-4xl font-bold">Oops.. Something went wrong...</h1>
        <p>Error: {error.message}</p>
        <p>Event Id: {eventId}</p>
        <button
          className="px-6 py-3 bg-neutral-600 rounded"
          onClick={() => resetError()}
        >
          Click to Reset Page
        </button>
      </div>
    </div>
  );
};

export default Fallback;
