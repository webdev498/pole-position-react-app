import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CourseForm             from './CourseForm';
import { UploadThumbnail }    from './UploadThumbnail';
import { FormThumbNail, Row } from '../styled/courseForm';
import { Content }            from '@common/styled/Content';
import { RightPane }          from '@common/RightPane';
import * as Calls             from '@networking/CourseCalls';
import videoIcon              from '@assets/video-icon.png';
import { Col }                from '@common/styled/Flex';
import { authTokenSelector } from '@selectors/Auth';

class CoursesAside extends Component {
  static propTypes = {
    authToken:      PropTypes.string.isRequired,
    course:         PropTypes.object.isRequired,
    isOpen:         PropTypes.bool.isRequired,

    onClose:        PropTypes.func.isRequired,
    fetchCourses:   PropTypes.func.isRequired,
    onDeleteCourse: PropTypes.func.isRequired,
    setCourse:      PropTypes.func.isRequired,
    updateCourse:   PropTypes.func.isRequired,
  };

  static defaultProps = {
    course: { id: null, title: '', description: '', youtube_url: '' }
  };

  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: true,

      file: null,
      photoPreview: videoIcon,
    };

    this.insertCourse  = this.insertCourse.bind(this);
    this.onPhotoChange = this.onPhotoChange.bind(this);
    this.deleteCourse  = this.deleteCourse.bind(this);
    this.updateCourse  = this.updateCourse.bind(this);
  }

  shouldComponentUpdate(nextProps, state) {
    if (nextProps.course.thumbnail !== this.props.course.thumbnail) {
      this.setState({photoPreview: nextProps.course.thumbnail || videoIcon});
      return true;
    }
    return true;
  }

  deleteCourse(id) {
    Calls.DeleteCourse({ authToken: this.props.authToken, id})
      .then(this.props.onDeleteCourse(id));
  }

  updateCourse(info) {
    Calls.UpdateCourse({
      authToken: this.props.authToken,
      course_id: this.props.course.id,
      params: {
        course: {
          title: info.title.trim(),
          description: info.description.trim(),
          youtube_url: info.url.trim(),
          industry_id: 1,
        }
      }
    })
      .then(({ course }) => {
        this.props.updateInvite(course);
        if (this.state.file) {
          return Calls.UpdateCoursePhoto({
            authToken: this.props.authToken,
            course_id: this.props.course.id,
            photo_file: this.state.file
          }).then(({ course }) => this.props.updateInvite(course));
        }
      })
      .finally(() => {
        this.props.onClose();
        this.setState({
          file: null,
          photoPreview: videoIcon,
        });
      })
  }

  insertCourse(info) {
    Calls.InsertCourse({
      authToken: this.props.authToken,
      params: {
        course: {
          title: info.title.trim(),
          description: info.description.trim(),
          youtube_url: info.url.trim(),
          industry_id: 1,
        }
      }
    })
      .then(data =>
        Calls.UpdateCoursePhoto({
          authToken: this.props.authToken,
          course_id: data.course.id,
          photo_file: this.state.file
        })
      )
      .then(this.props.fetchCourses)
      .then(this.props.onClose())
      .then(this.props.setInvite({id: null}));
  }

  onPhotoChange(event) {
    const file = event.currentTarget.files[0];
    if (file && file.type.startsWith('image')) {
      this.setState({ file });
      let reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ photoPreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  render() {
    return (
      <Content.Secondary show={this.props.isOpen} key={this.props.courseId}>
        <RightPane
          title={`${this.props.course.id ? 'Update' : 'New'} Course`}
          onCloseButtonClick={this.props.onClose}
        >
          <Row justify="space-evenly" wrap="wrap">
            <Col width="100%" margin="0 1em" align="stretch">
              <Row margin="0 1em">
                <FormThumbNail
                  src={ this.state.photoPreview }
                  alt="Course photo"
                />
                <UploadThumbnail onChange={this.onPhotoChange} />
              </Row>
            </Col>
          </Row>
          <Row justify="space-evenly" wrap="wrap">
            <Col width="100%" margin="0 1em" align="stretch">
              <CourseForm
                onUpdate={this.updateCourse}
                onDelete={this.deleteCourse}
                onClose={this.props.onClose}
                onSubmit={this.insertCourse}
                isSubmitting={this.state.isSubmitting}
                course={this.props.course}
              />
            </Col>
          </Row>
        </RightPane>
      </Content.Secondary>
    );
  }
}

const mapStateToProps = state => ({
  authToken: authTokenSelector(state),
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesAside);
