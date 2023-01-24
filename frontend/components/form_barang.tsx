import { ArrowLeftOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import IBarang from "../Interfaces/interface_barang";
import { BarangService } from "../Services/BarangService";
export const FormBarang = (props) =>{
    const [form, setForm] = useState<IBarang>({
        kode: '',
        nama: '',
        kategori: '',
        harga: ''
    })
    let {editable} = props;
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
        nama_barang: {
            
            hasFeedback: true,
            help:"",
            
        },
        kategori: {
            hasFeedback: true,
            help:"",
            
        },
        harga: {
            hasFeedback: true,
            help:"",
            
        },
        
    };
    useEffect(() => {
        console.log(props);
        if(props.model != undefined){
            loadData(props.model);
        }
    }, [props.model])
    const loadData = (model: any) => {
        BarangService.get(model).then(resp => {
            setForm(resp.data.data);
        })
    }
    const handleChange = (e) => {
        
        setForm({...form, [e.target.name]: e.target.value});
    }
    const handleHargaChange = (e) => {
        setForm({...form, harga: e});
    }
    return(<>
        <Form {...formItemLayout}>
            <Form.Item 
                label="Kode Barang"
                
            >
                <span>{form.kode}</span>
            </Form.Item>
            <Form.Item 
                label="Nama Barang"
                {...formValidateStatus.nama_barang}
            >
                <Input value={form.nama} name="nama" onChange={handleChange} />
            </Form.Item>
            <Form.Item 
                label="Kategori"
                {...formValidateStatus.kategori}
            >
                <Input value={form.kategori} name="kategori" onChange={handleChange} />
            </Form.Item>
            <Form.Item 
                label="Harga"
                {...formValidateStatus.harga}
            >
                <InputNumber value={form.harga} name="harga" onChange={handleHargaChange} style={{minWidth: '100%'}} />
            </Form.Item>
            {editable == true && 
                <Form.Item wrapperCol={{span: 24}} labelCol={{span: 0}} style={{textAlign: 'right'}}>
                    <Button type="primary" onClick={() => {props.onSubmit(form)}} style={{marginRight: '1rem'}}><CheckOutlined/>Submit</Button>
                    <Button type="default" onClick={() => props.onCancel()} danger><CloseOutlined />Cancel</Button>
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
export default FormBarang;