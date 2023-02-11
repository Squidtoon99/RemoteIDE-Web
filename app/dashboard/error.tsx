"use client";

const Error = ({ error, reset }: {error: Error; reset: () => void}) => {
  // useEffect(() => {
  //   // Log the error to an error reporting service
  //   window.location.href = '/login/google';
  // });
    console.log('OH NOES!', error);
  return (
    <div className={"flex flex-col text-center justify-center"}>
      <h2 className="text-3xl text-center font-extrabold">Something went wrong!</h2>
        <div>
            {/* @ts-expect-error digest is a client attr */}
            Digest: <strong>{error?.digest}</strong>
        </div>
      <button
          className={"rounded-3xl px-4 py-2 m-2 bg-primary text-white max-w-xl block mx-auto"}
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Reload Dashboard
      </button>
    </div>
  );
}

export default Error;