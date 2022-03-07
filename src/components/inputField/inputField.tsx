import React, { useRef } from "react";
import "./inputField.css";

interface InputFieldProps {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  addNewTodo: (e: React.FormEvent) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  todo,
  setTodo,
  addNewTodo,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      action=""
      className="input"
      onSubmit={(e) => {
        addNewTodo(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        className="input-text"
        type="text"
        placeholder="Enter a task"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="input-submit">Go</button>
    </form>
  );
};

export default InputField;
