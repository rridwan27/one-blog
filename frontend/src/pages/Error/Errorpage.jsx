import React from "react";
import Lottie from "lottie-react";
import errorAnimation from "./error.json";
import { useNavigate } from "react-router";

const ErrorPage = ({
  errorCode = 404,
  errorMessage = "Page Not Found",
  showHomeButton = true,
  additionalMessage = "The page you're looking for doesn't exist.",
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white to-gray-200 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-2xl">
        <div className="flex flex-col justify-center items-center text-center w-full h-full p-6 md:p-10">
          <div className="mb-6 w-full max-w-xs md:max-w-sm">
            <Lottie
              animationData={errorAnimation}
              loop={true}
              autoplay={true}
              className="w-full h-auto"
            />
          </div>

          <div className="space-y-4 w-full">
            <h1 className="text-6xl md:text-7xl font-bold text-red-500">
              {errorCode}
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
              {errorMessage}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {additionalMessage}
            </p>

            {showHomeButton && (
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                <button
                  className="px-6 py-3 bg-violet-700 cursor-pointer text-white font-medium rounded-lg hover:bg-violet-800 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={() => navigate("/")}
                >
                  Go to Homepage
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
