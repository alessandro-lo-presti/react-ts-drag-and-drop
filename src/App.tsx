import "./App.css";
import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import InputField from "./components/inputField/inputField";
import TodoList from "./components/todoList/todoList";
import { Todo } from "./model";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const addNewTodo = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const active = todos;
    const complete = completedTodos;
    const add =
      source.droppableId === "TodoList"
        ? active.splice(source.index, 1)[0]
        : complete.splice(source.index, 1)[0];

    destination.droppableId === "TodoList"
      ? active.splice(destination.index, 0, { ...add, isDone: false })
      : complete.splice(destination.index, 0, { ...add, isDone: true });

    setTodos(active);
    setCompletedTodos(complete);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <div className="heading">Taskify</div>
        <InputField todo={todo} setTodo={setTodo} addNewTodo={addNewTodo} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
