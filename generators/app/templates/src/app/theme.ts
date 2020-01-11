import 'semantic-ui-css/semantic.min.css';
import styled from 'styled-components';

import palette from 'app/palette';

const Theme = styled.div`
  *,
  .ui.card>.content,
  .ui.button {
    font-family: 'Open-Sans', sans-serif;
    color: ${palette.BLACK};
  }
  .ui.primary.button,
  .ui.primary.buttons .button {
    background-color: ${palette.BLACK};
    color: ${palette.WHITE};
  }
  .ui.primary.button:hover,
  .ui.primary.buttons .button:hover {
    background-color: ${palette.GRAY};
  }

  .ui.primary.button .icon,
  .ui.primary.buttons .button .icon {
    color: ${palette.WHITE};
  }

  h1, h2, h3, h4, h5,
  .ui.card>.content>.header,
  .ui.message .header,
  .header {
    font-family: 'Open-Sans', sans-serif;
    color: ${palette.BLACK};
  }

  .ui.card .meta {
    color: ${palette.GRAY};
  }

  a,
  .anchor {
    cursor: pointer;
    color: ${palette.BLACK};
    text-decoration: none;
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: inline;
    margin: 0;
    padding: 0;
  }

  a:hover,
  .anchor:hover {
    color: ${palette.GRAY};
  }
`;

export default Theme;
