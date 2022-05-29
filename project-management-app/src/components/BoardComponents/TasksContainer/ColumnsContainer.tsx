import React, { ReactNode, useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { itemTypes } from '../../../types/BoardTypes';
import './ColumnsContainer.css';
interface IColumnsContainerProps {
  children: ReactNode;
  index: number;
  name: string;
  moveColumnHandler: (dragIndex: number, hoverIndex: number) => void;
}
export const ColumnsContainer = ({
  children,
  index,
  name,
  moveColumnHandler,
}: IColumnsContainerProps) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: itemTypes.column,
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

      const hoverMiddleX = (hoverBoundingRect.left - hoverBoundingRect.right) / 2;
      const clientOffset = monitor.getClientOffset() as XYCoord;
      const hoverClientX = clientOffset.x - hoverBoundingRect.right;
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      moveColumnHandler(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: itemTypes.column,
    item: { index, name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  drag(drop(ref));
  return (
    <div
      className="columns-container__item"
      ref={ref}
      style={{ backgroundColor: isDragging ? 'green' : 'white' }}
    >
      {children}
    </div>
  );
};
