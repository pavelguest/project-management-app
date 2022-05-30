import React, { useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { useAppSelector } from '../../../hooks/redux';
import { fetchPutTaskId } from '../../../redux/reducers/ActionCreators';
import { itemTypes } from '../../../types/BoardTypes';
import { ITaskObj } from '../../../types/tasksSliceType';
import AlertDialogDelete from '../../AlertDialogDelete';
import TaskModal from '../../TaskModal';
import './Task.css';

interface ITask {
  index: number;
  currentDropColumnId: string;
}
interface IPropsTask {
  index: number;
  columnId: string;
  taskObj: ITaskObj;
  moveTaskHandler: (dragIndex: number, hoverIndex: number, currentColumnId: string) => void;
  moveTaskToColumn: (
    currentTaskIndex: number,
    dropTaskIndex: number,
    currentColumnId: string,
    dropColumnId: string
  ) => void;
  deleteTask: (taskId: string, columnId: string) => void;
  editTask: (value: string, type: string, columnId: string, taskId: string) => void;
}

export const Task = ({
  index,
  columnId,
  taskObj,
  moveTaskHandler,
  moveTaskToColumn,
  deleteTask,
  editTask,
}: IPropsTask) => {
  const { currentBoard } = useAppSelector((state) => state.boardReducers);
  const { auth } = useAppSelector((state) => state.authReducers);
  const [openTask, setOpenTask] = React.useState(false);
  const handleOpenTask = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if ((event.target as HTMLElement).className === 'task') {
      setOpenTask(true);
    }
  };
  const handleCloseTask = () => setOpenTask(false);

  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: itemTypes.card,
    hover(item: { index: number; title: string }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const currentRef = ref.current as HTMLElement;
      const hoverBoundingRect = currentRef.getBoundingClientRect();

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset() as XYCoord;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveTaskHandler(dragIndex, hoverIndex, columnId);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: itemTypes.card,
    item: { ...taskObj, index },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult() as ITask;
      if (dropResult) {
        const { currentDropColumnId } = dropResult;
        currentBoard.columns.forEach((elem) => {
          if (elem.id === currentDropColumnId && columnId !== currentDropColumnId) {
            moveTaskToColumn(index, item.index, columnId, currentDropColumnId);
          }
        });
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const deleteItem = () => deleteTask(taskObj.id, columnId);

  const editInputTaskHandle = (value: string, type: string) => {
    editTask(value, type, columnId, taskObj.id);
    fetchPutTaskId({
      props: {
        boardId: currentBoard.id,
        columnId,
        taskId: taskObj.id,
      },
      putTask: {
        title: type === 'title' ? value : taskObj.title,
        order: taskObj.order,
        description: type !== 'title' ? value : taskObj.description,
        userId: auth.id,
        boardId: currentBoard.id,
        columnId,
      },
    });
  };

  drag(drop(ref));
  return (
    <>
      <div
        className="task"
        ref={ref}
        style={{ backgroundColor: isDragging ? 'red' : 'white' }}
        onClick={(event) => handleOpenTask(event)}
      >
        <div className="task__title">{taskObj.title}</div>
        <AlertDialogDelete deleteItem={deleteItem} />
      </div>
      <TaskModal
        isOpen={openTask}
        closeTask={handleCloseTask}
        task={taskObj}
        editInput={editInputTaskHandle}
      />
    </>
  );
};
