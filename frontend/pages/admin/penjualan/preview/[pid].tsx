import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import FormPenjualan from '../../../../components/form_penjualan';
import { CFormPenjualanProvide } from '../../../../context/CFormPenjualan';
import { CLayout } from '../../../../context/CLayout';
import AuthLayout from '../../../../layouts/AuthLayout';
import { PenjualanService } from '../../../../Services/PenjualanService';
export default function PenjualanFormPreview(props){
    const appContext = useContext(CLayout);
    const routeQuery = useRouter();

    const cancelButtonHandler = () => {
        appContext.redirect("/admin/penjualan");
    }

    const submitButtonHandler = (form: any) => {
        PenjualanService.store(form).then((resp) => {
            console.log('success', resp)
            appContext.redirect("/admin/penjualan");
        }, (err) => {console.log('error', err)});
    }
    return( <AuthLayout>
        <CFormPenjualanProvide>
            <Card title={"Input Penjualan"}>
            <FormPenjualan onSubmit={submitButtonHandler} model={routeQuery.query.pid} onCancel={cancelButtonHandler} editable={false} />
        </Card>
       </CFormPenjualanProvide>
   </AuthLayout>);
}