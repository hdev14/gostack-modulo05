import styled, { css } from 'styled-components';

import loading from '../../styles/animations/loading';

export const Form = styled.form`
  display: flex;
  align-items: center;

  input {
    flex: 1;
    color: ${props =>
      props.error ? 'rgba(255, 0, 0, 0.7)' : 'var(--text-color)'};
    border: 1px solid ${props => (props.error ? 'red' : 'silver')};
    border-radius: 5px;
    padding: 10px 15px;
    outline: none;
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  padding: 10px;
  margin-left: 10px;
  background-color: var(--black);
  border: 0;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;

    svg {
      animation: ${loading} 2s linear infinite;
    }
  }
`;

export const List = styled.ul`
  list-style: none;
  margin: 20px 0;
  border: 1px solid var(--border-color);
  padding: 10px;
  border-radius: 5px;
  display: ${props => !props.repo && 'none'};

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      text-decoration: none;
      color: var(--text-color);
      padding: 5px 10px;
      border: 1px solid var(--border-color);
      border-radius: 3px;
      transition: color 0.2s ease-out, background-color 0.2s ease-out;

      &:hover {
        border-color: var(--black);
        color: white;
        background-color: var(--black);
      }
    }
  }
`;

export const Alert = styled.span`
  display: block;
  margin-top: 10px;
  border-radius: 5px;
  width: 100%;
  background-color: lightyellow;
  padding: 5px 10px;
  color: #555;
  font-size: 0.8rem;
`;
