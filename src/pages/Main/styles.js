import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 2rem;
  color: green;

  span {
    display: ${props => (props.error ? 'inline-block' : 'none')};
    color: #ff0000;
  }
`;
