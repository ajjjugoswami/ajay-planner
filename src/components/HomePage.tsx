import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  NotebookPen,
  CalendarCheck,
  Sparkles,
  MessageSquare,
  QrCode,
  FileText,
} from "lucide-react";

const HomePage = () => {
  const [helloMessage, setHelloMessage] = useState(
    "Hello! Welcome to Your Dashboard"
  );

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Animated Hello Message */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mb-8 flex items-center gap-3 text-3xl font-bold text-[#FFFFFF]"
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-8 h-8 text-yellow-500 dark:text-yellow-300" />
        </motion.div>
        {helloMessage}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

        <Link href="/ask-ai">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition cursor-pointer text-center w-80 md:w-96">
            <MessageSquare className="w-12 h-12 mx-auto text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mt-3">
              Ask from AI
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-3 text-lg">
              Get instant answers from AI.
            </p>
          </div>
        </Link>

        <Link href="/qr-generator">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition cursor-pointer text-center w-80 md:w-96">
            <QrCode className="w-12 h-12 mx-auto text-green-600 dark:text-green-400" />
            <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400 mt-3">
              QR Generator
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-3 text-lg">
              Generate custom QR codes easily.
            </p>
          </div>
        </Link>

        <Link href="/resume-builder">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition cursor-pointer text-center w-80 md:w-96">
            <FileText className="w-12 h-12 mx-auto text-teal-600 dark:text-teal-400" />
            <h2 className="text-2xl font-semibold text-teal-600 dark:text-teal-400 mt-3">
              Resume Builder
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-3 text-lg">
              Create professional resumes effortlessly.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
