import React from 'react';
import { connect, getIn } from 'formik';

import { Select, Option }   from './DropDown/styled';
import * as S               from './styled/HoursOfOperation';
import { InputLabelStyled } from './styled/InputLabelStyled';
import { OPERATION_TIMES }  from '../../../constants';

const HoursOfOperation = connect(props => {
  const FORMIK     = getIn(props.formik);
  const DATA       = FORMIK.values.hours_of_operation;
  const IS_EDITING = FORMIK.values.isEditing;

  const handleUpdate = (openOrClose, fullDay, e) => {
    const IS_CLOSED = e.target.value === '';
    FORMIK.setFieldValue(`hours_of_operation.${fullDay}.closed`, IS_CLOSED);
    FORMIK.setFieldTouched(true);
    if (IS_CLOSED) {
      FORMIK.setFieldValue(`hours_of_operation.${fullDay}.open`, OPERATION_TIMES[0].value);
      FORMIK.setFieldValue(`hours_of_operation.${fullDay}.close`, OPERATION_TIMES[0].value);
    } else {
      FORMIK.setFieldValue(`hours_of_operation.${fullDay}.${openOrClose}`, e.target.value);
    }
  };

  const SORTED_DAYS = Object.keys(DATA).sort((a, b) => DATA[a].day - DATA[b].day);

  return (
    <S.Wrapper>
      <InputLabelStyled isActive={IS_EDITING}>Opening hours</InputLabelStyled>
      <S.Row>
        {
          SORTED_DAYS.map(fullDay => {
            const DAY = DATA[fullDay];
            const SHORT = fullDay.substr(0, 3);
            const IS_CLOSED = DAY ? DAY.closed : true;


            return (
              <div key={fullDay}>
                <S.Label>{SHORT}</S.Label>

                {
                  ['open', 'close'].map(pos => {
                    const ID = `${pos}_${SHORT}`;
                      return IS_CLOSED && pos === 'close' ? null : (
                        <Select
                          key={ID}
                          id={ID}
                          name={ID}
                          disabled={!IS_EDITING}
                          value={IS_CLOSED ? '' : DAY[pos]}
                          onChange={handleUpdate.bind(null, pos, fullDay)}
                        >
                          <Option value="">Closed</Option>

                          {
                            OPERATION_TIMES.map((item, index) => (
                              <Option
                                key={index}
                                value={item.value}
                              >{item.label}</Option>
                            ))
                          }
                        </Select>
                      );
                    }
                  )
                }
              </div>
            );
          })
        }
      </S.Row>
    </S.Wrapper>
  );
});

HoursOfOperation.displayName = HoursOfOperation.name;

export { HoursOfOperation };
