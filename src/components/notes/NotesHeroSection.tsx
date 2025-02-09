import React, { useState, useEffect } from "react";
import { Trash2, Edit3 } from "lucide-react";

const NotesHeroSection = () => {
  const [notes, setNotes] = useState<any>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("aj-notes") || "[]");
    }
    return [];
  });
  const [noteText, setNoteText] = useState("");
  const [importance, setImportance] = useState("Important");
  const [noteColor, setNoteColor] = useState("bg-gray-700");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("aj-notes", JSON.stringify(notes));
    }
  }, [notes]);

  const handleAddNote = () => {
    if (noteText.trim() === "") return;

    if (editIndex !== null) {
      const updatedNotes = notes.map((note: any, index: number) =>
        index === editIndex
          ? { text: noteText, importance, color: noteColor }
          : note
      );
      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      const newNotes = [
        ...notes,
        { text: noteText, importance, color: noteColor },
      ];
      setNotes(newNotes);
    }
    setNoteText("");
  };

  const handleDeleteNote = (index: number) => {
    const newNotes = notes.filter((_: any, i: number) => i !== index);
    setNotes(newNotes);
  };

  const handleEditNote = (index: number) => {
    const noteToEdit = notes[index];
    setNoteText(noteToEdit.text);
    setImportance(noteToEdit.importance);
    setNoteColor(noteToEdit.color);
    setEditIndex(index);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-900 text-white min-h-screen">
      {/* Left Section */}
      <div className="w-full md:w-1/2 p-4 bg-gray-800 rounded-[16px]">
        <textarea
          className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Write your note here..."
          value={noteText}
          rows={8}
          onChange={(e) => setNoteText(e.target.value)}
        ></textarea>

        <div className="mt-4 flex gap-4 flex-wrap">
          {["Important", "Low Importance", "Other"].map((level) => (
            <label
              key={level}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="importance"
                value={level}
                checked={importance === level}
                onChange={(e) => setImportance(e.target.value)}
                className="hidden"
              />
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  importance === level
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-400"
                }`}
              ></span>
              {level}
            </label>
          ))}
        </div>
        <div className="mt-4 flex gap-2 flex-wrap">
          {[
            "bg-gray-700",
            "bg-red-500",
            "bg-yellow-500",
            "bg-green-500",
            "bg-blue-500",
          ].map((color) => (
            <button
              key={color}
              className={`w-6 h-6 mt-2 rounded-full border-2 ${color} ${
                noteColor === color ? "border-white" : "border-transparent"
              }`}
              onClick={() => setNoteColor(color)}
            ></button>
          ))}
        </div>
        <button
          className="mt-6 p-2 bg-blue-500 text-white rounded-lg w-full"
          onClick={handleAddNote}
        >
          {editIndex !== null ? "Update Note" : "Add Note"}
        </button>
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px bg-gray-600"></div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 p-4 bg-gray-800 rounded-[16px]">
        <h2 className="text-lg font-bold mb-4">Saved Notes</h2>
        {notes.length === 0 ? (
          <p className="text-gray-400">No notes added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {notes.map((note: any, index: number) => (
              <div
                key={index}
                className={`p-4 rounded-lg relative ${note.color}`}
              >
                <span
                  className={`text-xs px-2 py-1 rounded-lg font-bold inline-block ${
                    note.importance === "Important"
                      ? "bg-red-500 text-white"
                      : note.importance === "Low Importance"
                      ? "bg-yellow-500 text-black"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {note.importance}
                </span>
                <p className="mt-2 text-white">{note.text}</p>
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    className="text-green-500 hover:text-green-400"
                    onClick={() => handleEditNote(index)}
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-400"
                    onClick={() => handleDeleteNote(index)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesHeroSection;
