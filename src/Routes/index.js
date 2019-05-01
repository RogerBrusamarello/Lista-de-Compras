import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Login from '../Screens/Login/Login';
import Cadastro from '../Screens/Cadastro/Cadastro';

const appNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Cadastro: {
      screen: Cadastro,
    },
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      header: null
    },
  },
);

export default createAppContainer(appNavigator);