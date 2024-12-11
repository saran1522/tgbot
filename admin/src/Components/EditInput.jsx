import React, { useState } from "react";

function EditInput({ label, value, handleChange }) {
  const [currInput, setCurrInput] = useState(value);
  return (
    <div className="flex flex-col gap-1 text-base">
      <label htmlFor="" className="ml-1">
        {label}
      </label>
      <input
        type="text"
        name=""
        id=""
        value={currInput}
        onChange={(e) => {
          setCurrInput(e.target.value);
          handleChange(e.target.value);
        }}
        className="p-3 border border-gray-800 rounded-xl bg-transparent focus:outline-none"
      />
    </div>
  );
}

export default EditInput;
