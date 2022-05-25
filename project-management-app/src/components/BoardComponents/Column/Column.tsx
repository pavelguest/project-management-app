import React, { ReactNode, useState } from 'react';
import { useDrop } from 'react-dnd';
import { fetchPutColumnId } from '../../../redux/reducers/ActionCreators';
import { itemTypes } from '../../../types/BoardTypes';
import AlertDialogDelete from '../../AlertDialogDelete';
import ChangeTitleColumn from '../../ChangeTitleColumn';
import ModalCreateItem from '../ModalCreateItem';
import './Column.css';

interface IProps {
  title: string;
  order: number;
  columnId: string;
  boardId: string;
  children: ReactNode;
  createTask: (value: string, description: string, currentColumnId: string) => void;
  deleteColumn: (columnId: string) => void;
  changeTitle: (columnId: string, title: string) => void;
}

export const Column = ({
  children,
  title,
  columnId,
  boardId,
  order,
  createTask,
  deleteColumn,
  changeTitle,
}: IProps) => {
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [{ isOver }, drop] = useDrop({
    accept: itemTypes.card,
    drop: () => ({
      currentDropColumnId: columnId,
    }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const setTask = (value: string, description?: string) => {
    createTask(value, description as string, columnId);
  };
  const deleteItem = () => {
    deleteColumn(columnId);
  };
  const changeTitleColumn = (value: string) => {
    changeTitle(columnId, value);
    fetchPutColumnId({
      props: {
        boardId,
        columnId,
      },
      putColumn: {
        title: value,
        order,
      },
    });
  };

  const handleOpenTitleChange = () => {
    setIsEditTitle(true);
  };
  const handleCloseTitleChange = () => {
    setIsEditTitle(false);
  };

  return (
    <div className={'columns__item'}>
      <div className={'column__controls'}>
        <div className={'column-title__container'}>
          {isEditTitle ? (
            <ChangeTitleColumn
              title={title}
              closeContainer={handleCloseTitleChange}
              changeTitleColumn={changeTitleColumn}
            />
          ) : (
            <h3 onClick={handleOpenTitleChange}>{title}</h3>
          )}
        </div>
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
