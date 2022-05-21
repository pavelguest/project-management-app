import React, { useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { useAppSelector } from '../../../hooks/redux';
import { itemTypes } from '../../../types/BoardTypes';
import { ITaskObj } from '../../../types/tasksSliceType';
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
}

export const Task = ({
  index,
  moveTaskHandler,
  columnId,
  taskObj,
  moveTaskToColumn,
}: IPropsTask) => {
  const { currentBoard } = useAppSelector((state) => state.boardReducers);

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
        console.log(`drop column`, currentDropColumnId);
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

  drag(drop(ref));
  return (
    <div className="column" ref={ref} style={{ backgroundColor: isDragging ? 'red' : 'white' }}>
      {taskObj.title}
    </div>
  );
};
