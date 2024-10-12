import { useState } from "react";
import Button from "./Button";
import Search from "./Search";
import Table from "./Table";
import AddTaskModel from "./AddTaskModel";
import NoTasksFound from "./Nofound";
export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Integration API",
    description:
      "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently",
    tags: ["Python", "Django", "Native"],
    priority: "High",
    isFovarite: true,
  };

  const [tasks, setTasks] = useState([defaultTask]);
  const [showModel, setShowModal] = useState(false);
  const [taskUpdate, setTaskUpdate] = useState(null);

  function handleAddTask(newTask) {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setShowModal(false);
  }

  function handleTaskEdit(task) {
    setShowModal(task);
    setShowModal(true);
  }

  function handleDelete(taskId) {
    const deleteF = tasks.filter((task) => {
      task.id !== taskId;
    });
    setTasks(deleteF);
  }
  function handleReverse() {
    let newArray = [...tasks];
    console.log(newArray);
    let i = 0;
    let j = newArray.length - 1;

    while (i < j) {
      let tmp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = tmp;
      i++;
      j--;
    }
    setTasks(newArray);
  }

  return (
    <section className="mb-20" id="tasks">
      {showModel && <AddTaskModel onSave={handleAddTask} />}
      <div className="container">
        <Search />
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <Button
            onAddClick={() => setShowModal(true)}
            onReverse={handleReverse}
            taskUpdate={taskUpdate}
          />
          <div className="overflow-auto">
            {tasks.length > 0 ? (
              <Table
                tasks={tasks}
                onEdit={handleTaskEdit}
                onDelete={handleDelete}
              />
            ) : (
              <NoTasksFound />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
