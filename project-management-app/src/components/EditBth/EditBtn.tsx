import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import './EditBtn.css';

const EditBtn = () => {
  return (
    <div className="wrap">
      <span>Edit profile &nbsp;</span>
      <EditIcon sx={{ color: 'var(--peach)' }} />
    </div>
  );
};

export default EditBtn;
