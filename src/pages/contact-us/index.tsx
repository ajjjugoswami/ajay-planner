"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ModernContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    // For this example, we'll just set the submitted state to true
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 bg-opacity-50 backdrop-blur-lg shadow-2xl rounded-2xl px-8 pt-6 pb-8 mb-4 border border-gray-700"
        >
          <h2 className="text-3xl font-bold text-center text-gray-100 mb-6">
            Get in Touch
          </h2>
          {!isSubmitted ? (
            <>
              <div className="mb-6">
                <input
                  className="w-full bg-gray-700 bg-opacity-50 text-gray-100 border border-gray-600 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-gray-700 focus:border-indigo-500 transition duration-300"
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  className="w-full bg-gray-700 bg-opacity-50 text-gray-100 border border-gray-600 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-gray-700 focus:border-indigo-500 transition duration-300"
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  className="w-full bg-gray-700 bg-opacity-50 text-gray-100 border border-gray-600 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-gray-700 focus:border-indigo-500 transition duration-300"
                  id="phone"
                  type="tel"
                  placeholder="Your Phone Number"
                  required
                />
              </div>
              <div className="mb-6">
                <textarea
                  className="w-full bg-gray-700 bg-opacity-50 text-gray-100 border border-gray-600 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-gray-700 focus:border-indigo-500 transition duration-300 h-32 resize-none"
                  id="message"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <div className="flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                  type="submit"
                >
                  Send Message
                </motion.button>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-8"
            >
              <svg
                className="mx-auto h-16 w-16 text-indigo-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h3 className="text-2xl font-bold text-gray-100 mb-2">
                Thank You!
              </h3>
              <p className="text-gray-300">
                Your message has been sent successfully.
              </p>
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
}
