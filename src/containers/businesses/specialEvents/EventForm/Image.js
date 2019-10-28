import React from 'react';
import PropTypes from 'prop-types';
import { FieldErrorWrapper } from '@common/FieldErrorWrapper';
import { NewEvent } from './styled/NewEvent';
import { MdFileUpload, MdImage, MdClose } from 'react-icons/md';
import { Colors } from '@statics/Colors';
import { Upload } from './styled/Upload';
import { Row } from '@common/styled/Flex';

class Image extends React.PureComponent {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    touched: PropTypes.bool,
    error: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  }

  render() {
    const {
      disabled,
      touched,
      error,
      value,
      onChange,
      onRemove,
    } = this.props;
    return (
      <NewEvent.InputRow>
        <NewEvent.Icon>
          <MdImage size="32" color={Colors.IndyWorkLightPurple} />
        </NewEvent.Icon>
        <NewEvent.InputContainer>
          <FieldErrorWrapper touched={touched} error={error}>
            {value && value.name && (
              <Row>
                <MdClose onClick={onRemove} size="20" color={Colors.IndyWorkRed} />
                <NewEvent.Text>{value.name}</NewEvent.Text>
              </Row>
            )}
            <Upload.Label disabled={disabled}>
              <Row>
                Upload image
                <MdFileUpload size="30" color={Colors.IndyWorkNavBar} />
              </Row>
              <Upload.Input
                disabled={disabled}
                accept="image/*"
                name="file"
                type="file"
                onChange={onChange}
              />
            </Upload.Label>
          </FieldErrorWrapper>
        </NewEvent.InputContainer>
      </NewEvent.InputRow>
    );
  }
}

export { Image };