import { useMemo } from "react";
import { useLoaderData } from "react-router";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { motion } from "framer-motion";

const columnHelper = createColumnHelper();

const FeaturedBlogs = () => {
  const { posts } = useLoaderData();

  const topPosts = useMemo(() => {
    return posts
      .map((post) => ({
        ...post,
        wordCount: post.longDescription?.split(/\s+/).length || 0,
      }))
      .sort((a, b) => b.wordCount - a.wordCount)
      .slice(0, 10);
  }, [posts]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("title", {
        header: "Title",
        cell: (info) => <span className="font-medium">{info.getValue()}</span>,
      }),
      columnHelper.accessor("category", {
        header: "Category",
        cell: (info) => (
          <span className="text-gray-600 dark:text-white">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("wordCount", {
        header: "Word Count",
        cell: (info) => (
          <span className="text-purple-700">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("createdAt", {
        header: "Created At",
        cell: (info) =>
          new Date(info.getValue()).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: topPosts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-6 text-center">
        Top 10 Featured Blogs by Word Count
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 dark:border-gray-600">
        <table className="min-w-full bg-white dark:bg-gray-900 text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-800 text-xs uppercase text-gray-700 dark:text-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 font-semibold tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-150"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default FeaturedBlogs;
