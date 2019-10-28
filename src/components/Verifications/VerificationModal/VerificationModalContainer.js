import { connect } from 'react-redux';
import { getVerificationById } from '@selectors/Verifications';
import { ModalVerification } from '@components/Verifications/VerificationModal/VerificationModalPresenter';
import { authTokenSelector } from '@selectors/Auth';

const mapStateToProps = (state, { id }) => {
  const { image, user } = getVerificationById(state, id);

  return {
    isVisible: !!id,
    userId: user.id,
    image: image.medium,
    userImages: user.images,
    userName: user.name,
    verification: getVerificationById(state, id),
    authToken: authTokenSelector(state)
  };
};

export default connect(
  mapStateToProps,
)(ModalVerification);
