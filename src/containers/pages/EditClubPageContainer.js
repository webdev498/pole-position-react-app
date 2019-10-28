import { connect } from 'react-redux';
import * as Yup from 'yup';
import { withFormik } from 'formik';

import { updateBusiness, updateBusinessPhoto }       from '@actions/ApiRequests/Business';
import { setBusinessInfo }                           from '@actions/Business';
import { setEmployeeList }                           from '@actions/Employees';
import defaultBusinessPic                            from '@assets/user-placeholder-mask.png';
import EditClubPage                                  from '@components/ClubSettings/EditClubPage';
import { ClubProps }                                 from '@components/ClubSettings/default-props';
import { userSelector, authTokenSelector }           from '@selectors/Auth';
import { createDataSelector }                        from '@selectors/';
import { GET_OWNERS }                                from '@actions/types';
import { getOwners }                                 from '@actions/ApiRequests/Users';
import { businessSelector }                          from '@selectors/Business';
import { Schema }                                    from '@selectors/Schemas';
import { parseHours, setHours }                      from '@selectors/fieldSelectors';
import { getDefaultLargeImage, bindActionToPromise } from '@statics/Helpers';

const ownersDataSelector = createDataSelector(GET_OWNERS);

const mapStateToProps = state => {
  const user = userSelector(state);
  const business = businessSelector(state);
  return ({
    business,
    authToken: authTokenSelector(state),
    isAdmin: user.admin || (user.id === business.owner.id),
    owners: ownersDataSelector(state) || [],
  });
};

const mapDispatchToProps = dispatch => ({
  setBusinessInfo: info => dispatch(setBusinessInfo(info)),
  setEmployeeList: list => dispatch(setEmployeeList(list)),
  updateBusiness: bindActionToPromise(dispatch, updateBusiness),
  updateBusinessPhoto: bindActionToPromise(dispatch, updateBusinessPhoto),
  getOwners: (authToken) => dispatch(getOwners(authToken)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFormik({
  enableReinitialize: true,
  mapPropsToValues(props) {
    return {
      name: props.business.name || ClubProps.name,
      notes: props.business.notes || ClubProps.notes,
      street1: props.business.street1 || ClubProps.street1,
      street2: props.business.street2 || ClubProps.street2,
      city: props.business.city || ClubProps.city,
      state: props.business.state || ClubProps.state,
      zip: props.business.zip || ClubProps.zip,
      url: props.business.url || ClubProps.url,
      logo_file: null,
      logo_preview: getDefaultLargeImage(props.business.images) || defaultBusinessPic,
      phone_number: props.business.phone_number || ClubProps.phone_number,
      square_footage: props.business.square_footage || ClubProps.square_footage,
      hours_of_operation: (props.business.hours ||  []).length > 0 ? parseHours(props.business.hours) : ClubProps.hours_of_operation,
      required_documents: props.business.required_documents || ClubProps.required_documents,
      profile_options: props.business.profile_options || ClubProps.profile_options,

      owners: props.owners,
      owner_id: props.business.owner.id || ClubProps.owner_id,
      owner_name: ClubProps.owner_name,
      owner_email: ClubProps.owner_email,
      owner_password: ClubProps.owner_password,
      owner_password_confirmation: ClubProps.owner_password_confirmation,

      special_requirements: props.business.special_requirements || ClubProps.special_requirements,
      special_requirements_link: props.business.special_requirements_link || ClubProps.special_requirements_link,

      isEditing: false,
      isCreatingNewOwner: false,
    };
  },
  validationSchema(props) {
    return Yup.object().shape({
      name: Schema.name,
      notes: Schema.notes,
      street1: Schema.street1,
      street2: Schema.street2,
      city: Schema.city,
      state: Schema.state,
      zip: Schema.zip,
      phone_number: Schema.phone_number,
      hours_of_operation: Schema.hours_of_operation,
      square_footage: Schema.square_footage,
      owner_id: Schema.owner_id,
      owner_email: Schema.owner_email,
      owner_name: Schema.owner_name,
      owner_password: Schema.owner_password,
      owner_password_confirmation: Schema.owner_password_confirmation,
      special_requirements: Schema.special_requirements,
      special_requirements_link: Schema.special_requirements_link,
      url: Schema.url,
    });
  },
  handleSubmit(values, formik) {
    if (values.logo_file) this.updateClubPhoto(values, formik);
    this.saveClubSettings(values, formik);
  },
  updateClubPhoto(values, formik) {
    formik.props.updateBusinessPhoto({
      authToken: formik.props.authToken,
      business_id: formik.props.business.id,
      photo_file: values.logo_file,
    }).then(business => formik.props.setBusinessInfo(business))
      .catch(error => {
        console.log(error);
        formik.setStatus('An error occurred uploading the image');
      });
  },
  saveClubSettings(values, formik) {
    const {
      name,
      notes,
      street1,
      street2,
      city,
      state,
      zip,
      phone_number,
      square_footage,
      hours_of_operation,
      required_documents,
      profile_options,
      owner_id,
      owner_email,
      owner_name,
      owner_password,
      owner_password_confirmation,
      isCreatingNewOwner,
    } = values;

    const business = {
      id: formik.props.business.id,
      name,
      notes,
      street1,
      street2,
      city,
      state,
      zip,
      phone_number,
      square_footage,
      hours_attributes: setHours(hours_of_operation),
      required_documents,
      profile_option_ids: profile_options.filter(opt => opt.selected).map(opt => opt.id)
    }

    if (isCreatingNewOwner) {
      business.owner_attributes = {
        name: owner_name,
        email: owner_email,
        password: owner_password,
        password_confirmation: owner_password_confirmation,
      };
    } else {
      business.owner_attributes = {
        id: owner_id
      };
    }

    formik.props.updateBusiness({
      authToken: formik.props.authToken,
      business,
    }).then(business => {
        formik.props.setBusinessInfo(business);
        formik.setFieldValue('isEditing', false);
      })
      .catch(error => {
        console.log(error);
        formik.setStatus('An error occurred updating the settings')
      })
      .finally(() => formik.setSubmitting(false));
  }
})(EditClubPage));
