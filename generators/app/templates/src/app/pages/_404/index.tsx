import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import Template from 'app/templates/LightCentered';

const Page404: React.FC = () => (
  <Template>
    <p>Sorry! That page was not found.</p>
    <p>
      <Link to={`/`}>
        <Button primary>
          Back to Home
        </Button>
      </Link>
    </p>
  </Template>
);

export default Page404;
