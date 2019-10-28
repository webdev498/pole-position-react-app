import React from 'react';
import { connect, getIn } from 'formik';

import { InputLabelStyled } from './styled/InputLabelStyled';
import * as S               from './styled/CheckBoxFields';

const ClubFeatures = connect(props => {
  const FORMIK = getIn(props.formik);
  const IS_EDITING = FORMIK.values.isEditing;
  const OPTIONS = FORMIK.values.profile_options;

  const handleChange = e => {
    const INDEX = e.target.value;
    OPTIONS[INDEX].selected = !OPTIONS[INDEX].selected;
    FORMIK.setFieldTouched(true);
    FORMIK.setFieldValue('business.profile_options', OPTIONS);
  };

  return (
    <S.Wrapper>
      <InputLabelStyled isActive={IS_EDITING}>Club Features</InputLabelStyled>
      {
        OPTIONS.map((opt, i) => {
          return (
            <S.Label
              key={`feature_${i}`}
              htmlFor={`feature_${opt.id}`}
              isActive={IS_EDITING} >{opt.name}
              <S.Checkbox
                type="checkbox"
                id={`feature_${opt.id}`}
                value={i}
                disabled={!IS_EDITING}
                checked={opt.selected}
                onChange={handleChange}
              /><S.CheckMark className="checkmark" isActive={IS_EDITING} />
            </S.Label>
          )
        })
      }
    </S.Wrapper>
  )
});


export { ClubFeatures }
