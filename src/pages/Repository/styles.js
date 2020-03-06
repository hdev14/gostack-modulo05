import styled from 'styled-components';

import loading from '../../styles/animations/loading';

export const Loading = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: gray;
  font-size: 1rem;

  svg {
    margin-bottom: 10px;
    fill: gray;
    height: 60px;
    width: 60px;
    animation: ${loading} 2s linear infinite;
  }
`;

export const Owner = styled.header``;
