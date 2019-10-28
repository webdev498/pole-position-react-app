import React from 'react';
import PropTypes from 'prop-types';

import ProfileExample from '@assets/user-placeholder-mask.png';
import * as S from './VerificationListStyled';

const ZERO_VERIFICATIONS = (
  <tr>
    <td colSpan="3">
      <S.Heading>No Pending Verifications</S.Heading>
    </td>
  </tr>
);
const IS_LOADING = (
  <>
    {Array(10).fill(1).map((a, i) =>
      <S.LoadingBlockWrapper key={i}>
        {i % 2 ? <S.LoadingBlock colSpan={3} /> : <S.LoadingSpace colSpan={3} />}
      </S.LoadingBlockWrapper>
    )}
  </>
);

const VerificationListPresenter = ({ verifications, handleClick, isLoading }) => {
  return (
    <S.Table>
      <thead>
        <tr>
          <th />
          <th>Name</th>
          <th>Sentence</th>
        </tr>
      </thead>
      <tbody>
        {isLoading
          ? IS_LOADING
          : verifications.length === 0
            ? ZERO_VERIFICATIONS
            : verifications.map((m, i) => (
              <tr key={i} onClick={handleClick.bind(null, m.id) }>
                <td>
                  <img
                    src={m.image ? m.image.thumb : ProfileExample}
                    alt="Verification"
                  />
                </td>
                <td>{m.user.name}</td>
                <td>
                  {m.sentence}
                </td>
              </tr>
            ))}
      </tbody>
    </S.Table>
  );
};

VerificationListPresenter.displayName = VerificationListPresenter.name;
VerificationListPresenter.propTypes = {
  verifications: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default VerificationListPresenter;
