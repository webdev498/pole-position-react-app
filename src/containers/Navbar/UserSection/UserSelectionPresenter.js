import React     from 'react';
import PropTypes from 'prop-types';

import * as DropDown from '@common/DropDownMenu';
import * as S from './styled';

const UserSection = props => {
  return (
    <S.Container>
      <DropDown.Text text={`Hi, ${props.name}`} right>
        <li onClick={props.logOut}>Log Out</li>
        <li>
          <S.Link to={`/users/${props.id}/edit`}>Profile</S.Link>
        </li>
      </DropDown.Text>
      <img
        src={props.image}
        alt={props.name}
      />
    </S.Container>
  );
};

UserSection.displayName = UserSection.name;

UserSection.propTypes = {
  id:     PropTypes.number.isRequired,
  name:   PropTypes.string.isRequired,
  image:  PropTypes.string.isRequired,
  logOut: PropTypes.func.isRequired,
};

export { UserSection };
