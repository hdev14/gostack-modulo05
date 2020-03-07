import styled from 'styled-components';

const Container = styled.div`
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

export default Container;
