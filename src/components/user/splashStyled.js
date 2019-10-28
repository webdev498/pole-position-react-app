import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form } from 'formik';

import { Colors } from '@statics/Colors';
import IMG from '@assets/splash-template.png';

export const SplashPage = styled.main`
  background-image: url(${IMG});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  text-align: center;
  color: ${Colors.IndyWorkWhite_S};
  padding-top: 4rem;
`;

export const Logo = styled.img`
  margin-bottom: 20px;
  width: 235px;
  @media (min-width: 720px) {
    padding-top: 10%;
  }
`;

export const UserForm = styled(Form)`
  max-width: 340px;
  width: 340px;
  padding-top: 10px;
`;

export const SubmitButton = styled.button`
  margin-top: 48px;
  background-color: ${Colors.WorkerPink};
  border: 0;
  border-radius: 25px;
  color: ${Colors.IndyWorkWhite_S};
  padding: 14px 32px;
  text-align: center;
  text-decoration: none;
  width: 100%;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;
  font-weight: bold;
  :hover {
    background-color: ${Colors.IndyWorkWhite_S};
    color: ${Colors.WorkerPink};
  }

  :disabled {
    cursor: not-allowed;
    background-color: ${Colors.WorkerPink_d};
    color: ${Colors.IndyWorkGray_d};
  }
`;

export const InputLabel = styled.label`
  color: ${Colors.IndyWorkBlack_l};
  font-weight: normal;
  text-align: left;
`;

export const TextInput = styled.input`
  height: 32px;
  margin-bottom: 10px;
  border-width: 0 0 1px 0;
  border-radius: 0;
  background: transparent;
  color: ${Colors.IndyWorkWhite_S};
  border-color: rgb(107, 156, 219);
  -webkit-text-fill-color: ${Colors.IndyWorkWhite_S};

  :focus,
  :active,
  :hover {
    border-color: ${Colors.IndyWorkWhite_S};
    border-width: 0 0 2px 0;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .error {
    border-color: ${Colors.IndyWorkWhite_S};
  }
`;

export const ActiveLink = styled(Link)`
  font-weight: bold;
  color: ${Colors.WorkerPink};
  margin-top: 40px;
  display: block;
`;

export const Legal = styled.div`
  padding: 35px 0;
  flex: 1 0;
  display: flex;
  align-items: flex-end;
`;

export const LegalLink = styled(Link)`
  color: ${Colors.IndyWorkBlack_l};
  :nth-child(2) {
    margin: 0 4rem;
  }
`;

export const ErrorMsg = styled.div`
  color: ${Colors.IndyWorkWhite_S};
`;
