import React, { Component } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import { hot } from 'react-hot-loader/root';

import { bindActionCreators } from 'redux';

import { navTo, setCommonState, showToast } from 'common/dist/client/action';

import connect from 'common/dist/client/base';

import { Commons } from 'common/dist/client/components';

import routes from './routes';

import style from './style.scss';

class App extends Component {
  UNSAFE_componentWillMount() {
    this.props.setCommonState({
      // avoid 'has' method missing while server output a Set of state to the client
      loadings: new Set()
    });
  }

  render() {
    const { redirectTo } = this.props;

    return (
      <div className={style.container}>
        {redirectTo ? <Redirect to={redirectTo} /> : null}
        <Commons includes={[Commons.Types.Toast, Commons.Types.Copy]} />
        <Switch>
          {routes.map(({ path, component, async, loader, key }) => {
            return (
              <Route
                exact
                key={key || path}
                path={path}
                component={async ? loader : component}
              />
            );
          })}
        </Switch>
      </div>
    );
  }
}

export default hot(
  connect(App, {
    mapState: ({ common: { redirectTo } }) => ({
      redirectTo
    }),

    mapDispatch: dispatch => ({
      ...bindActionCreators(
        {
          navTo,
          setCommonState,
          showToast
        },
        dispatch
      ),
      dispatch
    })
  })
);
