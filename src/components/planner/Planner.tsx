"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash, ArrowLeft, ArrowRight } from "lucide-react";
import { DatePicker, TimePicker, Button, notification } from "antd";
import moment from "moment";

const PlannerPage = () => {
  const [tasks, setTasks] = useState<any>({
    todo: [],
    ongoing: [],
    completed: [],
  });
  const [newTask, setNewTask] = useState<any>({
    title: "",
    description: "",
    priority: "low",
    dueDate: null,  
    dueTime: null, 
  });

   useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const savedTasks = localStorage.getItem("planer");

    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        if (
          parsedTasks &&
          typeof parsedTasks === "object" &&
          parsedTasks.todo &&
          parsedTasks.ongoing &&
          parsedTasks.completed
        ) {
          setTasks(parsedTasks);
        }
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (
      tasks?.todo?.length ||
      tasks?.ongoing?.length ||
      tasks?.completed?.length
    ) {
      localStorage.setItem("planer", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (newTask.title.trim() === "") return;

    // Schedule notification if due date and time are set
    if (newTask.dueDate && newTask.dueTime) {
      const dueDateTime = moment(newTask.dueDate)
        .set("hour", newTask.dueTime.hour())
        .set("minute", newTask.dueTime.minute())
        .toDate();

      const currentTime = new Date().getTime();
      const timeUntilDue = dueDateTime.getTime() - currentTime;

      // Set up notification if time until due is positive
      if (timeUntilDue > 0) {
        setTimeout(() => {
          if (Notification.permission === "granted") {
            new Notification("Task Reminder", {
              body: `Your task "${newTask.title}" is due!`,
            });
          }
        }, timeUntilDue);
      }
    }

    setTasks((prev: any) => {
      const updatedTasks = { ...prev, todo: [...prev.todo, newTask] };
      localStorage.setItem("planer", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
    setNewTask({ title: "", description: "", priority: "low", dueDate: null, dueTime: null });
  };

  const moveTask = (task: any, from: any, to: any) => {
    setTasks((prev: any) => {
      const updatedTasks = {
        ...prev,
        [from]: prev[from].filter((t: any) => t !== task),
        [to]: [...prev[to], task],
      };
      localStorage.setItem("planer", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const deleteTask = (task: any, from: any) => {
    setTasks((prev: any) => {
      const updatedTasks = {
        ...prev,
        [from]: prev[from].filter((t: any) => t !== task),
      };
      localStorage.setItem("planer", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 flex flex-col items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-5xl">
        <h2 className="text-2xl font-semibold   text-white text-center mb-4">
          ✏️ Add a New Task
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              className="p-3 pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              📌
            </span>
          </div>

          <div className="relative">
            <input
              type="text"
              className="p-3 pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              📝
            </span>
          </div>

          <select
            className="p-3 w-full rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({ ...newTask, priority: e.target.value })
            }
          >
            <option value="low">⭐ Low Priority</option>
            <option value="important">🚀 High Priority</option>
          </select>

          {/* Add Date and Time Picker */}
          <DatePicker
            className="p-3 w-full rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            value={newTask.dueDate}
            onChange={(date) => setNewTask({ ...newTask, dueDate: date })}
            format="YYYY-MM-DD"
            placeholder="Select Due Date"
          />

          <TimePicker
            className="p-3 w-full rounded-lg border  border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            value={newTask.dueTime}
            onChange={(time) => setNewTask({ ...newTask, dueTime: time })}
            format="HH:mm"
            placeholder="Select Due Time"
          />

          <Button
            type="primary"
            className="w-full mt-4 "
            onClick={addTask}
          >
            ➕ Add Task
          </Button>
        </div>
      </div>

      {/* Render Tasks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full">
        {Object.entries(tasks).map(([status, taskList]: any) => (
          <div
            key={status}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-full"
          >
            <h2
              className={`text-xl font-semibold text-center ${
                status === "todo"
                  ? "text-red-500"
                  : status === "ongoing"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              {status === "todo"
                ? "📝 To Do"
                : status === "ongoing"
                ? "🚀 Ongoing"
                : "✅ Completed"}
            </h2>
            <div className="mt-4 space-y-3">
              <AnimatePresence>
                {taskList.map((task: any, index: any) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="bg-gray-200 relative dark:bg-gray-700 p-3 rounded-md flex flex-col sm:flex-row justify-between items-center"
                  >
                    <div className="flex-1 text-center sm:text-left">
                      <span
                        className={`text-xs px-2 py-1 rounded-[5px] absolute top-[-10px] left-0 ${
                          task.priority === "important"
                            ? "bg-red-500 text-white"
                            : "bg-yellow-400 text-black"
                        }`}
                      >
                        {task.priority}
                      </span>
                      <span className="text-[#000000] text-[20px]   mt-2 font-bold block">
                        {task.title}
                      </span>
                      <p className="text-[16px] text-gray-600 dark:text-gray-400">
                        {task.description}
                      </p>
                      {task.dueDate && task.dueTime && (
                        <p className="text-sm text-gray-500">
                          Due: {moment(task.dueDate).format("YYYY-MM-DD")}{" "}
                          {moment(task.dueTime).format("HH:mm")}
                        </p>
                      )}
                    </div>
                    <div className="mt-2 sm:mt-0 flex space-x-2">
                      {status !== "todo" && (
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => moveTask(task, status, "todo")}
                        >
                          <ArrowLeft size={18} />
                        </button>
                      )}
                      {status !== "completed" && (
                        <button
                          className="text-green-500 hover:text-green-700"
                          onClick={() =>
                            moveTask(
                              task,
                              status,
                              status === "todo" ? "ongoing" : "completed"
                            )
                          }
                        >
                          <ArrowRight size={18} />
                        </button>
                      )}
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => deleteTask(task, status)}
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlannerPage;
