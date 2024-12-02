"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Radio, RadioGroup } from "@nextui-org/radio";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import React, { useEffect, useRef, useState } from "react";
import { ToDoListType } from "../types/important";

// tabela , na która godzina przychodzą, uzytkownicy, wybor tygodnia, 52 tyg w roku, numerki, od kiedy do kiedy (który tydzień),tylko dział IT
//nazwa użytkownika
// nr tel
//adres email
// nr tyg
// na którą przychodzi
// wyszukiwarka
const Page = () => {
  const [todos, setTodos] = useState<ToDoListType[]>([]);
  const [taskID, setTaskId] = useState<number>(0);
  const [taskName, setTaskName] = useState<string>("");
  const [inputDate, setInputDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [radioValue, setRadioValue] = useState<string>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskName.trim()) {
      alert("Task Name cannot be empty");
      return;
    }

    if (editingID !== null) {
      const updatedData = todos.map((todo) =>
        todo.id === editingID
          ? {
              ...todo,
              name: taskName,
              status: radioValue,
              date: inputDate,
            }
          : todo
      );

      setTodos(updatedData);
      localStorage.setItem("todos", JSON.stringify(updatedData));

      setEditingId(null); //reset edytowania
    } else {
      const findMax = todos.map((todo) => todo.id);

      const maxId = todos.length > 0 ? Math.max(...findMax) : 0;
      const newToDo = {
        id: maxId + 1,
        name: taskName.trim(),
        status: radioValue,
        date: inputDate,
      };

      setTodos((prevData) => {
        const updatedData = [...prevData, newToDo];
        localStorage.setItem("todos", JSON.stringify(updatedData));
        return updatedData;
      });

      setTaskId(maxId + 1);
      //setTaskId((prevId) => prevId + 1);
    }

    //reset form

    setTaskName("");

    setRadioValue("pending");
    setInputDate(new Date().toISOString().split("T")[0]);
  };

  useEffect(() => {
    const loadedData = localStorage.getItem("todos");
    if (loadedData) {
      const retData = JSON.parse(loadedData);
      setTodos(retData);
    }
  }, []);

  //   useEffect(() => {
  //     localStorage.removeItem("todos");
  //   }, []);

  const [editingID, setEditingId] = useState<number | null>(null);

  const handleEdit = (editId: number) => {
    const taskToEdit = todos.find((todo) => todo.id === editId);

    if (taskToEdit) {
      setTaskName(taskToEdit.name);
      setRadioValue(taskToEdit.status);
      setInputDate(taskToEdit.date);
      setEditingId(editId);
    }
  };

  const handleRemove = (deleteId: number) => {
    const allRemainingData = todos.filter((todo) => todo.id !== deleteId);

    const maxId =
      allRemainingData.length > 0
        ? Math.max(...allRemainingData.map((todo) => todo.id))
        : 0;

    setTodos(allRemainingData);
    localStorage.setItem("todos", JSON.stringify(allRemainingData));

    if (deleteId >= taskID - 1) {
      setTaskId(maxId + 1);
    }
  };

  useEffect(() => {
    console.log("TASK", todos);

    console.log("Edytowane ID, ", editingID);
  }, [todos, editingID]);

  useEffect(() => {
    console.log("Aktualne id,", taskID);
    const mydate = new Date().toLocaleString().split(",")[1].trim().slice(0, 5);
    console.log("Czas, ", mydate);
  }, [taskID]);
  return (
    <div className="flex flex-col w-screen h-full items-center justify-center p-2">
      <form onSubmit={handleSubmit} className=" w-full p-4 ">
        <div className="flex flex-col items-center justify-center">
          <strong className="text-white">ToDo Task</strong>
          <div className="flex w-1/3 m-4 ">
            <Input
              type="text"
              label="Nazwa"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <div className="flex flex-col p-6 w-1/3  items-center justify-center">
            <RadioGroup label="Status zadania">
              <Radio
                value={"completed"}
                data-selected={radioValue === "completed"}
                onChange={(e) => setRadioValue(e.target.value)}
              >
                Zakończony
              </Radio>
              <Radio
                value={"pending"}
                data-selected={radioValue === "pending"}
                onChange={(e) => setRadioValue(e.target.value)}
              >
                Oczekujący
              </Radio>
              <Radio
                value={"deleted"}
                data-selected={radioValue === "deleted"} // kontroluje zaznaczenie
                onChange={(e) => setRadioValue(e.target.value)}
              >
                Wycofany
              </Radio>
            </RadioGroup>
          </div>
          <div className="w-1/3  flex flex-col items-center p-4">
            <Input
              type="date"
              label="data"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
            />
            <Button type="submit" className="bg-green-300 w-1/3 mt-4">
              Wyślij
            </Button>
          </div>
        </div>
      </form>
      <div>
        <Table
          aria-label="todos"
          classNames={{
            tbody: "text-black text-[10px]",
          }}
        >
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>Name</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Data</TableColumn>
            <TableColumn>Akcja</TableColumn>
          </TableHeader>
          <TableBody>
            {todos.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.date}</TableCell>
                <TableCell>
                  <div className="flex flex-row gap-2">
                    <Button
                      className="bg-yellow-300 p-3 rounded-2xl"
                      onClick={() => handleEdit(task.id)}
                    >
                      Edytuj
                    </Button>
                    <Button
                      className="bg-red-600 p-3 rounded-2xl"
                      onClick={() => handleRemove(task.id)}
                    >
                      Usuń
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
