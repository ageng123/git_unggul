import { ArrowLeftOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select } from "antd";
import React, { useEffect, useState } from "react";
import IPelanggan from "../Interfaces/interface_pelanggan";
import { PelangganService } from "../Services/PelangganService";
export const FormPelanggan = (props:any) =>{
    const [form, setForm] = useState<IPelanggan>({
        nama:'',
        jenis_kelamin: "",
        id_pelanggan: "",
        domisili: ""
    })
    let {editable} = props;
    const [formAnt] = Form.useForm();
    useEffect(() => {
        console.log(props);
        if(props.model != undefined){
            loadData(props.model);
        }
    }, [props.model])
    const loadData = (model: any) => {
        PelangganService.get(model).then(resp => {
            setForm(resp.data.data);
        })
    }
    const formItemLayout = {
        labelCol: {
          xs: { span: 12 },
          sm: { span: 3 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 21 },
        },
        disabled: !editable,
    };
    const formValidateStatus = {
        nama: {
            
            hasFeedback: true,
            help:"",
            
        },
        jenis_kelamin: {
            hasFeedback: true,
            help:"",
            
        },
        domisili: {
            hasFeedback: true,
            help:"",
            
        },
        
    };
    const handleKeyUp = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const handleSelectJenisKelamin = (e,el) => {
        setForm({...form,jenis_kelamin: e})
    }
    return(<>
        <Form {...formItemLayout} form={formAnt}>
            <Form.Item 
                label="ID"
                
            >
                <span>{form.id_pelanggan}</span>
            </Form.Item>
            <Form.Item 
                label="Nama"
                {...formValidateStatus.nama}
            >
                <Input value={form.nama} name="nama" onChange={handleKeyUp} />
            </Form.Item>
            <Form.Item 
                label="Jenis Kelamin"
                {...formValidateStatus.jenis_kelamin}
            >
               <Select 
                showSearch
                value={form.jenis_kelamin}
                id="jenis_kelamin" onChange={handleSelectJenisKelamin}
                options={[
                    {value: 'Laki-Laki', label: 'Laki-Laki'},
                    {value: 'Perempuan', label: 'Perempuan'}
                ]}
               />
            </Form.Item>
            <Form.Item 
                label="Domisili"
                
                {...formValidateStatus.domisili}
            >
                <Input value={form.domisili} name="domisili" onChange={handleKeyUp}  style={{minWidth: '100%'}} />
            </Form.Item>
            {editable == true && 
                <Form.Item wrapperCol={{span: 24}} labelCol={{span: 0}} style={{textAlign: 'right'}}>
                    <Button type="primary" onClick={() => props.onSubmit(form)} style={{marginRight: '1rem'}}><CheckOutlined/>Submit</Button>
                    <Button type="default" onClick={props.onCancel} danger><CloseOutlined />Cancel</Button>
                </Form.Item>
            }
        </Form>
        {editable == false && 
            <div style={{width: "100%", textAlign: "right"}}>
                <Button type="default" onClick={() => props.onCancel()} danger><ArrowLeftOutlined />Back</Button>

            </div>
        }
    </>)
}
export default FormPelanggan;