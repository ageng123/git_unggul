import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import FormBarang from '../../../../components/form_barang';
import { CLayout } from '../../../../context/CLayout';
import AuthLayout from '../../../../layouts/AuthLayout';
import { BarangService } from '../../../../Services/BarangService';
export default function Edit({bid}){
    const context = useContext(CLayout);
    const routeQuery = useRouter();
    const handlerSubmitButton = (form: any) => {
        
        BarangService.updateNoFile(form, form.kode).then((resp) => {
            context.redirect("/admin/barang");
        }, (err) => {console.log('error', err)});
    }
    const handlerCancelButton = () => {
        context.redirect("/admin/barang");
    }
    useEffect(() => {
        if(routeQuery.query.bid == undefined){
           
        }
    }, [])
    return( <AuthLayout>
        <Card title={"Master: Edit Data Barang"}>
           <FormBarang onCancel={handlerCancelButton} model={routeQuery.query.bid} onSubmit={handlerSubmitButton} editable={true} />
       </Card>
   </AuthLayout>);
}