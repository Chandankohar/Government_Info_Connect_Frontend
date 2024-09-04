import React from 'react';

const UserImg = ({ users,  className = null }) => {
  if (!users.picture?.length) {
    return '';
  }
  if (!className) {
    className = 'object-cover';
  }
  return <img src={users.picture} alt="" className={className} />;
};

export default UserImg;
