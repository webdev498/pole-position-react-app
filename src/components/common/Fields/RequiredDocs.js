import React              from 'react';
import { connect, getIn } from 'formik';

import { InputLabelStyled} from './styled/InputLabelStyled';
import * as S              from './styled/CheckBoxFields';
import { REQUIRED_DOCS }   from '../../../constants';

const RequiredDocs = connect(props => {
  const FORMIK = getIn(props.formik);
  const IS_EDITING = FORMIK.values.isEditing;
  const OPTIONS = FORMIK.values.required_documents;

  const handleChange = e => {
    const VALUE = e.target.value;
    const INDEX = OPTIONS.indexOf(VALUE);

    const NEW_OPTIONS = INDEX >= 0
      ? OPTIONS.slice(0, INDEX).concat(OPTIONS.slice(INDEX + 1))
      : OPTIONS.concat([VALUE]);

    FORMIK.setFieldTouched(true);
    FORMIK.setFieldValue('required_documents', NEW_OPTIONS);
  };

  return (
    <S.Wrapper>
      <InputLabelStyled isActive={IS_EDITING}>Required Docs</InputLabelStyled>
      {
        REQUIRED_DOCS.map((doc, i) => {
          return (
            <S.Label
              key={`feature_${i}`}
              htmlFor={`document_${i}`}
              isActive={IS_EDITING}
            >{doc}
              <S.Checkbox
                type="checkbox"
                id={`document_${i}`}
                value={doc}
                disabled={!IS_EDITING}
                checked={OPTIONS.includes(doc)}
                onChange={handleChange}
              /><S.CheckMark className="checkmark" isActive={IS_EDITING} />
            </S.Label>
          )
        })
      }
    </S.Wrapper>
  )
});

export { RequiredDocs };
