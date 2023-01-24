import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Tooltip } from 'antd';
import React, { useContext } from 'react';
import FormPenjualan from '../../../components/form_penjualan';
import { CFormPenjualanProvide } from '../../../context/CFormPenjualan';
import { CLayout } from '../../../context/CLayout';
import AuthLayout from '../../../layouts/AuthLayout';
import { PenjualanService } from '../../../Services/PenjualanService';
export default function PenjualanForm(props){
    const appContext = useContext(CLayout)
    const cancelButtonHandler = () => {
        appContext.redirect("/admin/penjualan");
    }
    const submitButtonHandler = (form: any) => {
        PenjualanService.store(form).then((resp) => {
            console.log('success', resp)
            appContext.redirect("/admin/penjualan");
        }, (err) => {console.log('error', err)});
    }
    const previewButtonHandler = ({nota}) => {
        appContext.redirect("/admin/penjualan/preview/"+nota);
    }
    return( <AuthLayout>
        <CFormPenjualanProvide>
            <Card title={"Input Penjualan"}>
            <FormPenjualan onPreview={previewButtonHandler} onSubmit={submitButtonHandler} onCancel={cancelButtonHandler} editable={true} />
        </Card>
       </CFormPenjualanProvide>
   </AuthLayout>);
}