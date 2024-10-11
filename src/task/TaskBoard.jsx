import { useState } from "react";
import Button from "./Button";
import Search from "./Search";
import Table from "./Table";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Integration API",
    Description:
      "Connect an existing API to a third-party database using securemethods and handle data exchange efficiently",
    tags: ["Python", "Django", "Native"],
    priority: "High",
    isFovarite: true,
  };

  const [tasks, setTask] = useState([defaultTask]);
  return (
    <section className="mb-20" id="tasks">
      <div className="container">
        {/* Todo Work the search bar */}
        <Search />

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          {/* todo work the action button */}
          <Button />
          <div className="overflow-auto">
            <Table tasks={tasks} />
          </div>
        </div>
      </div>
    </section>
  );
}
