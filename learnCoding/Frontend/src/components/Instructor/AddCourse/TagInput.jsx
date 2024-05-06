// Importing React hook for managing component state
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import Input from "../../common/Input";

export default function TagInput({
  label,
  name,
  placeholder,
  errors,
  setValue,
}) {
  const { editCourse, course } = useSelector((state) => state.course);

  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (editCourse) {
      setTags(course?.tag || []);
    }
  }, [editCourse, course]); 

  useEffect(() => {
    setValue(name, tags);
  }, [setValue, name, tags]); 

  // Function to handle user input when tags are added
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const tagsValue = event.target.value.trim();
      if (tagsValue) { 
        setTags([...tags, tagsValue]); 
        event.target.value = ""; 
      }
    }
  };

  // Function to handle deletion of a tag
  const handleDeleteTag = (tagIndex) => {
    const newTags = tags.filter((_, index) => index !== tagIndex);
    setTags(newTags);
  };

  // Render the component
  return (
    <div className="flex flex-col space-y-2">
      {/* Render the label for the input */}
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      {/* Render the tags and input */}
      <div className="flex w-full flex-wrap gap-y-2">
        {/* Map over the tags array and render each tag */}
        {tags?.map((tag, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
          >
            {/* Render the tag value */}
            {tag}
            {/* Render the button to delete the tag */}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeleteTag(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}

        <Input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          error={errors[name] && `${label} is required`}
        />
      </div>
      
    </div>
  );
}
