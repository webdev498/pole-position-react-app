import React from 'react';

import { InputWrapper, Row, Half } from './styled/DetailsStyled';
import { ImageForm }               from '../../common/ImageForm';
import { FormikDropDown }          from '../../common/Fields/DropDown/FormikDropdown';
import { FormikTextInput }         from '../../common/Fields/TextInput/TextInput-presenter';
import { US_STATES }               from '../../../constants';

const Details = () => {
  return (
    <>
      <Row>
        <Half>
          <InputWrapper>
            <FormikTextInput
              field="name"
              label="Club Name"
            />
          </InputWrapper>
          <InputWrapper>
            <FormikTextInput
              field="street1"
              label="Address"
              placeholder="Address line 1"
            />

            <FormikTextInput
              field="street2"
              placeholder="Address line 2"
            />
          </InputWrapper>
        </Half>
        <Half>
          <ImageForm
            alt="Profile Image"
            label="Profile Image"
          />
        </Half>
      </Row>
      <Row>
        <Half>
          <InputWrapper>
            <FormikTextInput
              field="city"
              label="City"
            />
          </InputWrapper>
        </Half>
        <Half>
          <Row>
            <Half>
              <FormikDropDown
                field="state"
                label="State"
                defaultValue={{ value: '', label: 'State' }}
                collection={US_STATES}
              />
            </Half>
            <Half>
              <FormikTextInput
                field="zip"
                label="Zip Code"
              />
            </Half>
          </Row>
        </Half>
      </Row>
      <Row>
        <Half>
          <InputWrapper>
            <FormikTextInput
              field="url"
              label="Club's Website"
            />
          </InputWrapper>
        </Half>
        <Half>
          <Row>
            <Half>
              <InputWrapper>
                <FormikTextInput
                  field="phone_number"
                  label="Phone Number"
                />
              </InputWrapper>
            </Half>
            <Half>
              <InputWrapper>
                <FormikTextInput
                  field="square_footage"
                  label="Square Footage"
                />
              </InputWrapper>
            </Half>
          </Row>
        </Half>
      </Row>
    </>
  );
};

export { Details };
