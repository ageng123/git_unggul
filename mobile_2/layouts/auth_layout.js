import React from "react";
import { StyleSheet } from "react-native";
import { Icon,Layout,MenuItem,OverflowMenu,TopNavigation,TopNavigationAction,Divider } from "@ui-kitten/components";
import { AppNavigator } from "./AppNavigator";
import { Provider } from 'react-redux';
import {setModel, getModel} from '../context/reducers/pelanggan_reducer';
import configureStore from '../context/store';
const storeTest = configureStore();
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
export const AuthLayout = (props) => {
   
    return (
        <Provider store={storeTest}>
            <AppNavigator {...props} />
        </Provider>
    );
}