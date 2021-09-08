import styled from 'styled-components';
import { Container } from '@material-ui/core';

const FormContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .form-paper {
    padding: 15px 20px;
  }

  .text-field {
    margin-bottom: 20px;

    &:first-child {
      margin-top: 15px;
    }
  }

  .github-picker {
    border: none !important;
    box-shadow: none !important;
  }

  .repo-link-wrapper {
    margin-top: 20px;
    background-color: rgba(104, 178, 241, 0.82);
    border-radius: 7px;
    padding: 10px 15px;
    cursor: pointer;
  }
`;

export {FormContainer}