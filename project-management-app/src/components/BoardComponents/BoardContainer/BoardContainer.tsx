import React, { useState } from 'react';
import ModalCreateItem from '../ModalCreateItem';
import Column from '../Column';
import Task from '../Task';
import ColumnsContainer from '../TasksContainer';
import './BoardContainer.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchCreateColumn, fetchCreateTask } from '../../../redux/reducers/ActionCreators';
import Preload from '../../Preload';
import { addColumns, addTasks } from '../../../redux/reducers/boardsSlice';
import { IColumnsArr } from '../../../types/boardsSliceTypes';

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
  const { auth } = useAppSelector((state) => state.authReducers);
  const { currentBoard, statusApi } = useAppSelector((state) => state.boardReducers);
  const userId = auth.id;
  const columnsArr = currentBoard.columns;
  const dispatch = useAppDispatch();
  const [tasks, setTasks] = useState(items);

  const createColumn = (value: string) => {
    const orderColumns = columnsArr.length ? columnsArr.length + 2 : 0;
    dispatch(
      fetchCreateColumn({
        boardId: currentBoard.id,
        order: orderColumns,
        title: value,
      })
    );
  };
  const createTask = (value: string, currentColumnId: string) => {
    const currentColumn = columnsArr.find((elem) => elem.id === currentColumnId) as IColumnsArr;
    const orderTask = currentColumn.tasks.length ? currentColumn.tasks.length + 2 : 0;
    dispatch(
      fetchCreateTask({
        columnId: currentColumnId,
        boardId: currentBoard.id,
        userId: userId,
        title: value,
        order: orderTask,
        description: 'qqq',
      })
    );
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

  const moveTaskHandler = (dragIndex: number, hoverIndex: number, currentColumnId: string) => {
    const currentColumn = columnsArr.find((elem) => elem.id === currentColumnId) as IColumnsArr;
    const dragItem = currentColumn.tasks[dragIndex];
    if (dragItem) {
      const coppiedStateArray = [...currentColumn.tasks];
      const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
      coppiedStateArray.splice(dragIndex, 1, prevItem[0]);
      dispatch(addTasks(coppiedStateArray));
    }
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
              <Column title={elem.title} id={elem.id} createTask={createTask}>
                {elem.tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    title={task.title}
                    setTasks={setTasks}
                    index={index}
                    columnId={elem.id}
                    moveTaskHandler={moveTaskHandler}
                  />
                ))}
              </Column>
            </ColumnsContainer>
          ))
        )}
      </div>
      <ModalCreateItem type={'column'} create={createColumn} />
    </div>
  );
};
