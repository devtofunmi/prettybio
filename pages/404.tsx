import React from "react";
import { useRouter } from "next/router";
import { AlertTriangle } from "lucide-react";

const Custom404: React.FC = () => {
  const router = useRouter();

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="w-16 h-16 text-red-500 animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h1>
        <p className="text-gray-600 text-lg mt-5 mb-6">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-full shadow-md hover:opacity-90 transition duration-200"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Custom404;


