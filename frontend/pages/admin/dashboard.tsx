import React, { useState } from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import {Card,Col,Row, Table,Button, Space, Tooltip, Form, Input,InputNumber } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { PlusCircleOutlined, DeleteOutlined, EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

export default function Dashboard(props){
    const columns:ColumnsType = [
        {
            title: 'Kode',
            dataIndex: 'kode',
        },
        {
            title: 'Nama',
            dataIndex: 'nama_barang'
        },
        {
            title: 'Kategori',
            dataIndex: 'kategori'
        },
        {
            title: 'Harga',
            dataIndex: 'harga'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (value:any, record:unknown, index:number) => {
                return (
                    <>
                        <Space direction="vertical">
                            <Space wrap>
                                <Tooltip title="Edit Data">
                                    <Button type="primary" shape="circle">
                                        <EditOutlined />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Hapus Data">
                                    <Button type="primary" shape="circle" danger>
                                        <DeleteOutlined />
                                    </Button>
                                </Tooltip>
                            </Space>
                        </Space>
                    </>
                );
            }
        }
    ];
    const data: any[] = [
        {
            key: 1,
            kode: '1-tes',
            nama_barang: 'testing barang',
            kategori: 'testing_kategori',
            harga: '16000'
        },
        
    ];
    const formItemLayout = {
        labelCol: {
          xs: { span: 12 },
          sm: { span: 3 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 21 },
        },
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
    return(
        <>
           <AuthLayout>
                <Row gutter={16}>
                    <Col span={24}>
                        <Card title="Data Barang">
                            <Tooltip title="Tambah Data">
                                <Button type="primary" shape="circle" style={{marginBottom: '1rem'}}>
                                    <PlusCircleOutlined /> 
                                </Button>
                            </Tooltip>
                            <Table 
                            columns={columns} 
                            dataSource={data} 
                            pagination={{pageSize: 50}} 
                            scroll={{y: 600}} bordered
                            />
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card title="Form Data Barang">
                            <Form {...formItemLayout}>
                                <Form.Item 
                                    label="Kode Barang"
                                   
                                >
                                   <span>1-tes</span>
                                </Form.Item>
                                <Form.Item 
                                    label="Nama Barang"
                                    {...formValidateStatus.nama_barang}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item 
                                    label="Kategori"
                                    {...formValidateStatus.kategori}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item 
                                    label="Harga"
                                    {...formValidateStatus.harga}
                                >
                                    <InputNumber  style={{minWidth: '100%'}} />
                                </Form.Item>
                                <Form.Item wrapperCol={{span: 24}} labelCol={{span: 0}} style={{textAlign: 'right'}}>
                                    <Button type="primary" style={{marginRight: '1rem'}}><CheckOutlined/>Submit</Button>
                                    <Button type="default" danger><CloseOutlined />Cancel</Button>
                                </Form.Item>
                            </Form>                           
                        </Card>
                    </Col>
                </Row>
            </AuthLayout>  
        </>
    );
}