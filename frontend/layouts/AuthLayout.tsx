import React, { useContext, useState } from 'react';
import { Layout,Menu, theme } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { CLayout, CLayoutProvider } from '../context/CLayout';
import Link from 'next/link';
export function AuthLayout(props) {
    const { Header, Sider, Content } = Layout;
    let { children } = props;
    const [current, setCurrent] = useState('/admin/pelanggan');
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);
    const route = useRouter();
    let {currentMenu, setCurrentMenu} = useContext(CLayout);
    const handleMenuClick = (e) => {
        setCurrentMenu(e.key);
        route.push(e.key);
    }
    return(
            <Layout style={{
                height: '100vh'
            }}>
                <Sider trigger={null} collapsible collapsed={collapsed} style={{minWidth: '280px'}}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[currentMenu]}
                        defaultSelectedKeys={['/admin/pelanggan']}
                        style={{
                            paddingTop: '1rem'
                        }}
                        onClick={handleMenuClick}
                        items={[
                            {key:  '/admin/pelanggan', icon: '', label: 'Pelanggan',},
                            {key:  '/admin/penjualan', icon: '', label: 'Penjualan'},
                            {key:  '/admin/barang', icon: '', label: 'Barang'}
                        ]}
                    />
                </Sider>
                <Layout className="site-layout">
                    <Header style={{ padding: '0rem 1rem', background: colorBgContainer }}>
                        {React.createElement(collapsed  ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => {setCollapsed(!collapsed)}
                        })}
                    </Header>
                    <Content
                        style={{
                            padding: '1rem 2rem',
                            height: '100%',
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
    );
}
export default AuthLayout;