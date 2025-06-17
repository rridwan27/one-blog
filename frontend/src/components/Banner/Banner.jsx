import { Link } from "react-router";
import Typewriter from "../Typewriter/Typewriter";

const Banner = () => {
  return (
    <section className="">
      <div className="w-full max-w-screen-xl px-6 py-12 sm:px-10 sm:py-16 lg:py-20 mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
            Explore thoughtful blogs and{" "}
            <span className="text-indigo-600 dark:text-indigo-400 bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
              elevate your perspective
            </span>{" "}
            with every post
          </h1>

          <p className="mt-6 text-lg  text-gray-600 dark:text-gray-300 sm:leading-relaxed max-w-2xl">
            Dive into a collection of articles covering ideas, insights, and
            experiences that inform and inspire. Whether you're here to learn,
            reflect, or stay updated — we've got something for you.
          </p>

          <p>
            <Typewriter />
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              to="/auth/sign-up"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-indigo-700 transition duration-200 hover:shadow-indigo-500/30"
            >
              Join Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 px-8 py-4 text-base font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="order-1 lg:order-2 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Blog illustration"
            className="rounded-xl shadow-xl w-full max-w-lg object-cover aspect-video"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
