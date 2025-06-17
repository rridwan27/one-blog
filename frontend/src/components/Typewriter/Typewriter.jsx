import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const Typewriter = () => {
  const [text] = useTypewriter({
    words: [
      "Tech Insights",
      "Life Lessons",
      "Creative Writing",
      "Stories That Inspire",
      "Latest Trends & Tutorials",
    ],
    loop: Infinity,
    onLoopDone: () => console.log("Typewriter loop completed."),
  });

  return (
    <div className="text-start mt-10">
      <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
        <span className="block mt-4 text-violet-600">
          {text}
          <Cursor cursorColor="violet" />
        </span>
      </h1>
    </div>
  );
};

export default Typewriter;
