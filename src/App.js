import React from 'react';

import {Switch, BrowserRouter as Router, Route} from "react-router-dom";
import {connect} from "react-redux";
import {AmplifyAuthenticator, AmplifySignIn, AmplifySignUp, AmplifyConfirmSignUp } from '@aws-amplify/ui-react';

// Import Routes all
import {userRoutes} from "./routes/allRoutes";

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware";

// layouts Format
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";

// Import scss
import "./assets/scss/theme.scss";


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
    <AmplifyAuthenticator >
      <AmplifySignUp
        slot="sign-up"
        username-alias="username"
        formFields={[
          {
            type: "username",
            key: "username",
            label: "Username",
            placeholder: "username",
            required: true,
            displayOrder: 1
          },
          {
            type: "given_name",
            key: "given_name",
            label: "First Name",
            placeholder: "first name",
            required: true,
            displayOrder: 2
          },
          {
            type: "family_name",
            key: "family_name",
            label: "Last Name",
            placeholder: "last name",
            required: true,
            displayOrder: 3
          },
          {
            type: "password",
            key: "password",
            label: "Password",
            placeholder: "password",
            required: true,
            displayOrder: 4
          },
          {
            type: "locale",
            key: "locale",
            label: "Language",
            placeholder: "language",
            required: true,
            displayOrder: 5
          },
          {
            type: "custom:systemID",
            key: "custom:systemID",
            label: "Hotel ID",
            placeholder: "hotel id",
            required: true,
            displayOrder: 5
          },
          {
            key: "phone_number",
            type: "phone_number",
            label: "Phone Number",
            placeholder: "Phone Number",
            required: true,
            displayOrder: 6
          }
        ]}
        />
      <AmplifyConfirmSignUp
        slot="confirm-sign-up"/>
      <AmplifySignIn slot="sign-in" />
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
