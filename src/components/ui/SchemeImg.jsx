import React from 'react';

const SchemeImg = ({ scheme,  className = null }) => {
  if (!scheme.photos?.length) {
    return '';
  }
  if (!className) {
    className = 'object-cover';
  }
  return <img src={scheme.photos} alt="" className={className} />;
};

export default SchemeImg;
