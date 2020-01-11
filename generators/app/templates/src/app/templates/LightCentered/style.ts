import { rem } from 'polished';
import styled from 'styled-components';

import palette from 'app/palette';

export const Wrapper = styled.div`
  text-align: center;
  img {
    max-width: 70vw;
    max-height: 60vh;
  }
  h4 {
    font-size: calc(${rem(10)} + 2vmin);
    width: 70vw;
  }
  p {
    font-size: calc(${rem(8)} + 1vmin);
    width: 70vw;
  }
`;

export const Header = styled.header`
  background-color: ${palette.white};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(${rem(10)} + 2vmin);
  color: ${palette.dark};
`;
