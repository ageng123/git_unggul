import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Tooltip } from 'antd';
import React, { useContext } from 'react';
import FormBarang from '../../../components/form_barang';
import { CLayout } from '../../../context/CLayout';
import AuthLayout from '../../../layouts/AuthLayout';
import { BarangService } from '../../../Services/BarangService';
export default function BarangForm(props){
    const context = useContext(CLayout);
    const handlerSubmitButton = (form: any) => {
        BarangService.store(form).then((resp) => {
            context.redirect("/admin/barang");
        }, (err) => {console.log('error', err)});
    }
    const handlerCancelButton = () => {
        context.redirect("/admin/barang");
    }
    return( <AuthLayout>
        <Card title={"Master: Input Data Barang"}>
           <FormBarang onCancel={handlerCancelButton} onSubmit={handlerSubmitButton} editable={true} />
       </Card>
   </AuthLayout>);
}