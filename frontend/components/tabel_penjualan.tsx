import React, {useEffect, useRef, useState} from 'react';
import { Table,Button, Tooltip, Space } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { IPenjualan } from '../Interfaces/interface_penjualan';
import { PenjualanService } from '../Services/PenjualanService';
export const TabelPenjualan = (props:any) => {
    let columnData:ColumnsType = [
        {
            title: 'ID',
            dataIndex: 'id_nota'
        },
        {
            title: 'Tanggal',
            dataIndex: 'tgl'
        },
        {
            title: 'Pelanggan',
            dataIndex: 'kode_pelanggan'
        },
        {
            title: 'Subtotal',
            dataIndex: 'subtotal_string'
        },
    ];
    let { tableType } = props;
    let [data, setData] = useState<IPenjualan[]>([]);
    let loadedData = useRef(false);
    const handleLoadData = () => {
        PenjualanService.getAll(null).then(resp => {
            setData(resp.data.data);
        })
    }
    useEffect(() => {
        if(!loadedData.current){
            handleLoadData();
            loadedData.current = true;    
        }
        
    }, [])
    if(tableType != undefined && tableType == 'editable'){
        columnData.push({
            title: 'Operations',
            render: (value, record, index) => {
                return(
                    <>
                        <Space direction='vertical' style={{width: '100%', textAlign: 'center'}}>
                            <Space wrap>
                                <Tooltip title="Lihat Data">
                                    <Button type="default" onClick={() => props.onPreview(record)} shape="circle">
                                        <EyeOutlined />
                                    </Button>
                                </Tooltip>
                               
                                <Tooltip title="Hapus Data">
                                    <Button type="primary" onClick={() => props.onDelete({...record, callback: handleLoadData})} style={{backgroundColor: "#f5222d"}} shape="circle">
                                        <DeleteOutlined />
                                    </Button>
                                </Tooltip>
                            </Space>
                        </Space>
                    </>
                )
            }
        });
    }else{
        columnData.push({
            title: 'Operations',
            render: (value, record, index) => {
                return(
                    <>
                        <div style={{width: '100%', textAlign: 'center'}}>
                            <Tooltip title="Lihat Data">
                                <Button type="default" shape="circle">
                                    <EyeOutlined />
                                </Button>
                            </Tooltip>
                        </div>
                    </>
                )
            }
        });
    }
    return( <Table bordered rowKey={obj => btoa(JSON.stringify(obj))} columns={columnData} dataSource={data} pagination={{pageSize: 10}} scroll={{y: 600}} /> );
}
export default TabelPenjualan;