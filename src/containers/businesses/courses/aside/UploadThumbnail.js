import React from 'react';
import PropTypes from 'prop-types';

import { AbsoluteButton, Input } from '../styled/courseForm';

const UploadThumbnail = ({onChange}) => {
  let fileInput = null;
  const handleClick = () => {
    fileInput.click();
  };

  return (
    <AbsoluteButton type="button" onClick={handleClick}>
      Change
      <Input
        ref={input => { fileInput = input; }}
        type="file"
        accept="image/*"
        onChange={onChange}
      />
    </AbsoluteButton>
  );
};

UploadThumbnail.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export { UploadThumbnail };
