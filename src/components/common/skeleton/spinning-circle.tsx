export default function SpinningCircle({ message }: { message: string }) {
  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full h-full">
      <svg
        className="animate-spin h-10 w-10 mr-3 text-black"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
      </svg>
      <h1 className="text-xl font-bold">{message}</h1>
    </div>
  );
}
