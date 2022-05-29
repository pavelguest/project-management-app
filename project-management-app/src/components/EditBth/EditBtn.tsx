import React from 'react';
import { FormattedMessage } from 'react-intl';
// import EditIcon from '@mui/icons-material/Edit';
import './EditBtn.css';

const EditBtn = () => {
  return (
    <div className="wrap">
      <FormattedMessage id="edit_route" />
      {/* <span>Edit profile &nbsp;</span> */}
      {/* <EditIcon sx={{ color: 'var(--peach)' }} /> */}
    </div>
  );
};

export default EditBtn;
