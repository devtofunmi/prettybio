import React from "react";
import { useRouter } from "next/router";

const Custom404: React.FC = () => {
  const router = useRouter();

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-center p-5">
        <h1 className="text-4xl font-bold text-gray-700">Oops! Something went wrong</h1>
        <p className="text-xl text-gray-500 mt-4">
          The user page or page you are looking for doesn&apos;t exist or has been removed.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-6 px-6 py-3 bg-blue-500 cursor-pointer text-white rounded-md hover:bg-blue-600"
        >
          Go back to homepage
        </button>
      </div>
    </div>
  );
};

export default Custom404;

