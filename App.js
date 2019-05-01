import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import Routes from './src/Routes';

export default function app(){
    return (
      <Fragment>
        <StatusBar barStyle="light-content" backgroundColor="#A020F0" />
        <Routes />
      </Fragment>
    );
}