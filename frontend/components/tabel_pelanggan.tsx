import React, {useEffect, useRef, useState} from 'react';
import { Table,Button, Tooltip, Space } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import IPelanggan from '../Interfaces/interface_pelanggan';
import { PelangganService } from '../Services/PelangganService';
export const TabelPelanggan = (props:any) => {
    let columnData:ColumnsType = [
        {
            title: 'ID',
            dataIndex: 'id_pelanggan'
        },
        {
            title: 'Nama',
            dataIndex: 'nama'
        },
        {
            title: 'Domisili',
            dataIndex: 'domisili'
        },
        {
            title: 'Jenis Kelamin',
            dataIndex: 'jenis_kelamin'
        },
    ];
    let { tableType } = props;
    let [data, setData] = useState<IPelanggan[]>([]);
    let loadedData = useRef(false);
    const [q, setQ]= useState({
        limit: 10,
        page: 1,
        q: ''
    })
    const handleLoadData = () => {
        PelangganService.getAll(q).then(resp => {
            setData(resp.data.data);
        })
    }
    useEffect(() => {
        if(!loadedData.current){
            handleLoadData();
            loadedData.current = true;
        }
        
    }, []);
    if(tableType != undefined && tableType == 'editable'){
        columnData.push({
            title: 'Operations',
            render: (value, record, index) => {
                let recordProps = record as object;
                return(
                    <>
                        <Space direction='vertical' style={{width: '100%', textAlign: 'center'}}>
                            <Space wrap>
                                <Tooltip title="Lihat Data">
                                    <Button onClick={() =>  props.onPreview(recordProps)} type="default" shape="circle">
                                        <EyeOutlined />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Edit Data">
                                    <Button type="primary" onClick={() =>  props.onEdit(recordProps)}  style={{backgroundColor: "#52c41a"}} shape="circle">
                                        <EditOutlined />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Hapus Data">
                                    <Button type="primary" onClick={() =>  props.onDelete({...recordProps, callback: handleLoadData})}  style={{backgroundColor: "#f5222d"}} shape="circle">
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
                                <Button onClick={() =>  props.onPreview(record)}  type="primary" shape="circle">
                                    <EyeOutlined />
                                </Button>
                            </Tooltip>
                        </div>
                    </>
                )
            }
        });
    }
    return( <Table bordered rowKey={obj=>btoa(JSON.stringify(obj))} columns={columnData} dataSource={data} pagination={{pageSize: 10}} scroll={{y: 500}} /> );
}
export default TabelPelanggan;