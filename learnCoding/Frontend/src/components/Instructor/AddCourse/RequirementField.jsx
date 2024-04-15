import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Input from "../../common/Input";
import Button from "../../common/Button";

export default function RequirementsField({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
}) {
  const { editCourse, course } = useSelector((state) => state.course);
  const [requirement, setRequirement] = useState("");
  const [requirementsList, setRequirementsList] = useState([]);
const[error, setError] = useState(false)

  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course?.instructions || []); 
      
    }
  }, [editCourse, course?.instructions]); 

  useEffect(() => {
    setValue(name, requirementsList);
  }, [setValue, name, requirementsList]);

  const handleAddRequirement = () => {

    if (requirement.trim() !== "") { 
      setRequirementsList([...requirementsList, requirement]);
      setRequirement(""); 
    }
  };

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList];
    updatedRequirements.splice(index, 1);
    setRequirementsList(updatedRequirements);
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col items-start space-y-2">

      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
        <input
          type="text"
          name={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          id={name}
          label={label}
          className=" rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 w-full  placeholder:text-richblack-400  focus:outline-none"
        />

        <span className="ml-2 text-xs tracking-wide text-pink-200">
            {errors[name] && 'Requirement cannot be empty'}
          </span>

        <Button 
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold "
          btnText="Add"
        />
      </div>

      {requirementsList?.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementsList.map((requirement, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{requirement}</span>
              <button
                type="button"
                className="ml-2 text-xs text-pure-greys-300"
                onClick={() => handleRemoveRequirement(index)}
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
