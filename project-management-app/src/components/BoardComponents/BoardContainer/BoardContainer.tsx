import React, { useState } from 'react';
import ModalCreateItem from '../ModalCreateItem';
import Column from '../Column';
import Task from '../Task';
import ColumnsContainer from '../TasksContainer';
import './BoardContainer.css';

export interface IColumnItems {
  id: number;
  name: string;
}
export interface ITaskSItems {
  id: number;
  name: string;
  column: string;
}

export const COLUMN_NAMES = {
  DO_IT: 'Do it',
  IN_PROGRESS: 'In Progress',
  AWAITING_REVIEW: 'Awaiting review',
  DONE: 'Done',
};

export const columnItems = [
  { id: 1, name: COLUMN_NAMES.DO_IT },
  { id: 2, name: COLUMN_NAMES.IN_PROGRESS },
  { id: 3, name: COLUMN_NAMES.AWAITING_REVIEW },
  { id: 4, name: COLUMN_NAMES.DONE },
];

const { DO_IT } = COLUMN_NAMES;
export const items = [
  { id: 1, name: 'Item1', column: DO_IT },
  { id: 2, name: 'Item2', column: DO_IT },
  { id: 3, name: 'Item3', column: DO_IT },
  { id: 4, name: 'Item4', column: DO_IT },
];

export const BoardContainer = () => {
  const [columns, setColumns] = useState(columnItems);
  const [tasks, setTasks] = useState(items);

  const moveColumnHandler = (dragIndex: number, hoverIndex: number) => {
    const dragItem = columns[dragIndex];
    if (dragItem) {
      setColumns((prevState) => {
        const coppiedStateArray = [...prevState];
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);
        return coppiedStateArray;
      });
    }
  };

  const moveTaskHandler = (dragIndex: number, hoverIndex: number) => {
    const dragItem = tasks[dragIndex];
    if (dragItem) {
      setTasks((prevState) => {
        const coppiedStateArray = [...prevState];
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);
        return coppiedStateArray;
      });
    }
  };

  const returnTasksForColumn = (columnName: string) => {
    return tasks
      .filter((task) => task.column === columnName)
      .map((task, index) => (
        <Task
          key={task.id}
          name={task.name}
          setTasks={setTasks}
          index={index}
          moveTaskHandler={moveTaskHandler}
        />
      ));
  };

  return (
    <div className="board-container">
      <div className="columns-container">
        {columns.map((elem, index) => (
          <ColumnsContainer
            moveColumnHandler={moveColumnHandler}
            key={elem.id}
            index={index}
            name={elem.name}
          >
            <Column title={elem.name}>{returnTasksForColumn(elem.name)}</Column>
          </ColumnsContainer>
        ))}
      </div>
      <ModalCreateItem type={'column'} />
    </div>
  );
};
