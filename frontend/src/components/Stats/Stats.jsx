import {
  PenLine,
  Eye,
  Users,
  MessageCircle,
  ThumbsUp,
  Share2,
} from "lucide-react";
import CountUp from "react-countup";

const BlogStats = () => {
  const stats = [
    { icon: <PenLine className="w-6 h-6" />, label: "Posts", value: 42 },
    { icon: <Eye className="w-6 h-6" />, label: "Views", value: 8700 },
    { icon: <Users className="w-6 h-6" />, label: "Authors", value: 5 },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      label: "Comments",
      value: 310,
    },
    { icon: <ThumbsUp className="w-6 h-6" />, label: "Likes", value: 1200 },
    { icon: <Share2 className="w-6 h-6" />, label: "Shares", value: 94 },
  ];

  return (
    <section className="p-4 py-6 md:p-8 dark:bg-gray-800 dark:text-gray-100">
      <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex overflow-hidden rounded-lg shadow-md dark:bg-gray-700 dark:text-gray-100"
          >
            <div className="flex items-center justify-center px-4 bg-violet-600 text-white dark:text-gray-100">
              {stat.icon}
            </div>
            <div className="flex items-center justify-between flex-1 p-4">
              <p className="text-2xl font-semibold">
                <CountUp end={stat.value} duration={2} separator="," />
              </p>
              <p className="ml-2">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogStats;
