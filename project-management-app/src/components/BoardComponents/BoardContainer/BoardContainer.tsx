import React, { useEffect, useState } from 'react';
import ModalCreateItem from '../ModalCreateItem';
import Column from '../Column';
import Task from '../Task';
import ColumnsContainer from '../TasksContainer';
import './BoardContainer.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { columnSlice } from '../../../redux/reducers/columnSlice';
import { fetchCreateColumn, fetchGetAllColumns } from '../../../redux/reducers/ActionCreators';
import { IColumns } from '../../../types/columnSliceType';
import Preload from '../../Preload';
import { taskSlice } from '../../../redux/reducers/taskSlice';

export interface IColumnItems {
  order: number;
  title: string;
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
  { order: 1, title: COLUMN_NAMES.DO_IT },
  { order: 2, title: COLUMN_NAMES.IN_PROGRESS },
  { order: 3, title: COLUMN_NAMES.AWAITING_REVIEW },
  { order: 4, title: COLUMN_NAMES.DONE },
];

const { DO_IT } = COLUMN_NAMES;
export const items = [
  { id: 1, name: 'Item1', column: DO_IT },
  { id: 2, name: 'Item2', column: DO_IT },
  { id: 3, name: 'Item3', column: DO_IT },
  { id: 4, name: 'Item4', column: DO_IT },
];

export const BoardContainer = () => {
  const { columnsArr, statusApi } = useAppSelector((state) => state.columnReducers);
  const { tasksArr, statusApiTask } = useAppSelector((state) => state.taskReducers);
  const { addColumns } = columnSlice.actions;
  const { addTasks } = taskSlice.actions;
  const dispatch = useAppDispatch();
  // const [columns, setColumns] = useState<IColumns[]>([]);
  const [tasks, setTasks] = useState(items);

  const getColumns = () => {
    dispatch(fetchGetAllColumns('7e4d9a6c-1791-4114-a267-e8895b2bfa52'));
    // setColumns(columnsArr);
  };
  const getTasks = () => {};

  useEffect(() => {
    getColumns();
  }, []);

  const createColumn = (value: string) => {
    const orderColumns = columnsArr.length ? columnsArr.length + 2 : 0;
    dispatch(
      fetchCreateColumn({
        boardId: '7e4d9a6c-1791-4114-a267-e8895b2bfa52',
        order: orderColumns,
        title: value,
      })
    );
  };
  const createTask = (value: string) => {
    console.log(value);
  };

  const moveColumnHandler = (dragIndex: number, hoverIndex: number) => {
    const dragItem = columnsArr[dragIndex];
    if (dragItem) {
      const coppiedStateArray = [...columnsArr];
      const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
      coppiedStateArray.splice(dragIndex, 1, prevItem[0]);
      dispatch(addColumns(coppiedStateArray));
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
        {statusApi.isLoading && <Preload />}
        {statusApi.error ? (
          <div>{statusApi.error}</div>
        ) : (
          columnsArr &&
          columnsArr.map((elem, index) => (
            <ColumnsContainer
              moveColumnHandler={moveColumnHandler}
              key={elem.order}
              index={index}
              name={elem.title}
            >
              <Column title={elem.title} createTask={createTask}>
                {returnTasksForColumn(elem.title)}
              </Column>
            </ColumnsContainer>
          ))
        )}
      </div>
      <ModalCreateItem type={'column'} create={createColumn} />
    </div>
  );
};
