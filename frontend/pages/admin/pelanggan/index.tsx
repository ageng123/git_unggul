import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Tooltip } from 'antd';
import React, { useContext } from 'react';
import AuthLayout from '../../../layouts/AuthLayout';
import TabelPelanggan from '../../../components/tabel_pelanggan';
import { CLayout } from '../../../context/CLayout';
import { PelangganService } from '../../../Services/PelangganService';

export default function IndexPelanggan(props){
    const appProps = useContext(CLayout);
    let {redirect} = appProps;
    const addButtonHandler = () => {
        appProps.redirect("/admin/pelanggan/form");
    }
    const editDataHandler = ({id_pelanggan}) => {
        redirect({pathname: "/admin/pelanggan/edit/[pid]", query: {pid: id_pelanggan}});
    }
    const viewDataHandler = ({id_pelanggan}) => {
        redirect({pathname: "/admin/pelanggan/preview/[pid]", query: {pid: id_pelanggan}});
    }
    const deleteDataHandler = ({id_pelanggan, nama, callback}) => {
        let confirmation = confirm("Apakah Anda Yakin ingin menghapus data "+nama+" ?");
        if(!confirmation){
            return false;
        }
        PelangganService.delete(id_pelanggan).then(resp => {
            alert("Berhasil Hapus Data");
            setTimeout(() => {
                callback();

            },1000)
        })
    }
    return(
        <AuthLayout>
             <Card title={"Master: Data Pelanggan"}>
                <Tooltip title="Tambah Data">
                    <Button type="primary" onClick={addButtonHandler} shape="circle" style={{marginBottom: '1rem'}}>
                        <PlusCircleOutlined /> 
                    </Button>
                </Tooltip>
                <TabelPelanggan tableType="editable" onEdit={editDataHandler} onPreview={viewDataHandler} onDelete={deleteDataHandler}/>
            </Card>
        </AuthLayout>
    );
}