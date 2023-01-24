import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { CFormPenjualan } from '../context/CFormPenjualan';
import IBarang from '../Interfaces/interface_barang';
import { BarangService } from '../Services/BarangService';
export const FieldNotaBarang = (props: any) => {
    const columnBarang:ColumnsType = [
        {title: 'Kode Barang', dataIndex: 'kode'},
        {title: 'Nama Barang', dataIndex: 'nama'},
        {title: 'Kategori', dataIndex: 'kategori'},
        {title: 'Harga', dataIndex: 'harga'},
        {title: 'Qty', dataIndex: 'qty'},
        {title: 'Operations', render: (obj,rec,ind) => {
            rec = rec as IBarang;
            return (
                <>
                {props.editable == true &&
                <Space direction='vertical' style={{width: '100%', textAlign: 'center'}}>
                    <Space wrap>
                        <Button shape="circle" onClick={() => handleEdit(rec.kode)} type="default" style={{color: "#52c41a"}}>
                            <EditOutlined />
                        </Button>
                        <Button shape="circle" onClick={() => handleDelete(rec.kode)} type="default" style={{color: "#f5222d"}}>
                            <DeleteOutlined />
                        </Button>
                    </Space>
                </Space>
                }
                </>
            );
        }},

    ];
    const [display, setDisplay] = useState<IBarang[]>([]);
    const formContext = useContext(CFormPenjualan);
    const [barangList, setBarangList] = useState([]);
    let load = useRef(false);
    let datasources = useRef([]);
    let {setShowModal} = formContext;
    useEffect(() => {
        if(load.current == false){
            BarangService.getAll(null).then(resp => {
                setBarangList(resp.data.data);
            })
            load.current = true;
        }
        clearDisplay();
        handleLoadData();
        loadDataSource();

    }, [formContext.modalOpen]);
    const clearDisplay = () => {
        setDisplay([]);
    }
    const handleLoadData = () => {
        if(JSON.stringify(formContext.detailPenjualan.current) != JSON.stringify(display) || display.length < 1){
            console.log('...loading data to display');
            let displayList = display;
            displayList = [];
            formContext.detailPenjualan.current.map((data) => {
                let checkDisplay = displayList.filter(obj => {return obj.kode == data.kode_barang});
                let checkBarang = barangList.filter(obj => {return obj.kode == data.kode_barang});
                if(checkBarang.length > 0){
                    let date = new Date();
                    let add = {...checkBarang[0], ...data, key:btoa(date.getMilliseconds().toString())};
                    console.log("load data ...", add);
                    displayList.push(add);
                    setDisplay(displayList);
                    datasources.current = displayList;
                }
               
    
            })
        }
    }
    const handleDelete = (index) => {
        let displayDelete = datasources.current;
        console.log(displayDelete);
        console.log(index);
        let displayAfter = displayDelete.filter(obj => {return obj.kode != index});
        console.log(displayAfter);
        datasources.current = displayAfter;
        props.onDelete(index);
        loadDataSource();
    }
    const handleEdit = (index) => {
        let data = formContext.detailPenjualan.current;
        let selected = data.filter(obj => {return obj.kode_barang == index});
        if(selected.length > 0){
            formContext.setSelectedData(selected[0]);
            formContext.setShowModal(true);
        }
    }
    const loadDataSource = () => {
       props.callback(datasources.current);
    }
    return (
        <>
            {props.editable == true && 
            <div style={{width: '100%', textAlign: 'right'}}>
                <Button type="primary" onClick={() => formContext.setShowModal(true)} style={{marginBottom: '1rem'}}><PlusOutlined/> Tambah Barang</Button>
            </div>
            }
            <Table bordered rowKey={obj=>btoa(JSON.stringify(obj))} columns={columnBarang} dataSource={[...datasources.current]} />
        </>
    )
}
export default FieldNotaBarang;