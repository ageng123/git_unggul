import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Tooltip } from 'antd';
import React, { useContext } from 'react';
import TabelBarang from '../../../components/tabel_barang';
import AuthLayout from '../../../layouts/AuthLayout';
import { CLayout } from '../../../context/CLayout';
import { BarangService } from '../../../Services/BarangService';
export default function IndexBarang(props){
    const {redirect} = useContext(CLayout);
    const addButtonHandler = () => {
        redirect("/admin/barang/form");
    }
    const editDataHandler = ({kode}) => {
        console.log("edit clicked");
        console.log(kode);
        redirect({pathname: "/admin/barang/edit/[bid]", query: {bid: kode}});
    }
    const viewDataHandler = ({kode}) => {
        console.log("edit clicked");
        console.log(kode);
        redirect({pathname: "/admin/barang/preview/[bid]", query: {bid: kode}});
    }
    const deleteDataHandler = ({kode, nama, callback}) => {
        let confirmation = confirm("Apakah Anda Yakin ingin menghapus data "+nama+" ini ?");
        if(!confirmation){
            return false;
        }
        BarangService.delete(kode).then(resp => {
            alert("Berhasil Hapus Data");
            setTimeout(() => {
                callback();

            },1000)
        })
    }
    return(
        <AuthLayout>
             <Card title={"Master: Data Barang"}>
                <Tooltip title="Tambah Data">
                    <Button type="primary" onClick={addButtonHandler} shape="circle" style={{marginBottom: '1rem'}}>
                        <PlusCircleOutlined /> 
                    </Button>
                </Tooltip>
                <TabelBarang tableType="editable" onEdit={editDataHandler} onPreview={viewDataHandler} onDelete={deleteDataHandler} />
            </Card>
        </AuthLayout>
    );
}