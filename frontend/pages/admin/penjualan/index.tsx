import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Tooltip } from 'antd';
import React, { useContext } from 'react';
import TabelPenjualan from '../../../components/tabel_penjualan';
import { CLayout } from '../../../context/CLayout';
import AuthLayout from '../../../layouts/AuthLayout';
import { PenjualanService } from '../../../Services/PenjualanService';


export default function IndexBarang(props){
    const appContext = useContext(CLayout);
    const handlerAddButton = () => {
        appContext.redirect("/admin/penjualan/form");
    }
    const previewButtonHandler = ({id_nota}) => {
        appContext.redirect("/admin/penjualan/preview/"+id_nota);
    }
    const deleteButtonHandler = ({id_nota, callback}) => {
        let confirmation = confirm("Are you sure you want to delete nota number : "+id_nota+" ? ");
        if(!confirmation){
            return false;
        }
        PenjualanService.delete(id_nota).then(response => {
            alert("Berhasil Hapus Data");
            setTimeout(() => {
                callback();

            },1000)
        })
    }
    return(
        <AuthLayout>
             <Card title={"Data Penjualan"}>
                <Tooltip title="Tambah Data">
                    <Button type="primary" onClick={handlerAddButton} shape="circle" style={{marginBottom: '1rem'}}>
                        <PlusCircleOutlined /> 
                    </Button>
                </Tooltip>
                <TabelPenjualan onDelete={deleteButtonHandler} onPreview={previewButtonHandler} tableType="editable" />
            </Card>
        </AuthLayout>
    );
}