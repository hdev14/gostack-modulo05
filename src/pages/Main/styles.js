import styled from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 30px auto;
  padding: 20px 30px;

  h1 {
    font-size: 1.8rem;
    padding: 10px 0;
    display: flex;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  align-items: center;

  input {
    flex: 1;
    border: 1px solid silver;
    border-radius: 5px;
    padding: 10px 15px;
    outline: none;
  }
`;

export const SubmitButton = styled.button`
  padding: 10px;
  margin-left: 10px;
  background-color: var(--black);
  border: 0;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
