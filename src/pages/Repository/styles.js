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

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border-color);

  a {
    align-self: flex-start;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--text-color);
    padding: 10px 0;
    font-weight: bold;

    svg {
      height: 20px;
      width: 20px;
      margin-right: 5px;
    }

    &:hover {
      color: silver;
    }
  }

  img {
    width: 100px;
    margin: 10px 0;
    border-radius: 50%;
  }

  p {
    text-align: center;
    line-height: 1.4;
  }
`;

export const IssueList = styled.ul`
  li {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid var(--border-color);

    & + li {
      margin-top: 10px;
    }

    img {
      align-self: flex-start;
      height: 40px;
      width: 40px;
      border-radius: 5px;
      border: 1px solid var(--border-color);
    }

    div {
      flex: 1;
      margin-left: 10px;
      display: flex;
      flex-direction: column-reverse;
      overflow-x: hidden;

      strong {
        font-size: 0.9rem;
        line-height: 1.5;

        a {
          text-decoration: none;
          color: var(--text-color);

          &:hover {
            color: gray;
          }
        }

        span {
          border: 1px solid var(--border-color);
          padding: 1px 4px;
          margin-left: 5px;
          border-radius: 2px;
          background-color: lightgray;
        }
      }
    }

    small {
      font-size: 0.8rem;
      color: var(--text-color);
    }
  }
`;

export const IssueFilter = styled.select`
  margin-bottom: 20px;
  background-color: white;
  border: 1px solid var(--border-color);
  border-radius: 2px;
  width: 80px;
  outline: none;
  padding: 2px 5px;
`;

export const Pagination = styled.div`
  margin-top: 20px;
  padding: 20px 0 10px 0;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;

  svg {
    cursor: pointer;
    height: 30px;
    width: 30px;
    border: 1px solid var(--border-color);
    border-radius: 2px;
    fill: gray;
    padding: 5px;
    transition: background-color 0.2s ease-out, fill 0.2s ease-out;

    &:hover {
      background-color: var(--black);
      fill: white;
    }

    &[disabled] {
      cursor: not-allowed;
      background-color: lightgray;

      &:hover {
        fill: gray;
      }
    }
  }
`;
