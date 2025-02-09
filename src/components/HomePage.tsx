import React from "react";
import Link from "next/link";
import { NotebookPen, CalendarCheck } from "lucide-react";

const HomePage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link href="/planner">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition cursor-pointer text-center w-80 md:w-96">
            <NotebookPen className="w-12 h-12 mx-auto text-purple-600 dark:text-purple-400" />
            <h2 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mt-3">
              Planner
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-3 text-lg">
              Plan your tasks and stay organized.
            </p>
          </div>
        </Link>
        <Link href="/notes">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition cursor-pointer text-center w-80 md:w-96">
            <CalendarCheck className="w-12 h-12 mx-auto text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mt-3">
              Notes
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-3 text-lg">
              Set and manage your notes easily.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
