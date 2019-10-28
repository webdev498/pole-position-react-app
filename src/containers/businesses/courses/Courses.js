import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { orderCourses, updateCourseList } from './services';
import CoursesAside     from './aside/CourseAside';
import { InvertedPurlple } from '../../../components/common/FormikButtons/FormikButtonsStyled';
import { Content }      from '@common/styled/Content';
import { IndexCourses } from '@networking/CourseCalls';
import videoPlaceholder from '@assets/video-placeholder.png';
import { Scroll }       from '@common/styled/Scroll';
import {
  Course,
  CourseList,
  CourseDescription,
  CourseThumbnail,
  CourseTitle,
  CourseLink,
  CourseLinkSpan
} from './styled/courseList';
import { authTokenSelector } from '@selectors/Auth';
import { PageHeader } from '../../../components/common/PageHeader/PageHeader';
import { userSelector } from '../../../selectors/Auth';


class Courses extends PureComponent {
  static propTypes = {
    authToken: PropTypes.string.isRequired
  };

  state = {
    asideIsOpen: false,
    course: {},
    courses: []
  };

  componentDidMount() {
    this.fetchCourses();
  }

  updateCourse = (course={}) =>
    this.setState({
      courses: updateCourseList(this.state.courses, course)
    });

  fetchCourses = () =>
    IndexCourses({ authToken: this.props.authToken })
      .then(resp => this.setState({
        courses: orderCourses(resp.courses)
      }));


  deleteCourse = id => {
    this.setState({
      courses: this.state.courses.filter(course => course.id !== id),
      course: {},
      asideIsOpen: false,
    });
  };

  handleAsideOpen = bool => this.setState({ asideIsOpen: bool });

  selectCourse = course =>
    this.setState({
      course: this.state.course.id === course.id ? {} : course,
    });

  render() {
    const NEW_COURSE_BUTTON = (
      <InvertedPurlple
        onClick={this.handleAsideOpen.bind(null, true)}
      >{this.state.course.id ? 'Update' : 'New'} Course</InvertedPurlple>
    );

    return (
      <>
        <Content.Primary>
          <PageHeader
            title="Courses"
            RightSide={this.props.isAdmin ? NEW_COURSE_BUTTON : null}
          />
          <Scroll>
            <CourseList ScrollBar="#1D1F32">
              {
                this.state.courses.map(course => (
                  <Course
                    key={`course_${course.id}`}
                    active={course.id === this.state.course.id}
                    onClick={this.selectCourse.bind(null, course)}
                  >
                    <CourseLink href={course.youtube_url} target="_blank" rel="noopener noreferrer">
                      <CourseThumbnail
                        src={course.thumbnail || videoPlaceholder}
                        alt={course.title}
                      />
                      <CourseLinkSpan>Click To Play</CourseLinkSpan>
                    </CourseLink>
                    <div>
                      <CourseTitle>{course.title}</CourseTitle>
                      <CourseDescription>{course.description}</CourseDescription>
                    </div>
                  </Course>
                ))
              }
            </CourseList>
          </Scroll>
        </Content.Primary>
        <CoursesAside
          courseId={this.state.course.id}
          course={this.state.course}
          updateCourse={this.updateCourse}
          onDeleteCourse={this.deleteCourse}
          fetchCourses={this.fetchCourses}
          setCourse={this.selectCourse}
          isOpen={this.state.asideIsOpen}
          onClose={this.handleAsideOpen.bind(null, false)}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  authToken: authTokenSelector(state),
  isAdmin:  userSelector(state).admin
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Courses);
