import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {Drawer, DrawerItem, Layout, Text, IndexPath,Button} from "@ui-kitten/components";
import BarangIndex from '../pages/barang';
import {FormPenjualContainer,PenjualIndex} from '../pages/penjual';
import PelangganIndex from '../pages/pelanggan';
import { FormContainer } from '../pages/pelanggan/form';
import { StyleSheet } from 'react-native';
import DashboardPage from '../pages/dashboard';
const { Navigator, Screen } = createDrawerNavigator();
import {setModel, getModel} from '../context/reducers/pelanggan_reducer';
import configureStore from '../context/store';
const storeTest = configureStore();
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Provider } from 'react-redux';

export function DrawerContent(props){
    return (<Drawer
        selectedIndex={new IndexPath(props.state.index)}
        onSelect={index => props.navigation.navigate(props.state.routeNames[index.row])}
        style={stylus.drawer}
    >
        <DrawerItem title="Dashboard" />
        <DrawerItem title="Pelanggan" />
        <DrawerItem title="Penjualan" />
        <DrawerItem title="Barang" />
    </Drawer>)
} 
export function DrawerNavigator(props){
    return (
        <Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Screen name={props.application_name+" - Dashboard"} component={DashboardPage}/>

            <Screen name={props.application_name+" - Pelanggan"} component={PelangganIndex}
              
            />

            <Screen name={props.application_name+" - Penjualan"} component={PenjualIndex} />
            <Screen name={props.application_name+" - Barang"}  component={BarangIndex} />
            <Screen name={props.application_name+" - Form Pelanggan"} component={FormContainer}/>

        </Navigator>
    )
}

export function AppNavigator(props){
    return(
        <Provider store={storeTest}>
        <NavigationContainer>
            <DrawerNavigator {...props} />
        </NavigationContainer>
        </Provider>
    )
}

const stylus = StyleSheet.create({
    drawer: {
        marginTop: 70
    }
})