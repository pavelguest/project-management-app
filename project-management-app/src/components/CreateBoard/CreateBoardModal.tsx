import { useForm, SubmitHandler } from 'react-hook-form';
import { IBoardForm } from '../../types/headerTypes';
import './CreateBoardModal.css';
import axios from 'axios';

axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzYjNkNGEyNy1iMDg3LTRkM2QtOTM0OC0zZjg2ZmFhZmI2ZmEiLCJsb2dpbiI6InVzZXIxIiwiaWF0IjoxNjUyMTExMjY4fQ.EsmO7vXW5kUlyJjfy93YXYpB41p8z_AkQlqal1RGK6o';

export function RenderModalCreateBoard() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  const onSubmit: SubmitHandler<IBoardForm> = (data) => {
    console.log(data.title);
    axios
      .post('https://app-management-final.herokuapp.com/boards', {
        title: data.title,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <form className="create-board-modal" onSubmit={handleSubmit(onSubmit)}>
      <label>
        Create new board
        <input
          className="create-board-modal__input"
          type="text"
          {...register('title', {
            required: 'Field has to be fulfilled',
          })}
        />
        {errors.title && <p className="errors-message">{errors.title.message || 'error!'}</p>}
      </label>
      <button className="create-board-modal__btn">Create</button>
    </form>
  );
}
