import React from "react";
import "./todoList.css";
import { Todo } from "../../model";
import SingleTodo from "../singleTodo/singleTodo";
import { Droppable } from "react-beautiful-dnd";

interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  // todos
  const handleEditTodo = (todoId: number, todoNewValue: string) =>
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, todo: todoNewValue } : todo
      )
    );

  const handleDeleteTodo = (todoId: number) =>
    setTodos(todos.filter((todo) => todo.id !== todoId));

  const handleDoneTodo = (todoId: number) => {
    const completedTodo = todos.filter((todo) => todo.id === todoId)[0];
    setTodos(todos.filter((todo) => todo.id !== todoId));
    setCompletedTodos([...completedTodos, { ...completedTodo, isDone: true }]);
  };

  // completedTodos
  const handleCompleteEditTodo = (todoId: number, todoNewValue: string) =>
    setCompletedTodos(
      completedTodos.map((todo) =>
        todo.id === todoId ? { ...todo, todo: todoNewValue } : todo
      )
    );

  const handleCompleteDeleteTodo = (todoId: number) =>
    setCompletedTodos(completedTodos.filter((todo) => todo.id !== todoId));

  const handleCompletedDoneTodo = (todoId: number) => {
    const unCompletedTodo = completedTodos.filter(
      (todo) => todo.id === todoId
    )[0];
    setCompletedTodos(completedTodos.filter((todo) => todo.id !== todoId));
    setTodos([...todos, { ...unCompletedTodo, isDone: false }]);
  };

  return (
    <div className="todos-container">
      <div className="todos-list todo-active-task">
        <p className="todo-list-name">Active Task</p>
        <Droppable droppableId="TodoList">
          {/* props.snapshot per dare le classi css, anche Drag, snapshot.isDrapOver ? 'active' : '' */}
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {todos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  key={todo.id}
                  todo={todo}
                  handleEditTodo={handleEditTodo}
                  handleDeleteTodo={handleDeleteTodo}
                  handleDoneTodo={handleDoneTodo}
                />
              ))}
              {provided.placeholder} {/* altezza contenitore */}
            </div>
          )}
        </Droppable>
      </div>
      <div className="todos-list todo-completed-task">
        <p className="todo-list-name">Completed Task</p>

        <Droppable droppableId="CompletedTodoList">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {completedTodos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  key={todo.id}
                  todo={todo}
                  handleEditTodo={handleCompleteEditTodo}
                  handleDeleteTodo={handleCompleteDeleteTodo}
                  handleDoneTodo={handleCompletedDoneTodo}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default TodoList;
