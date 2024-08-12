// app/components/SearchAndFilter.js
export default function SearchAndFilter({
  onSearchChange,
  onCategoryChange,
  onSkillLevelChange,
}) {
  return (
    <div className="mb-4 flex space-x-4">
      <input
        type="text"
        placeholder="Search courses..."
        onChange={(e) =>
          onSearchChange(e.target.value)
        }
        className="border rounded px-2 py-1"
      />
      <select
        onChange={(e) =>
          onCategoryChange(e.target.value)
        }
        className="border rounded px-2 py-1"
      >
        <option value="">All Categories</option>
        <option value="Programming">
          Programming
        </option>
        <option value="Design">Design</option>
        <option value="Business">Business</option>
      </select>
      <select
        onChange={(e) =>
          onSkillLevelChange(e.target.value)
        }
        className="border rounded px-2 py-1"
      >
        <option value="">All Skill Levels</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">
          Intermediate
        </option>
        <option value="Advanced">Advanced</option>
      </select>
    </div>
  );
}
