import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from '@common/styled/Button';
import { Colors } from '@statics/Colors';

const Input = styled.input`
  display: none;
`;

const AbsoluteButton = styled(Button)`
  margin: 0;
  position: absolute;
  background-color: ${Colors.IndyWorkBlack_d};
  opacity: 0.5;
  height: 1.75em;
  width: 6em;
`;

const UploadPhotoButton = ({color, onChange}) => {
  let fileInput = null;
  const handleClick = () => {
    fileInput.click();
  };
  return (
    <AbsoluteButton type="button" color={color} onClick={handleClick}>
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

UploadPhotoButton.propTypes = {
  color: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

UploadPhotoButton.defaultProps = {
  color: 'white'
};

export { UploadPhotoButton };
