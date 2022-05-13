import React, { useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { itemTypes } from '../../../types/BoardTypes';
import { COLUMN_NAMES, ITaskSItems } from '../BoardContainer/BoardContainer';
import './Task.css';

interface ITask {
  index: number;
  name: string;
}
interface IPropsTask {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setTasks: any;
  name: string;
  index: number;
  moveTaskHandler: (dragIndex: number, hoverIndex: number) => void;
}

export const Task = ({ setTasks, name, index, moveTaskHandler }: IPropsTask) => {
  const changeTaskColumn = (currentTask: ITask, columnName: string) => {
    setTasks((prevState: ITaskSItems[]) => {
      return prevState.map((elem) => {
        return {
          ...elem,
          column: elem.name === currentTask.name ? columnName : elem.column,
        };
      });
    });
  };

  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: itemTypes.card,
    hover(item: { index: number; name: string }, monitor) {
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
      console.log(dragIndex, hoverIndex);

      moveTaskHandler(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: itemTypes.card,
    item: { index, name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult() as ITask;
      if (dropResult) {
        const { name } = dropResult;
        const { DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE } = COLUMN_NAMES;
        switch (name) {
          case IN_PROGRESS:
            changeTaskColumn(item, IN_PROGRESS);
            break;
          case AWAITING_REVIEW:
            changeTaskColumn(item, AWAITING_REVIEW);
            break;
          case DONE:
            changeTaskColumn(item, DONE);
            break;
          case DO_IT:
            changeTaskColumn(item, DO_IT);
            break;
          default:
            break;
        }
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  drag(drop(ref));
  return (
    <div className="column" ref={ref} style={{ backgroundColor: isDragging ? 'red' : 'white' }}>
      {name}
    </div>
  );
};
