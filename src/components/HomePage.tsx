import { useState, useEffect } from "react";
import {
  ImageIcon,
  Clock,
  FileText,
  FileEdit,
  QrCode,
  Github,
  Linkedin,
  Instagram,
  ChevronRight,
  Star,
} from "lucide-react";
import Link from "next/link";
import Header from "./Header";

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState<any>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const storedMode = localStorage.getItem("darkMode");
    if (storedMode) {
      setDarkMode(storedMode === "true");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode: boolean) => {
      localStorage.setItem("darkMode", String(!prevMode));
      return !prevMode;
    });
  };

  const tools = [
    {
      id: 1,
      name: "Image Converter",
      description: "Convert and optimize images.",
      icon: <ImageIcon className="w-6 h-6" />,
      color: "from-pink-500 to-purple-600",
      href: "/image-converter",
    },
    {
      id: 2,
      name: "Time Converter",
      description: "Easily convert time zones.",
      icon: <Clock className="w-6 h-6" />,
      color: "from-amber-500 to-orange-600",
      href: "/time-converter",
    },
    {
      id: 3,
      name: "Notes",
      description: "Set and manage your notes easily.",
      icon: <FileText className="w-6 h-6" />,
      color: "from-blue-500 to-indigo-600",
      href: "/notes",
    },
    {
      id: 4,
      name: "Resume Builder",
      description: "Create resumes effortlessly.",
      icon: <FileEdit className="w-6 h-6" />,
      color: "from-teal-500 to-cyan-600",
      href: "/resume-builder",
    },
    {
      id: 5,
      name: "QR Generator",
      description: "Generate custom QR codes easily.",
      icon: <QrCode className="w-6 h-6" />,
      color: "from-green-500 to-emerald-600",
      href: "/qr-generator",
    },
  ];

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(formattedTime);
    };

    updateCurrentTime(); // set once on mount
    const interval = setInterval(updateCurrentTime, 1000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-[#0a0b1a] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        toggleDarkMode={toggleDarkMode}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div
          className={`mb-8 p-6 rounded-2xl ${
            darkMode
              ? "bg-gradient-to-r from-[#1a1b3a]/50 to-[#2a2b5a]/50 backdrop-blur-sm border border-gray-700/30"
              : "bg-white shadow-lg"
          }`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Star className="w-6 h-6 text-yellow-400" />
                <h1 className="text-2xl md:text-3xl font-bold">
                  Hello! Welcome to Your Dashboard
                </h1>
              </div>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Here&apos;s what you can do today. Current time:{" "}
                <span className="font-mono">{currentTime}</span>
              </p>
            </div>

            <div
              className={`mt-4 md:mt-0 p-1 rounded-xl ${
                darkMode
                  ? "bg-gradient-to-r from-purple-500 to-blue-600"
                  : "bg-gradient-to-r from-purple-400 to-blue-500"
              }`}
            >
              <div
                className={`p-4 rounded-[10px] ${
                  darkMode ? "bg-[#0f1029]" : "bg-white"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500">
                    <img
                      src="/assets/images/ajay2.JPG"
                      alt="Profile"
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Ajay Goswami</h2>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Frontend Developer | Next.js Enthusiast
                    </p>
                    <div className="flex space-x-2 mt-2">
                      <Link
                        href="#"
                        className={`${
                          darkMode
                            ? "text-gray-300 hover:text-white"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <Github className="w-5 h-5" />
                      </Link>
                      <Link
                        href="#"
                        className={`${
                          darkMode
                            ? "text-gray-300 hover:text-white"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <Linkedin className="w-5 h-5" />
                      </Link>
                      <Link
                        href="#"
                        className={`${
                          darkMode
                            ? "text-gray-300 hover:text-white"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <Instagram className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              href={tool.href}
              key={tool.id}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                darkMode
                  ? "bg-[#1a1b3a]/50 hover:bg-[#1a1b3a] border border-gray-700/30"
                  : "bg-white hover:shadow-xl border border-gray-100"
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${tool.color}`}
              ></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tool.color} flex items-center justify-center`}
                  >
                    {tool.icon}
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 ${
                      darkMode ? "text-gray-500" : "text-gray-400"
                    } group-hover:translate-x-1 transition-transform duration-300`}
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                <p
                  className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  {tool.description}
                </p>
                <div
                  className={`mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r transition-all duration-500 ${tool.color}`}
                ></div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
