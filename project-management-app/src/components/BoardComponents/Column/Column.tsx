import React, { ReactNode } from 'react';
import { useDrop } from 'react-dnd';
import { itemTypes } from '../../../types/BoardTypes';
import AlertDialogDelete from '../../AlertDialogDelete';
import ModalCreateItem from '../ModalCreateItem';
import './Column.css';

interface IProps {
  title: string;
  id: string;
  children: ReactNode;
  createTask: (value: string, currentColumnId: string) => void;
  deleteColumn: (columnId: string) => void;
}

export const Column = ({ children, title, id, createTask, deleteColumn }: IProps) => {
  const [{ isOver }, drop] = useDrop({
    accept: itemTypes.card,
    drop: () => ({
      currentDropColumnId: id,
    }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const setTask = (value: string) => {
    createTask(value, id);
  };
  const deleteItem = () => {
    deleteColumn(id);
  };

  return (
    <div className={'columns__item'}>
      <div className={'column__controls'}>
        <p>{title}</p>
        <AlertDialogDelete deleteItem={deleteItem} />
      </div>
      <div
        className="columns-wrapper"
        ref={drop}
        style={{ backgroundColor: isOver ? 'coral' : 'white' }}
      >
        {children}
      </div>
      <ModalCreateItem type={'task'} create={setTask} />
    </div>
  );
};
