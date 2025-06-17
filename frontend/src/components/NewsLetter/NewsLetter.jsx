import { useState } from "react";
import { toast } from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setEmail("");
      toast.success("Thank you for subscribing!");
    } else {
      toast.error("Please enter your email");
    }
  };

  return (
    <div className="">
      <section className="py-20 newsletter bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto flex flex-col justify-center p-4 space-y-8 md:p-10 lg:space-y-0 lg:space-x-12 lg:justify-between lg:flex-row">
          <div className="flex flex-col space-y-4 text-center lg:text-left">
            <h1 className="text-4xl font-bold leading-none ">
              Get Update about our latest blogs.
            </h1>
            <p className="text-lg">
              Subscribe to our newsletter to get the latest news and updates
              from our blog.
            </p>
          </div>
          <div className="flex flex-row items-center self-center justify-center flex-shrink-0 shadow-md lg:justify-end">
            <div className="flex flex-row">
              <input
                type="email"
                name="email"
                placeholder="Enter Your Eamail"
                className="w-4/5 p-3 rounded-l-lg sm:w-2/3 border border-violet-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-2/5 p-3 font-semibold cursor-pointer rounded-r-lg sm:w-1/3 hover:bg-violet-800 bg-violet-600"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Newsletter;
