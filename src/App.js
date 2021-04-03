import React from 'react';

import {Switch, BrowserRouter as Router, Route} from "react-router-dom";
import {connect} from "react-redux";
import {AmplifyAuthenticator, AmplifySignIn, AmplifySignOut, AmplifySignUp } from '@aws-amplify/ui-react';

// Import Routes all
import {userRoutes, authRoutes} from "./routes/allRoutes";

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware";

// layouts Format
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import scss
import "./assets/scss/theme.scss";

import fakeBackend from './helpers/AuthType/fakeBackend';


const App = (props) => {

  function getLayout() {
    let layoutCls = VerticalLayout;

    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  };

  const Layout = VerticalLayout;

  const NonAuthmiddleware = ({component: Component, layout: Layout}) => (<Route render={props => {
      return (<Layout>
        <Component {...props}/>
      </Layout>);
    }}/>);

  return (<React.Fragment>
    <AmplifyAuthenticator usernameAlias="email">
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={[
          {
            type: "email",
            label: "Email Address",
            placeholder: "email",
            required: true,
            displayOrder: 1
          },
          {
            type: "given_name",
            label: "First Name",
            placeholder: "first name",
            required: true,
            displayOrder: 2
          },
          {
            type: "family_name",
            label: "Last Name",
            placeholder: "last name",
            required: true,
            displayOrder: 3
          },
          {
            type: "password",
            label: "Password",
            placeholder: "password",
            required: true,
            displayOrder: 4
          },
        ]}
        />
      <AmplifySignIn slot="sign-in" usernameAlias="email" />
      <Router>
        <Switch>
          {userRoutes.map((route, idx) => (<Authmiddleware path={route.path} layout={Layout} component={route.component} key={idx}/>))}
        </Switch>
      </Router>
    </AmplifyAuthenticator>
  </React.Fragment>);
}

const mapStateToProps = state => {
  return {layout: state.Layout};
};

export default connect(mapStateToProps, null)(App);
