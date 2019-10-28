import React from 'react';
import PropTypes from 'prop-types';
import { Group as StyledGroup } from './styled/Group'
import { withFormik, Form } from 'formik';
import { formSchema } from './schema';
import { Name } from './Name';
import { Row } from '@common/styled/Flex';
import { Button, FilledButton } from '@common/styled/Button';
import { Colors } from '@statics/Colors';
import { DancerList } from './DancerList';

const propTypes = {
  groupId: PropTypes.number,
  isEditting: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  user_ids: PropTypes.array.isRequired,
  onHeaderClick: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  dancers: PropTypes.array.isRequired,
  toggleDancerModal: PropTypes.func.isRequired,
};

const Group = (props) => {
  const {
    groupId,
    isEditting,
    active,
    touched,
    errors,
    values,
    name,
    user_ids,
    onHeaderClick,
    onSelectAllClick,
    onEditClick,
    onCancelClick,
    onDeleteClick,
    onRemoveClick,
    dancers,
    toggleDancerModal,
    isSubmitting,
    resetForm,
  } = props;
  const selectedDancers = dancers.filter(dancer => user_ids.includes(dancer.id));
  const onBackClick = isEditting
    ? () => { onCancelClick(); onHeaderClick(); }
    : () => { onHeaderClick() }
  return (
    <Form>
      <StyledGroup.Item>
        <StyledGroup.Header active={active}>
          <Name
            active={active}
            isEditting={isEditting}
            touched={touched.name}
            error={errors.name}
            value={isEditting ? values.name : name}
          />
          <StyledGroup.BackIcon onClick={onBackClick} />
        </StyledGroup.Header>
        <StyledGroup.Body>
          <Row justify={isEditting ? 'flex-end' : 'space-between'} width="100%" wrap="wrap" margin="0.5em 0">
            {!isEditting &&
              <Button type="button" onClick={onSelectAllClick}>
                Select All
              </Button>}
            {isEditting ? (
              <Row wrap="wrap">
                {groupId &&
                  <FilledButton type="button" fill={Colors.IndyWorkRed} onClick={onDeleteClick}>
                    Delete
                  </FilledButton>}
                <FilledButton type="submit" disabled={isSubmitting}>
                  Save
                </FilledButton>
                <Button type="button" onClick={() => { resetForm(); onCancelClick(); }}>
                  Cancel
                </Button>
              </Row>
            ) : (
              <Button type="button" onClick={onEditClick}>
                Edit
              </Button>
            )}
          </Row>
          <DancerList
            dancers={selectedDancers}
            isEditting={isEditting}
            onImageClick={toggleDancerModal}
            onNameClick={toggleDancerModal}
            onRemoveClick={onRemoveClick}
          />
        </StyledGroup.Body>
      </StyledGroup.Item>
    </Form>
  );
}

Group.propTypes = propTypes;

export const GroupForm = withFormik({
  enableReinitialize: false,
  mapPropsToValues(props) {
    return {
      name: props.name || '',
      user_ids: props.user_ids || [],
      ...props
    }
  },
  validationSchema(props) {
    return formSchema;
  },
  handleSubmit(props, { setSubmitting, resetForm }) {
    props.onSaveClick(props);
    setSubmitting(false);
    resetForm();
    props.onCancelClick();
  }
})(Group);