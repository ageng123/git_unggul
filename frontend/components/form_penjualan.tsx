import { ArrowLeftOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import type { DatePickerProps, SelectProps } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IPenjualan,IItemPenjualan } from "../Interfaces/interface_penjualan";
import FieldNotaBarang from "./field_nota_barang";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';
import { CFormPenjualan, CFormPenjualanProvide } from "../context/CFormPenjualan";
import { PelangganService } from "../Services/PelangganService";
import { PenjualanService } from "../Services/PenjualanService";
export const ModalSelectBarang = (props:any) => {
    const [disabled, setDisabled] = useState(false);
    const [open, setOpen] = useState(false);
    const formItemLayout = {
        labelCol: {
          xs: { span: 5 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 19 },
          sm: { span: 19 },
        },
        style: {marginTop: '1rem'},
        disabled: !props.editable,
    };
    const [modalForm, modalFormHandler] = useState({
        kode_barang: "",
        qty: ""
    }); 
    
    const date = new Date();
    const modalOpenHandler = () => {
        setOpen(true);
    }
    const formContext = useContext(CFormPenjualan);
    let {setShowModal,modalOpen} = formContext;
    
    const modalCloseHandler = () => {
        modalFormHandler({
            kode_barang: "",
            qty: ""
        });
        formContext.setSelectedData({});
        setShowModal(false);
    }
    const handlerSelectBarang = (props) => {
        modalFormHandler({...modalForm, kode_barang: props})
    }
    const handlerInputQuantity = (props) => {
        modalFormHandler({...modalForm, qty: props})
        document.getElementById("qty").focus();
    }
    useEffect(() => {
        console.log('load data');
        if(formContext.selectedData.current.kode_barang != undefined){
            console.log(formContext.selectedData.current);
            modalFormHandler({
                kode_barang: formContext.selectedData.current.kode_barang,
                qty: formContext.selectedData.current.qty
            });
        }
    }, [modalOpen]);
    const clearModal = () => {
        modalFormHandler({
            kode_barang: "",
            qty: ""
        });
        formContext.setSelectedData({});
        modalCloseHandler();
    }
    const handlerSubmitModal = () => {
        console.log(modalForm);
        let initProps = {data: modalForm, callback: clearModal}
        props.onSubmitBarang(initProps);
    }
    return (
        <Modal
            key={"1"}
            open={modalOpen}
            onCancel={modalCloseHandler}
            footer={[
            <Button key={btoa((date.getMilliseconds() + 3).toString())} type="default" onClick={modalCloseHandler} danger><CloseOutlined />Cancel</Button>,
            <Button key={btoa((date.getMilliseconds() + 5).toString())} type="primary" onClick={handlerSubmitModal}><CheckOutlined/>Submit</Button>,
            ]}
         title={ <div key={btoa((date.getMilliseconds() + 1).toString())}
            style={{
              width: '100%',
              cursor: 'move',
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
           
            // end
          >
            Barang
          </div>}>
            <Form key={btoa((date.getMilliseconds() + 2).toString())} {...formItemLayout}>
                <Form.Item label="Pilih Barang">
                    <Select 
                        showSearch
                        key={JSON.stringify(formContext.dataBarang)}
                        optionFilterProp="children"
                        options={formContext.dataBarang}
                        value={modalForm.kode_barang}
                        onChange={handlerSelectBarang}
                    />
                </Form.Item>
                <Form.Item label="Qty">
                    <InputNumber  onChange={handlerInputQuantity} id="qty" value={modalForm.qty} style={{width: '100%', display: "block"}} />
                </Form.Item>
               
            </Form>
         </Modal>
    )
}
export const FormPenjualan = (props:any) =>{
    dayjs.extend(customParseFormat);

    const dateFormat = 'YYYY-MM-DD';
    const [form, setForm] = useState<IPenjualan>({
       id_nota: "",
       tgl: "",
       kode_pelanggan: "",
       subtotal: "0",
       detail_penjualan:[]
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
        tgl: {
            
            hasFeedback: true,
            help:"",
            
        },
        kode_pelanggan: {
            hasFeedback: true,
            help:"",
            
        },
        subtotal: {
            hasFeedback: true,
            help:"",
            
        },
        detail_penjualan: {
            hasFeedback: true,
            help:"",
        },

    };
    const formContext = useContext(CFormPenjualan);
    let loadData = useRef(false);
    const [pelangganList, setPelangganList] =useState<SelectProps['options']>([]);
    let optionPelanggan = [];
    const handlerSubmitModalBarang = (props) => {
        console.log(props);
        let modalBarang = formContext.detailPenjualan.current;
        console.log(modalBarang);
        let checkModalBarang = modalBarang.filter(obj => {return obj.kode_barang == props.data.kode_barang})
        console.log(checkModalBarang);
        if(checkModalBarang.length > 0){
            modalBarang.map((value,index) => {
                if(value.kode_barang == props.data.kode_barang){
                    modalBarang[index].qty += props.data.qty;
                }
            })
        }else{
            modalBarang.push(props.data)
        }
        formContext.setDetailPenjualan(modalBarang);
        setForm({...form, detail_penjualan: modalBarang});
        props.callback();
        console.log(form.detail_penjualan);
    }
    useEffect(() => {
        if(props.model != undefined){
            loadModel(props.model);
        }
    }, [props.model]);
    const loadModel = (kode) => {
        PenjualanService.get(kode).then(resp => {
            let formModel = form;
            resp.data = resp.data.data;
            formModel.tgl = resp.data.tgl;
            formModel.id_nota = resp.data.id_nota;
            formModel.kode_pelanggan = resp.data.kode_pelanggan;
            formModel.subtotal = resp.data.subtotal;
            formModel.detail_penjualan = resp.data.detail_nota;
            console.log(formModel);
            setForm(formModel);
            formContext.setShowModal(true);
            formContext.setShowModal(false);
            formContext.setDetailPenjualan(resp.data.detail_nota);
            
        })
    }
    useEffect(() => {
        console.log('effect running');
        if(form.tgl == ""){
            var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
            let now = [year, month, day].join('-');
            setForm({...form, tgl: now});
            
        }
        console.log(props);

        if(loadData.current == false){
            if(formContext.dataBarang.length == 0){
                formContext.setLoadBarang();
            }
            if(formContext.dataPelanggan.length == 0){
                optionPelanggan = [];
                PelangganService.getAll(null).then(resp => {
                    resp.data.data.map((value) => {
                        let curPelanggan = pelangganList;
                        let add = {value: "", label: "",};
                        add.value = value.id_pelanggan;
                        add.label = value.nama + " / " + value.domisili;
                        curPelanggan.push(add);
                        
                        optionPelanggan.push(add);
                    })
                    setPelangganList(optionPelanggan);

                    console.log(optionPelanggan);
                })
                
            }
            
            if(props.model != undefined){

            }
            loadData.current = true;
        }
     
    },[loadData.current])
    const [onSelect, setOnSelect] = useState(false);
    const dateChangeHandler: DatePickerProps['onChange'] = (date, dateString) => {
        
        setForm({...form, tgl: dateString})
    };
    const openModalNotaBarang = () => {
        setOnSelect(true);
    }
    const handleChangePelanggan = (e) => {
        console.log(e);
        setForm({...form, kode_pelanggan: e})
    }
    const handleDelete = (index) => {
        let modalBarang = form.detail_penjualan;
        let reduced = modalBarang.filter(x => {return x.kode_barang != index});
        console.log(reduced);
        setForm({...form, detail_penjualan: reduced});
        formContext.setDetailPenjualan(reduced);
        formContext.setShowModal(false);
        checkModalPenjualan();
    }
    const checkModalPenjualan = () => {
        console.log(form);
    }
    const handleSubmitForm = () => {
        let dataForm = form;
        dataForm.detail_penjualan = formContext.detailPenjualan.current;
        props.onSubmit(dataForm);
    }
    const sumSubtotalHandler = (e) => {
        let sub = 0;
        e.map((val) => {
            let total = parseInt(val.qty) * parseInt(val.harga);
            sub += total;
        })
        setForm({...form, subtotal: sub.toString()});
    }
    return(
        <>
        <Form {...formItemLayout}>
            <Form.Item 
                label="ID"
                
            >
                <span>{form.id_nota}</span>
            </Form.Item>
            <Form.Item 
                label="Tanggal"
                {...formValidateStatus.tgl}
            >
               <DatePicker defaultValue={dayjs(form.tgl , dateFormat)} value={dayjs(form.tgl , dateFormat)} onChange={dateChangeHandler} />
            </Form.Item>
            <Form.Item 
                label="Pelanggan"
                {...formValidateStatus.kode_pelanggan}
                
            >
                {loadData.current == true && 
                    <Select 
                    showSearch
                    optionFilterProp="children"
                    key={form.kode_pelanggan}
                    value={form.kode_pelanggan}
                    options={pelangganList.map((d) => ({
                        value: d.value,
                        label: d.label
                    }))}
                    onChange={handleChangePelanggan}
                />}
            </Form.Item>
          
            <Form.Item 
               wrapperCol={{span: 24}} labelCol={{span: 0}} 
            >
                <FieldNotaBarang onDelete={handleDelete} callback={sumSubtotalHandler} addData={form.detail_penjualan}  />
            </Form.Item>
            <Form.Item 
                label="Subtotal"
                {...formValidateStatus.subtotal}
            >
                <Input disabled style={{minWidth: '100%'}} value={form.subtotal} />
            </Form.Item>
            {editable == true && 
                <Form.Item wrapperCol={{span: 24}} labelCol={{span: 0}} style={{textAlign: 'right'}}>
                    <Button type="primary" onClick={handleSubmitForm} style={{marginRight: '1rem'}}><CheckOutlined/>Submit</Button>
                    <Button type="default" onClick={props.onCancel} danger><CloseOutlined />Cancel</Button>
                </Form.Item>
            }
        </Form>
        {editable == false && 
                <Form.Item wrapperCol={{span: 24}} labelCol={{span: 0}} style={{textAlign: 'right'}}>
                    <Button type="default" onClick={props.onCancel} danger><ArrowLeftOutlined />Back</Button>
                </Form.Item>
            }
        <div key={btoa("8892990")}>
            <ModalSelectBarang onSubmitBarang={handlerSubmitModalBarang}  editable={editable} />

        </div>
        </>)
}
export default FormPenjualan;