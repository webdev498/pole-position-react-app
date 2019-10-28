import React from 'react'
import PropTypes from 'prop-types'
import { Form, withFormik } from 'formik'

import { Name } from '../Fields/Name'
import { DancerList } from '@common/DancerList'
import { formSchema } from './schema'
import { ViewLayoutConstants } from '@statics/Constants'
import * as Btn from '@common/styled/Buttons'
import * as S from './styled'

class AddToGroupFormWithoutFormik extends React.Component {
  static propTypes = {
    entertainers: PropTypes.array.isRequired,
    groups: PropTypes.array.isRequired,
    toggleDancerModal: PropTypes.func.isRequired,
    onCancelClick: PropTypes.func.isRequired,
    onSaveClick: PropTypes.func.isRequired,
    onRemoveClick: PropTypes.func,
  }

  render() {
    const {
      entertainers,
      groups,
      toggleDancerModal,
      onCancelClick,
      onRemoveClick,
      touched,
      errors,
      values,
      isSubmitting,
      setFieldValue,
    } = this.props;
    return (
      <Form>
        <S.Grid>
          <S.TitleArea>
            Add to Group
          </S.TitleArea>
          <S.NameArea>
            <Name
              isEditting={true}
              touched={touched.name}
              error={errors.name}
              value={values.name}
              onChange={val => setFieldValue('name', val)}
              groups={groups}
            />
          </S.NameArea>
          <S.EntertainersArea>
            <DancerList
              viewLayout={ViewLayoutConstants.GRID}
              pageSize={6}
              dancers={entertainers}
              photoSizeInPx={150}
              isAdmin={false}
              isSelectable={false}
              onViewProfileClick={toggleDancerModal}
              showMoreMenu={false}
              onRemoveClick={onRemoveClick}
            />
          </S.EntertainersArea>
          <S.ActionsArea>
            <Btn.Green.Filled
              type="submit"
              disabled={isSubmitting}
            >
              SAVE
            </Btn.Green.Filled>
            <Btn.Red
              onClick={onCancelClick}
            >
              CANCEL
            </Btn.Red>
          </S.ActionsArea>
        </S.Grid>
      </Form>
    )
  }
}

export const AddToGroupForm = withFormik({
  enableReinitialize: false,
  mapPropsToValues(props) {
    return {
      ...props,
      name: props.name || '',
    }
  },
  validationSchema(props) {
    return formSchema;
  },
  handleSubmit(props, { setSubmitting, resetForm }) {
    props.onSaveClick(props.name);
    setSubmitting(false);
    resetForm();
    props.onCancelClick();
  }
})(AddToGroupFormWithoutFormik);