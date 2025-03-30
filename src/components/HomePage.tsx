/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  NotebookPen,
  CalendarCheck,
  Sparkles,
  MessageSquare,
  QrCode,
  FileText,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Image
} from "lucide-react";

const sections = [
  {
    href: "/image-converter",
    icon: Image,
    title: "Image Converter",
    description: "Convert and optimize images.",
    color: "text-pink-600 dark:text-pink-400",
  },
  {
    href: "/planner",
    icon: NotebookPen,
    title: "Planner",
    description: "Plan your tasks and stay organized.",
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    href: "/notes",
    icon: CalendarCheck,
    title: "Notes",
    description: "Set and manage your notes easily.",
    color: "text-indigo-600 dark:text-indigo-400",
  },
  {
    href: "/ask-ai",
    icon: MessageSquare,
    title: "Ask from AI",
    description: "Get instant answers from AI.",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    href: "/resume-builder",
    icon: FileText,
    title: "Resume Builder",
    description: "Create resumes effortlessly.",
    color: "text-teal-600 dark:text-teal-400",
  },
  {
    href: "/qr-generator",
    icon: QrCode,
    title: "QR Generator",
    description: "Generate custom QR codes easily.",
    color: "text-green-600 dark:text-green-400",
  },
 
];

const HomePage = () => {
  return (
    <div className=" container p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex  justify-between items-start gap-7 xl:flex-row lg:flex-row md:flex-row sm:flex-col  xs:flex-col">
        <div className=" ">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8 flex items-center gap-3 xl:text-3xl  font-bold  text-[#FFFFFF]"
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-yellow-500 dark:text-yellow-300" />
            </motion.div>
            Hello! Welcome to Your Dashboard
          </motion.div>
          <div className="grid xl:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-8">
            {sections.map(({ href, icon: Icon, title, description, color }) => (
              <Link key={href} href={href}>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition cursor-pointer text-center xl:min-w-[380px]  lg:min-w-[250px]">
                  <Icon className={`w-12 h-12 mx-auto ${color}`} />
                  <h2 className={`text-2xl font-semibold ${color} mt-3`}>
                    {title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mt-3 text-[18px]">
                    {description}
                  </p>
                </div>
              </Link>
            ))}
          </div>{" "}
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-16 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center xl:w-[450px]  lg:w-[300px] md:w-[300px] sm:w-[100%] h-[100%]"
          >
            <img
              src="/assets/images/ajay2.JPG"
              alt="Developer"
              className="w-[150px] h-[150px] rounded-[22px] border-2 border-blue-500 object-cover"
            />

            <h3 className="text-2xl font-semibold mt-4 text-[#FFFFFF] dark:text-white">
              Ajay Goswami
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg mt-2">
              Frontend Developer | Next.js Enthusiast
            </p>
            <div className="flex gap-4 mt-4">
              <Link href="https://github.com/goswamiajay526" target="_blank">
                <Github className="w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/ajay-goswami-7200bb242/"
                target="_blank"
              >
                <Linkedin className="w-6 h-6 text-blue-600 hover:text-blue-800 transition" />
              </Link>
              <Link href="https://www.instagram.com/" target="_blank">
                <Instagram className="w-6 h-6 text-blue-400 hover:text-blue-600 transition" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;