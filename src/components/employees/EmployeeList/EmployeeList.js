import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import ProfileExample                   from '@assets/user-placeholder-mask.png';
import * as T                           from './employeeListStyled';
import { InvertedPurlple, InvertedRed } from '../../common/FormikButtons/FormikButtonsStyled';
import { getDefaultLargeImage } from '../../../statics/Helpers';


const ManagerListPresenter = props => {
  return (
    <T.Table>
      <thead>
        <tr>
          <th />
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.managers.map((m, i) => (
          <tr key={i}>
            <td>
              <img
                src={getDefaultLargeImage(m.images) || ProfileExample}
                alt="Profile"
              />
            </td>
            <td>{m.name}</td>
            <td>
              <T.Row>
                <NavLink to={`/settings/employees/${m.id}`}>
                  <InvertedPurlple type="button">Edit</InvertedPurlple>
                </NavLink>
                <InvertedRed
                  type="button"
                  onClick={props.onDelete.bind(null, m.id)}
                >Delete</InvertedRed>
              </T.Row>
            </td>
          </tr>
        ))}
      </tbody>
    </T.Table>
  );
};

ManagerListPresenter.displayName = ManagerListPresenter.name;
ManagerListPresenter.propTypes = {
  managers: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ManagerListPresenter;
