"use client";

import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";

interface SkillsInputProps {
  skills: string[];
  onChange: (skills: string[]) => void;
  suggestions?: string[];
}

const DEFAULT_SUGGESTIONS = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "JavaScript",
  "Next.js",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Git",
  "Figma",
  "UI/UX",
  "Agile",
  "Scrum",
];

export function SkillsInput({
  skills,
  onChange,
  suggestions = DEFAULT_SUGGESTIONS,
}: SkillsInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = suggestions.filter(
    (s) =>
      s.toLowerCase().includes(inputValue.toLowerCase()) &&
      !skills.includes(s)
  );

  const addSkill = (skill: string) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      onChange([...skills, trimmedSkill]);
      setInputValue("");
      setShowSuggestions(false);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(skills.filter((s) => s !== skillToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(inputValue);
    } else if (e.key === "Backspace" && !inputValue && skills.length > 0) {
      removeSkill(skills[skills.length - 1]);
    }
  };

  return (
    <div className="relative">
      {/* Skills Display */}
      <div className="flex min-h-[120px] w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-sm transition-all focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500/20 focus-within:bg-white flex-wrap gap-2 items-start">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="hover:bg-green-200 rounded-full p-0.5 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={skills.length === 0 ? "Digite uma skill e pressione Enter..." : ""}
          className="flex-1 min-w-[200px] bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400"
        />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && inputValue && filteredSuggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
          {filteredSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => addSkill(suggestion)}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-500 mt-2">
        Pressione Enter para adicionar uma skill
      </p>
    </div>
  );
}
