import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Tooltip } from 'antd';
import React, { useContext } from 'react';
import AuthLayout from '../../../../layouts/AuthLayout';
import FormPelanggan from '../../../../components/form_pelanggan';
import { CLayout } from '../../../../context/CLayout';
import { PelangganService } from '../../../../Services/PelangganService';
import { useRouter } from 'next/router';
export default function PelangganForm(props){
    const appContext = useContext(CLayout);
    const routeQuery = useRouter();
    const cancelButtonHandler = () => {
        appContext.redirect("/admin/pelanggan");
    }
    const submitButtonHandler = (form: any) => {
        PelangganService.updateNoFile(form, form.id_pelanggan).then((resp) => {
            console.log('success', resp)
            appContext.redirect("/admin/pelanggan");
        }, (err) => {console.log('error', err)});
    }
    return( <AuthLayout>
        <Card title={"Master: Input Data Pelangan"}>
           <FormPelanggan onSubmit={submitButtonHandler} model={routeQuery.query.pid} onCancel={cancelButtonHandler} editable={true} />
       </Card>
   </AuthLayout>);
}