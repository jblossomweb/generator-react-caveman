import React from 'react';
import Template from 'app/templates/LightCentered';
import * as Style from './HomePage.style';

export interface StateProps {
  imgSrc: string,
};

export interface DispatchProps {
  //
};

export type Props = StateProps & DispatchProps;

const HomePage: React.FC<Props> = ({
  imgSrc,
}) => (
  <Template>
    <Style.Wrapper>
      <h1><%= appName %></h1>
      <img src={imgSrc} alt={"<%= appName %>"} />
      <p>
        <%= appDesc %>
      </p>
    </Style.Wrapper>
  </Template>
);

export default HomePage;
