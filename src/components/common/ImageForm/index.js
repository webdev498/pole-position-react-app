import React from 'react';
import PropTypes from 'prop-types';
import { connect, getIn } from 'formik';

import * as S from './styled';
import { InputLabelStyled } from '../Fields/styled/InputLabelStyled';
import { InvertedRed, InvertedPurlple } from '../FormikButtons/FormikButtonsStyled';

class ImageFormComponent extends React.Component {
  static propTypes = {
    alt: PropTypes.string.isRequired,
    label: PropTypes.string
  };

  static defaultProps = {
    label: 'Club Logo'
  };

  state = {isDragging: false};
  dropRef = React.createRef();
  fileInputRef = React.createRef();

  componentDidMount() {
    this.dragCounter = 0;
    if (this.dropRef.current) {
      let div = this.dropRef.current;
      div.addEventListener('dragenter', this.handleDragIn);
      div.addEventListener('dragleave', this.handleDragOut);
      div.addEventListener('dragover', this.handleDrag);
      div.addEventListener('drop', this.handleDrop);
    }
  }

  componentWillMount() {
    if (this.dropRef.current) {
      let div = this.dropRef.current;
      div.removeEventListener('dragenter', this.handleDragIn);
      div.removeEventListener('dragleave', this.handleDragOut);
      div.removeEventListener('dragover', this.handleDrag);
      div.removeEventListener('drop', this.handleDrop);
    }
  }

  handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ isDragging: true });
    }
  };

  handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter > 0) {
      return;
    }
    this.setState({ isDragging: false });
  };

  handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ isDragging: false });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.handleFileChange(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  };

  onFileInputClick = () => {
    this.fileInputRef.current.click();
  };

  onCancelClick = () => {
    this.fileInputRef.current.value = null;
    this.handleFileChange(null);
  };

  handleFileInputChange = (e) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      this.handleFileChange(e.currentTarget.files[0]);
    }
  };

  handleFileChange = file => {
    const FORMIK = getIn(this.props.formik);

    if (file && file.type.startsWith('image')) {
      FORMIK.setFieldValue('logo_file', file, false);
      let reader = new FileReader();
      reader.onloadend = () => {
        FORMIK.setFieldValue('logo_preview', reader.result, false);
      };
      reader.readAsDataURL(file);
    } else {
      FORMIK.setFieldValue('logo_file', null, false);
      FORMIK.setFieldValue('logo_preview', null, false);
    }
  };



  render() {
    const { isDragging } = this.state;
    const FORMIK       = getIn(this.props.formik);
    const LOGO_PREVIEW = FORMIK.values.logo_preview;
    const IS_EDITING   = FORMIK.values.isEditing;

    return (
      <S.Wrapper>
        <InputLabelStyled isActive={IS_EDITING}>{this.props.label}</InputLabelStyled>
        <S.HiddenInput
          ref={this.fileInputRef}
          type="file"
          name="file"
          accept="image/*"
          onChange={this.handleFileInputChange}
        />
        <S.ImageContainer ref={this.dropRef} isDragging={isDragging}>
          {
            LOGO_PREVIEW && (
              <S.ImgWrapper>
                <S.Img
                  src={LOGO_PREVIEW}
                  alt={this.props.alt}
                />
                {IS_EDITING && (
                  <S.BtnWrapper>
                    <InvertedPurlple
                      type="button"
                      onClick={this.onFileInputClick}
                    >Change Image</InvertedPurlple>
                    <InvertedRed
                      type="button"
                      onClick={this.handleFileChange}
                    >Delete Image</InvertedRed>
                  </S.BtnWrapper>
                )}
              </S.ImgWrapper>
            )
          }

          {IS_EDITING && !LOGO_PREVIEW && (
              <S.EmptyImg>
                <S.Text>
                  Drag and Drop your image here or&nbsp;
                  <S.Link onClick={this.onFileInputClick}>browse</S.Link>
                </S.Text>
                <S.SmallText>Only valid image formats (JPG, BMP, GIF &amp; PNG)</S.SmallText>
              </S.EmptyImg>
            )
          }

          {
            !IS_EDITING && !LOGO_PREVIEW && (
              <div>No Logo Image</div>
            )
          }

        </S.ImageContainer>
      </S.Wrapper>
    )
  }
}

const ImageForm = connect(ImageFormComponent);

export { ImageForm };
