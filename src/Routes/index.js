import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Login from '../Screens/Login/Login';
import Cadastro from '../Screens/Cadastro/Cadastro';
import Home from '../Screens/Home/Home';

const appNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Cadastro: {
      screen: Cadastro,
    },
    Home: {
      screen: Home,
    }
  },
   {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      header: null
    },
  },
);

export default createAppContainer(appNavigator);