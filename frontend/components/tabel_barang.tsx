import React, {useEffect, useRef, useState} from 'react';
import { Table,Button, Tooltip, Space } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import IBarang from '../Interfaces/interface_barang';
import { BarangService } from '../Services/BarangService';
export const TabelBarang = (props:any) => {
    let columnData:ColumnsType = [
        {
            title: 'Kode',
            dataIndex: 'kode'
        },
        {
            title: 'Nama',
            dataIndex: 'nama'
        },
        {
            title: 'kategori',
            dataIndex: 'kategori'
        },
        {
            title: 'harga',
            dataIndex: 'harga'
        },
    ];
    let { tableType } = props;
    let [data, setData] = useState<IBarang[]>([
       
    ]);
    let dataLoaded = useRef(false);
    useEffect(() => {
        if(!dataLoaded.current){
            handleLoadData();
            dataLoaded.current = true;
        }
        
    }, [])
    const handleLoadData = () => {
            BarangService.getAll(null).then(resp => {
                setData(resp.data.data);
            })
        
    }
    if(tableType != undefined && tableType == 'editable'){
        columnData.push({
            title: 'Operations',
            render: (value, rec, index) => {
                let record = rec as object;
                return(
                    <>
                        <Space key={index} direction='vertical' style={{width: '100%', textAlign: 'center'}}>
                            <Space wrap>
                                <Tooltip title="Lihat Data">
                                    <Button key={"lihat"+index} onClick={() => props.onPreview(record)} type="default" shape="circle">
                                        <EyeOutlined />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Edit Data">
                                    <Button key={"edit"+index} onClick={() => props.onEdit(record)} type="primary" style={{backgroundColor: "#52c41a"}} shape="circle">
                                        <EditOutlined />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Hapus Data">
                                    <Button key={"hapus"+index} type="primary" onClick={() => props.onDelete({...record, callback: handleLoadData})} style={{backgroundColor: "#f5222d"}} shape="circle">
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
                                <Button type="primary" shape="circle">
                                    <EyeOutlined />
                                </Button>
                            </Tooltip>
                        </div>
                    </>
                )
            }
        });
    }
    return( <Table bordered columns={columnData} rowKey={obj => btoa(JSON.stringify(obj))} dataSource={data} pagination={{pageSize: 10}} scroll={{y: 500}} /> );
}
export default TabelBarang;