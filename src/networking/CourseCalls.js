import { APIConstants } from '@statics/Constants.js';
import { BuildJsonRequest } from './RequestBuilder.js';
import { BuildFormRequest } from './RequestBuilder';

export const IndexCourses = ({ authToken = null, params = {} }) => {
  const url = `${APIConstants.base_api_url}courses/`;
  return BuildJsonRequest({
    authToken,
    url,
    method: 'GET',
    params
  });
};

export const InsertCourse = ({ authToken = null, params = {} }) => {
  const url = `${APIConstants.base_api_url}courses/`;

  return BuildJsonRequest({
    method: 'POST',
    authToken,
    url,
    params
  });
};

export const UpdateCourse = ({
  authToken = null,
  course_id = null,
  params = {}
}) => {
  const url  = `${APIConstants.base_api_url}courses/${course_id}`;
  return BuildJsonRequest({
    method: 'PUT',
    authToken,
    url,
    params
  });
};


export const UpdateCoursePhoto = ({
  authToken = null,
  course_id = null,
  photo_file = null
}) => {
  if (!photo_file) return Promise.resolve();
  const url  = `${APIConstants.base_api_url}courses/${course_id}/thumbnail`;
  const body = new FormData();
  body.append('course[thumbnail]', photo_file);

  return BuildFormRequest({
    method: 'PUT',
    authToken,
    url,
    body
  });
};

export const DeleteCourse = ({ authToken = null, id }) => {
  const url = `${APIConstants.base_api_url}courses/${id}`;
  return BuildJsonRequest({
    method: 'DELETE',
    authToken,
    url
  });
};
