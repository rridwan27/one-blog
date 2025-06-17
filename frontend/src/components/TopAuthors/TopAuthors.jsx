import { motion } from "framer-motion";

const TopAuthors = () => {
  return (
    <div className="container mx-auto my-20">
      <div className="flex justify-center items-center">
        <h2 className="text-3xl font-bold text-violet-600">Top Authors</h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
        {/* Bruce Wayne */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="block rounded-md border border-gray-300 dark:border-gray-700 p-4 shadow-sm sm:p-6 bg-white dark:bg-gray-800"
        >
          <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6 ">
            <div className="sm:order-last sm:shrink-0">
              <img
                alt="Bruce Wayne"
                src="https://townsquare.media/site/442/files/2023/04/attachment-keaton-batman-flash-1.jpg?w=780&q=75"
                className="size-16 rounded-full object-cover sm:size-[72px]"
              />
            </div>

            <div className="mt-4 sm:mt-0">
              <h3 className="text-lg font-medium text-pretty text-gray-900 dark:text-white">
                Your Body Is the First and Strongest Line of Defense
              </h3>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                By Bruce Wayne
              </p>
              <p className="mt-4 line-clamp-2 text-sm text-pretty text-gray-700 dark:text-gray-300">
                Strength isn't about perfection — it's about preparation. Health
                is not luxury, it's survival.
              </p>
            </div>
          </div>

          <dl className="mt-6 flex gap-4 lg:gap-6">
            <div>
              <dt className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Published on
              </dt>
              <dd className="text-xs text-gray-700 dark:text-gray-300">
                10/06/2025
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Reading time
              </dt>
              <dd className="text-xs text-gray-700 dark:text-gray-300">
                6 minutes
              </dd>
            </div>
          </dl>
        </motion.div>

        {/* Mark Zuckerberg */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="block rounded-md border border-gray-300 dark:border-gray-700 p-4 shadow-sm sm:p-6 bg-white dark:bg-gray-800"
        >
          <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
            <div className="sm:order-last sm:shrink-0">
              <img
                alt="Mark Zuckerberg"
                src="https://image.cnbcfm.com/api/v1/image/108043097-1727989387071-gettyimages-2173579179-META_CONNECT.jpeg?v=1744292077&w=800&h=600&ffmt=webp"
                className="size-16 rounded-full object-cover sm:size-[72px]"
              />
            </div>

            <div className="mt-4 sm:mt-0">
              <h3 className="text-lg font-medium text-pretty text-gray-900 dark:text-white">
                Moving Fast and Building Carefully
              </h3>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                By Mark Zuckerberg
              </p>
              <p className="mt-4 line-clamp-2 text-sm text-pretty text-gray-700 dark:text-gray-300">
                Speed matters in tech — but stability, trust, and responsibility
                matter more in business.
              </p>
            </div>
          </div>

          <dl className="mt-6 flex gap-4 lg:gap-6">
            <div>
              <dt className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Published on
              </dt>
              <dd className="text-xs text-gray-700 dark:text-gray-300">
                05/06/2025
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Reading time
              </dt>
              <dd className="text-xs text-gray-700 dark:text-gray-300">
                7 minutes
              </dd>
            </div>
          </dl>
        </motion.div>

        {/* Clark Kent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="block rounded-md border border-gray-300 dark:border-gray-700 p-4 shadow-sm sm:p-6 bg-white dark:bg-gray-800"
        >
          <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
            <div className="sm:order-last sm:shrink-0">
              <img
                alt="Clark Kent"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwuybZXFPlNVa9MHksUtiSyK2YV34DWHv0fQ&s"
                className="size-16 rounded-full object-cover sm:size-[72px]"
              />
            </div>

            <div className="mt-4 sm:mt-0">
              <h3 className="text-lg font-medium text-pretty text-gray-900 dark:text-white">
                Why Sports Still Matter in a Divided World
              </h3>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                By Clark Kent
              </p>
              <p className="mt-4 line-clamp-2 text-sm text-pretty text-gray-700 dark:text-gray-300">
                Sports remind us who we are — resilient, united, and human. Even
                in chaos, the game speaks truth.
              </p>
            </div>
          </div>

          <dl className="mt-6 flex gap-4 lg:gap-6">
            <div>
              <dt className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Published on
              </dt>
              <dd className="text-xs text-gray-700 dark:text-gray-300">
                01/06/2025
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Reading time
              </dt>
              <dd className="text-xs text-gray-700 dark:text-gray-300">
                5 minutes
              </dd>
            </div>
          </dl>
        </motion.div>
      </div>
    </div>
  );
};
export default TopAuthors;
