import React, { ReactNode } from 'react';
import { useDrop } from 'react-dnd';
import { itemTypes } from '../../../types/BoardTypes';
import './Column.css';

interface IProps {
  title: string;
  children: ReactNode;
}

export const Column = ({ children, title }: IProps) => {
  const [, drop] = useDrop({
    accept: itemTypes.card,
    drop: () => ({
      name: title,
    }),
  });

  return (
    <div className={'columns__item'}>
      <p>{title}</p>
      <div className="columns-wrapper" ref={drop}>
        {children}
      </div>
    </div>
  );
};
