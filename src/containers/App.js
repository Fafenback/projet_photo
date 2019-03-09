import React, { useState, useEffect, useContext } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Route from 'react-router-dom/Route';
import withRouter from 'react-router-dom/withRouter';
import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';

import { Container } from 'semantic-ui-react';
import routes from '../routes';
import Header from '../components/Header';
import BottomNavbar from '../components/BottomNavbar';
import Fade from '../styled/Fade';
import { AppContext } from '../contexts/AppContext';


const StyledContainer = styled(Container)`
@media only screen and (max-width: 767px) {
  &&{
  margin: 0px !important;
  overflow: hidden;
  height: 100%;
  background: linear-gradient(to right bottom, ${(props) => props.theme.primary}, ${(props) => props.theme.secondary} 150%);
  ${(props) => props.isloginpage === 'false' && { background: props.theme.whitePink }}
  }
}
  & {
  margin: 0px !important;
  overflow: hidden;
  height: 100%;
  background: linear-gradient(to left top, ${(props) => props.theme.primary}, ${(props) => props.theme.secondary} 150%);
  }
`;

const App = (props) => {
  const { location: { pathname } } = props;
  const [isLoginPage, checkLoginPage] = useState('true');
  const { state } = useContext(AppContext);

  //protect routes if no user is connected
  if (pathname !== '/' && !state.user) {
    return <Redirect to='/' />;
  }
  // skip login page if user is already connected
  if (state.user && pathname === '/') {
    return <Redirect to='/news' />;
  }
  useEffect(() => {
    if (pathname === '/') {
      checkLoginPage('true')
    } else {
      checkLoginPage('false')
    }
  }, [location.pathname])
  return (
    <React.Fragment>
      <Route path='/:path' render={(props) => <Fade><Header {...props} /></Fade>} />
      <StyledContainer isloginpage={isLoginPage}>
        <Switch>
          {routes.map((route) => {
            const key = uniqueId('container_');
            return <Route key={key} {...route} />;
          })}
        </Switch>
        <Route path='/:path' render={(props) => <Fade><BottomNavbar {...props} /></Fade>} />
      </StyledContainer>
    </React.Fragment>
  );
};
App.propTypes = {
  history: PropTypes.object,
};

export default withRouter(App);
