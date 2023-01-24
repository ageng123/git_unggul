import { Input, Layout, SelectItem,Button,Select, } from "@ui-kitten/components";
import React, { useEffect,useContext } from "react";
import { Alert, StyleSheet } from "react-native";
import CFormPelanggan, {ContextFormPelanggan } from "../../context/CFormPelanggan";
import { Provider } from 'react-redux';

import configureStore from '../../context/store';
const storeTest = configureStore();
import { connect } from 'react-redux';
import { PelangganService } from "../../services/pelanggan_service";
import { AppProperties } from "../../config/config";
const JenisKelaminData = ["Laki-Laki", "Perempuan"];
function FormPelanggan(props){
    const {modelPelanggan} = props;
    useEffect(() => {
        if(props.route.params != undefined && props.route.params.uuid != undefined){
            props.dispatch({type: "CLEAR_MODEL"});
            handleLoadData(props.route.params.uuid);
        }
    }, [props.route]);
    function handleLoadData(id){
        PelangganService.find(id).then(resp => { 
            let formData = resp.data.data;
            for(let i in formData) {
                props.dispatch({type: "SET_MODEL", payload: {value: formData[i], type: i}});
            }
        })
    }
    function setModel(props){
        formContext.setModel(props);
    }
    function handleInputNama(value){
        props.dispatch({type: 'SET_MODEL', payload: {type: "nama",value: value}})
    }
    function handleInputDomisili(value){
        props.dispatch({type: 'SET_MODEL', payload: {type: "domisili",value: value}})
    }
    function handleSelectJenisKelamin({row}){
        props.dispatch({type: 'SET_MODEL', payload: {type:"jenis_kelamin", value: JenisKelaminData[row]}})
    }
    function handleSubmitButton(){
        if(props.route.params != undefined && props.route.params.uuid != undefined){
            return handleUpdateButton();
        }
        PelangganService.save(modelPelanggan).then(resp => {
            alert(resp.data.messages);
            props.dispatch({type: "CLEAR_MODEL"});
            props.navigation.navigate(AppProperties.application_name+" - Pelanggan")
        
        }, err => {
            console.warn(JSON.stringify(err));
        })
    }
    function handleUpdateButton(){
        PelangganService.update({form: modelPelanggan,id_pelanggan: props.route.params.uuid}).then(resp => {
            Alert.alert("Success!", resp.data.messages, [{
                text: "OK",
                onPress: () => {
                    props.dispatch({type: "CLEAR_MODEL"});
                    props.navigation.navigate(AppProperties.application_name+" - Pelanggan")
                }
            }]);
            props.navigation.navigate(AppProperties.application_name+" - Pelanggan")

        }, err => {
            console.warn(JSON.stringify(err));
        })
    }
    function handleCancelButton(){
        props.dispatch({type: "CLEAR_MODEL"});
        props.navigation.navigate(AppProperties.application_name+" - Pelanggan")
    }
    return(
        <Layout style={styles.form_container}>
            <Input label="ID" value={modelPelanggan.id_pelanggan} disabled />
            <Input onChangeText={handleInputNama} style={styles.form_gutter} value={modelPelanggan.nama} label="Nama" />
            <Select style={styles.form_gutter} value={modelPelanggan.jenis_kelamin} onSelect={handleSelectJenisKelamin} label="Jenis Kelamin">
                {JenisKelaminData.map(value => (
                    <SelectItem key={() => btoa(value)} title={value} />
                ))}
            </Select>
            <Input onChangeText={handleInputDomisili} value={modelPelanggan.domisili} style={styles.form_gutter} label="Domisili" />
            <Button onPress={handleSubmitButton} style={styles.form_gutter} >Submit</Button>
            <Button onPress={handleCancelButton} status="danger" appearance="ghost"  style={styles.form_gutter} >Cancel</Button>

        </Layout>
    );
}
export const FormContainer = connect(state => ({modelPelanggan: state.modelPelanggan}))(FormPelanggan);
const styles = StyleSheet.create({
    form_container: {
        paddingVertical: 15,
        paddingHorizontal: 15
    },
    form_gutter: {
        marginTop: 15
    }
})