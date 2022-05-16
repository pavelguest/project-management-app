import React, { ReactNode } from 'react';
import { useDrop } from 'react-dnd';
import { itemTypes } from '../../../types/BoardTypes';
import ModalCreateItem from '../ModalCreateItem';
import './Column.css';

interface IProps {
  title: string;
  children: ReactNode;
  createTask: (value: string) => void;
}

export const Column = ({ children, title, createTask }: IProps) => {
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
        <ModalCreateItem type={'task'} create={createTask} />
      </div>
    </div>
  );
};
