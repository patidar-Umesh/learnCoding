import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Input from "../../../common/Input";

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

  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course?.instructions);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValue(name, requirementsList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementsList]);

  const handleAddRequirement = () => {
    if (requirement) {
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

        <Input
          type="text"
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          id={name}
          label={label}
          astrick="true"
          error={errors[name] && `${label} is required`}
        />

        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>

      {requirementsList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementsList.map((requirement, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{requirement}</span>
              <button
                type="button"
                className="ml-2 text-xs text-pure-greys-300 "
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
