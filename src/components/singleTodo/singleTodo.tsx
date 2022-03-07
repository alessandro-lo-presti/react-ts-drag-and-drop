import React, { useEffect, useRef, useState } from "react";
import "./singleTodo.css";
import { Todo } from "../../model";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

interface SingleTodoProps {
  index: number;
  todo: Todo;
  handleEditTodo: (todoId: number, todoNewValue: string) => void;
  handleDeleteTodo: (id: number) => void;
  handleDoneTodo: (id: number) => void;
}

const SingleTodo: React.FC<SingleTodoProps> = ({
  index,
  todo,
  handleEditTodo,
  handleDeleteTodo,
  handleDoneTodo,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTextValue, setEditTextValue] = useState<string>(todo.todo);

  const editSwitchHandler = () => {
    isEdit && editTextValue.length && handleEditTodo(todo.id, editTextValue);
    setEditTextValue(todo.todo);
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    isEdit && inputRef.current?.focus();
  }, [isEdit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          ref={provided.innerRef}
          className="single-todo"
          onSubmit={(e) => {
            e.preventDefault();
            editSwitchHandler();
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span className="single-todo-text">
            {isEdit ? (
              <input
                ref={inputRef}
                className="single-todo-edit-text"
                type="text"
                value={editTextValue}
                onChange={(e) => setEditTextValue(e.target.value)}
              />
            ) : todo.isDone ? (
              <s>{todo.todo}</s>
            ) : (
              <>{todo.todo}</>
            )}
          </span>
          <div className="single-todo-icons-box">
            <span className="single-todo-icon" onClick={editSwitchHandler}>
              <AiFillEdit />
            </span>
            <span
              className="single-todo-icon"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              <AiFillDelete />
            </span>
            <span
              className="single-todo-icon"
              onClick={() => handleDoneTodo(todo.id)}
            >
              {todo.isDone ? <IoChevronBackOutline /> : <MdDone />}
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
