import React from 'react';
import ModalCreateItem from '../ModalCreateItem';
import Column from '../Column';
import Task from '../Task';
import ColumnsContainer from '../TasksContainer';
import './BoardContainer.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchCreateColumn, fetchCreateTask } from '../../../redux/reducers/ActionCreators';
import Preload from '../../Preload';
import { addColumns, addMovedTasks, addTasks } from '../../../redux/reducers/boardsSlice';
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

export const BoardContainer = () => {
  const { auth } = useAppSelector((state) => state.authReducers);
  const { currentBoard, statusApi } = useAppSelector((state) => state.boardReducers);
  const userId = auth.id;
  const columnsArr = currentBoard.columns;
  const dispatch = useAppDispatch();

  const createColumn = (value: string) => {
    // const orderColumns = columnsArr.length ? columnsArr.length + 2 : 0;
    dispatch(
      fetchCreateColumn({
        boardId: currentBoard.id,
        // order: orderColumns,
        title: value,
      })
    );
  };
  const createTask = (value: string, currentColumnId: string) => {
    const currentColumn = columnsArr.find((elem) => elem.id === currentColumnId) as IColumnsArr;
    // const orderTask = currentColumn.tasks.length ? currentColumn.tasks.length + 2 : 0;
    dispatch(
      fetchCreateTask({
        columnId: currentColumnId,
        boardId: currentBoard.id,
        userId: userId,
        title: value,
        // order: orderTask,
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
    console.log(`column`, currentColumn);
    const dragItem = currentColumn.tasks[dragIndex];
    if (dragItem) {
      const coppiedStateArray = [...currentColumn.tasks];
      const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
      coppiedStateArray.splice(dragIndex, 1, prevItem[0]);
      dispatch(addTasks({ columnId: currentColumn.id, tasksArr: coppiedStateArray }));
    }
  };

  const moveTaskToColumn = (
    taskIndexFrom: number,
    taskIndexTo: number,
    columnIdFrom: string,
    columnIdTo: string
  ) => {
    console.log(`taskIndexFrom`, taskIndexFrom);
    console.log(`taskIndexTo`, taskIndexTo);
    console.log(`columnIdFrom`, columnIdFrom);
    console.log(`columnIdTo`, columnIdTo);

    const currentColumn = columnsArr.find((elem) => elem.id === columnIdFrom) as IColumnsArr;
    const dropColumn = columnsArr.find((elem) => elem.id === columnIdTo) as IColumnsArr;

    // console.log(`step one`, dropColumn);

    const dragTask = currentColumn.tasks[taskIndexFrom];
    if (dragTask) {
      const columnTasksFrom = [...currentColumn.tasks];
      const columnTasksTo = [...dropColumn.tasks];

      // console.log(`step two`, columnTasksTo);

      if (columnTasksTo.length === 0) {
        columnTasksTo.push(dragTask);
      } else {
        columnTasksTo.splice(taskIndexTo, 0, dragTask);
      }

      // console.log(`step tree`, columnTasksTo);

      // console.log(`to`, columnTasksTo);
      // columnTasksTo.splice(currentTaskIndex, 0, prevItem[0]);

      columnTasksFrom.splice(taskIndexFrom, 1);
      // console.log(`from`, columnTasksFrom);

      dispatch(
        addMovedTasks({
          columnIdFrom: columnIdFrom,
          columnIdTo: columnIdTo,
          columnTasksArrFrom: columnTasksFrom,
          columnTasksArrTo: columnTasksTo,
        })
      );
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
                    taskObj={task}
                    index={index}
                    columnId={elem.id}
                    moveTaskHandler={moveTaskHandler}
                    moveTaskToColumn={moveTaskToColumn}
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
