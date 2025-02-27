import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  task: z.string().min(1, "Task cannot be empty"),
});

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    if (editIndex !== null) {
      // Edit task
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = data.task;
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      // Add new task
      setTodos([...todos, data.task]);
    }
    setValue("task", ""); // Clear input field
  };

  const handleEdit = (index) => {
    setValue("task", todos[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1>TODO LIST</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="todo-form">
        <input type="text" {...register("task")} placeholder="Add item . . ." />
        <button type="submit">{editIndex !== null ? "Update" : "ADD"}</button>
      </form>
      {errors.task && <p className="error">{errors.task.message}</p>}
      
      <div className="todo-list">
        {todos.map((todo, index) => (
          <div className={`todo-item ${index % 2 === 0 ? "light" : "dark"}`} key={index}>
            <span>{todo}</span>
            <div>
              <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
              <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
