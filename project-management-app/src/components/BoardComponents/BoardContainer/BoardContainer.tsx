import React from 'react';
import ModalCreateItem from '../ModalCreateItem';
import Column from '../Column';
import Task from '../Task';
import ColumnsContainer from '../TasksContainer';
import './BoardContainer.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  fetchCreateColumn,
  fetchCreateTask,
  fetchDeleteColumnId,
  fetchDeleteTaskId,
  fetchPutColumnId,
  fetchPutTaskId,
} from '../../../redux/reducers/ActionCreators';
import Preload from '../../Preload';
import {
  addColumns,
  addMovedTasks,
  addTasks,
  changeColumnTitle,
  changeTask,
  delColumn,
  delTask,
} from '../../../redux/reducers/boardsSlice';
import { IColumnsArr } from '../../../types/boardsSliceTypes';

export const BoardContainer = () => {
  const { auth } = useAppSelector((state) => state.authReducers);
  const { currentBoard, statusApi } = useAppSelector((state) => state.boardReducers);
  const userId = auth.id;
  const columnsArr = currentBoard.columns;
  const dispatch = useAppDispatch();

  const createColumn = (value: string) => {
    dispatch(
      fetchCreateColumn({
        boardId: currentBoard.id,
        title: value,
      })
    );
  };
  const createTask = (value: string, description: string, currentColumnId: string) => {
    dispatch(
      fetchCreateTask({
        columnId: currentColumnId,
        boardId: currentBoard.id,
        userId: userId,
        title: value,
        description,
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

      fetchPutColumnId({
        props: { boardId: currentBoard.id, columnId: dragItem.id },
        putColumn: { title: dragItem.title, order: hoverIndex + 1 },
      });
    }
  };

  const moveTaskHandler = (dragIndex: number, hoverIndex: number, currentColumnId: string) => {
    const currentColumn = columnsArr.find((elem) => elem.id === currentColumnId) as IColumnsArr;

    const dragItem = currentColumn.tasks[dragIndex];
    if (dragItem) {
      const coppiedStateArray = [...currentColumn.tasks];
      const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
      coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

      dispatch(addTasks({ columnId: currentColumn.id, tasksArr: coppiedStateArray }));

      fetchPutTaskId({
        props: { boardId: currentBoard.id, columnId: currentColumnId, taskId: dragItem.id },
        putTask: {
          title: dragItem.title,
          userId: dragItem.userId,
          description: dragItem.description,
          boardId: currentBoard.id,
          columnId: currentColumnId,
          order: hoverIndex + 1,
        },
      });
    }
  };

  const moveTaskToColumn = (
    taskIndexFrom: number,
    taskIndexTo: number,
    columnIdFrom: string,
    columnIdTo: string
  ) => {
    const currentColumn = columnsArr.find((elem) => elem.id === columnIdFrom) as IColumnsArr;
    const dropColumn = columnsArr.find((elem) => elem.id === columnIdTo) as IColumnsArr;

    const dragTask = currentColumn.tasks[taskIndexFrom];

    if (dragTask) {
      const columnTasksFrom = [...currentColumn.tasks];
      const columnTasksTo = [...dropColumn.tasks];

      if (columnTasksTo.length === 0) {
        columnTasksTo.push(dragTask);
      } else {
        columnTasksTo.splice(taskIndexTo, 0, dragTask);
      }

      columnTasksFrom.splice(taskIndexFrom, 1);

      dispatch(
        addMovedTasks({
          columnIdFrom: columnIdFrom,
          columnIdTo: columnIdTo,
          columnTasksArrFrom: columnTasksFrom,
          columnTasksArrTo: columnTasksTo,
        })
      );

      const orderTask = columnTasksTo.findIndex((elem) => elem.id === dragTask.id);

      fetchPutTaskId({
        props: { boardId: currentBoard.id, columnId: columnIdFrom, taskId: dragTask.id },
        putTask: {
          title: dragTask.title,
          userId: dragTask.userId,
          description: dragTask.description,
          boardId: currentBoard.id,
          columnId: columnIdTo,
          order: orderTask + 1,
        },
      });
    }
  };
  const deleteColumn = (columnId: string) => {
    dispatch(fetchDeleteColumnId({ boardId: currentBoard.id, columnId }));
    dispatch(delColumn(columnId));
  };

  const deleteTask = (taskId: string, columnId: string) => {
    dispatch(fetchDeleteTaskId({ boardId: currentBoard.id, columnId, taskId }));
    dispatch(delTask({ taskId, columnId }));
  };

  const changeTitleColumn = (columnId: string, title: string) => {
    dispatch(changeColumnTitle({ columnId, title }));
  };

  const editTask = (value: string, type: string, columnId: string, taskId: string) => {
    dispatch(changeTask({ columnId, taskId, value, type }));
  };

  return (
    <div className="board-container">
      <ModalCreateItem type={'column'} create={createColumn} />
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
              <Column
                title={elem.title}
                columnId={elem.id}
                boardId={currentBoard.id}
                order={elem.order}
                createTask={createTask}
                deleteColumn={deleteColumn}
                changeTitle={changeTitleColumn}
              >
                {elem.tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    taskObj={task}
                    index={index}
                    columnId={elem.id}
                    moveTaskHandler={moveTaskHandler}
                    moveTaskToColumn={moveTaskToColumn}
                    deleteTask={deleteTask}
                    editTask={editTask}
                  />
                ))}
              </Column>
            </ColumnsContainer>
          ))
        )}
      </div>
    </div>
  );
};
