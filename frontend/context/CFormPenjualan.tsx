import React, {createContext, useRef, useState} from 'react';
import {IPenjualan} from '../Interfaces/interface_penjualan';
import { BarangService } from '../Services/BarangService';
import { PelangganService } from '../Services/PelangganService';
interface ICFormPenjualan {
    modalOpen: any,
    displayDetail: any,
    formPenjualan: any,
    setShowModal: any,
    setDispBarang: any,
    dataPelanggan: any, 
    dataBarang: any,
    setLoadBarang: any,
    loadPelanggan:any,
    detailPenjualan: any,
    setDetailPenjualan: any,
    selectedData: any,
    setSelectedData: any,
}
export const CFormPenjualan = createContext<ICFormPenjualan>({
    modalOpen: false,
    displayDetail: [],
    formPenjualan: [],
        setShowModal: () => {},
        setDispBarang: () => {},
    dataPelanggan: [],
    dataBarang: [],
    setLoadBarang: () => {},
    loadPelanggan: () => {},
    detailPenjualan: [],
    setDetailPenjualan: () => {},
    selectedData: {},
    setSelectedData: () => {},
});
export const CFormPenjualanProvide = (props) => {
    let {children} = props;
    const [modalState, setModalOpen] = useState(false);
    const [displayDetail, setDisplayDetail] = useState([]);
    const [formPenjualan, setFormPenjualan] = useState<IPenjualan>();
    const [dataPelanggan, setDataPelanggan] = useState([]);
    const [dataBarang, setDataBarang] = useState([]);
    let detailPenjualan = useRef([]);
    let selectedData = useRef({});
    function setDetailPenjualan(data:any[]){
        detailPenjualan.current = data;
    }
    function setSelectedData (data) {
        if(data.kode_barang == undefined){
            selectedData.current = {};
        }
        selectedData.current = data;
    }
    function setShowModal(state: boolean = null){
        if(state == null){
            state = !modalState;
        }
        setModalOpen(state)
    };
    const setDispBarang = (data:any) => {
        let current = displayDetail;
        current.push(data);
        setDisplayDetail(current);
    };
    function setLoadBarang(){
        console.log("loading barang ...");
        BarangService.getAll(null).then(resp => {
            resp.data.data.map((data, index) => {
                let options = {value: "", label: ""};
                options.value = data.kode;
                options.label = data.nama + " - " + data.kategori;
                let curBarang = dataBarang;
                curBarang.push(options);
                console.log(curBarang);
                setDataBarang(curBarang);
            })
        })
    }
    function loadPelanggan(){
        PelangganService.getAll(null).then(resp => {
            resp.data.data.map((data, index) => {
                let options = {value: "", label: ""};
                console.log(data);
                options.value = data.id_pelanggan;
                options.label = data.nama + " - " + data.domisili;
                let curPelanggan = dataPelanggan;
                curPelanggan.push(options);
                console.log(curPelanggan)
                setDataPelanggan(curPelanggan);
            })
        })
    }
    let modalOpen = modalState;
    return (<>
        <CFormPenjualan.Provider value={{
            modalOpen,
            displayDetail,
            formPenjualan,
            setShowModal,
            setDispBarang,
            dataBarang,
            dataPelanggan,
            setLoadBarang,
            loadPelanggan,
            detailPenjualan,
            setDetailPenjualan,
            selectedData,
            setSelectedData,
        }}>
            {children}
        </CFormPenjualan.Provider>
    </>)

}