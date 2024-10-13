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

  function handleAddTask(newTask, isAdd) {
    if (isAdd) {
      setTasks((prevTasks) => [...prevTasks, newTask]);
      console.log(tasks);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            console.log(newTask.id);
            return newTask;
          }
          return task;
        })
      );
      console.log(tasks);
    }
    setShowModal(false);
  }

  function handleTaskEdit(task) {
    // console.log(task);
    setTaskUpdate(task);
    setShowModal(true);
  }

  function Myflter(tasks, cb) {
    let len = tasks.length;
    let newArray = [];
    for (let i = 0; i < len; i++) {
      if (cb(tasks[i], i, tasks)) {
        newArray.push(tasks[i]);
      }
    }
    return newArray;
  }
  function handleDelete(taskId) {
    // const deleteF = tasks.Myflter((task) => {
    //   task.id !== taskId;
    // });
    const deleteF = Myflter(tasks, function (task) {
      task.id !== taskId;
    });
    setTasks(deleteF);
  }

  function handleCloseBtn() {
    setShowModal(false);
    setTaskUpdate(null);
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

  function handleDeleteAllCilck() {
    tasks.length = 0;
    setTasks([...tasks]);
  }

  function handleTheFav(taskId) {
    let tastIndex = tasks.findIndex((task) => task.id === taskId);
    let newArray = [...tasks];
    newArray[tastIndex].isFovarite = !newArray[tastIndex].isFovarite;
    setTasks(newArray);
  }

  function handleTheSearch(searchTerm) {
    console.log(searchTerm);
    // const filterS = Myflter(tasks,function(task){
    //   task.title.toLowerCase().includes(searchTerm.toLowerCase())
    // })
    const filterS = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTasks([...filterS]);
  }

  return (
    <section className="mb-20" id="tasks">
      {showModel && (
        <AddTaskModel
          onSave={handleAddTask}
          taskUpdate={taskUpdate}
          onCloseButton={handleCloseBtn}
        />
      )}
      <div className="container">
        <Search onSearch={handleTheSearch} />
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <Button
            onAddClick={() => setShowModal(true)}
            onReverse={handleReverse}
            onhandleDeleteAll={handleDeleteAllCilck}
          />
          <div className="overflow-auto">
            {tasks.length > 0 ? (
              <Table
                tasks={tasks}
                onEdit={handleTaskEdit}
                onDelete={handleDelete}
                onFav={handleTheFav}
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
