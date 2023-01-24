import React from 'react';
export const ContextFormPelanggan = React.createContext({
    getModel: () => {},
    setModel : () => {},
    selectModel: () => {},
    formData: {}
});
export default function CFormPelanggan(props){
    const formData = React.useRef({
        nama: "",
        id_pelanggan: "",
        domisili: "",
        jenis_kelamin: ""
    });
    function getModel(){

        return formData.current;
    }
    function setModel(input){
        if(typeof input == "object"){
            formData.current = {...formData.current, ...input};
            return;
        }
    }
    function selectModel(kode){
        console.warn("selected Model on :", kode);
    }
    return(
        <ContextFormPelanggan.Provider value={[
            getModel,
            setModel,
            formData,
            selectModel,
        ]}>
            {props.children}
        </ContextFormPelanggan.Provider>
    );
}