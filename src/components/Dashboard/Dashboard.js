'use client'

import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { AppstoreOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/app/hooks/ProtectedRoute';
const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
    (icon, index) => ({
        key: String(index + 1),
        icon: React.createElement(icon),
        label: `nav ${index + 1}`,
    }),
);
const Dashboard = ({ children }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const router = useRouter();

    return (
        <ProtectedRoute>
            <Layout style={{
                minHeight: '100vh',
                // height: '100vh',
            }}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}

                >
                    <div className="sider-content">
                        <h1 className='text-white text-center pb-8 mt-5 text-xl'>Task Manager PH</h1>
                        <div className="demo-logo-vertical" />
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['projects']}
                            items={[
                                {
                                    key: 'projects',
                                    icon: <  AppstoreOutlined />,
                                    label: 'Dashboard',
                                    onClick: () => router.push('/projects'),
                                },
                            ]}
                        />
                    </div>
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    />
                    <Content
                        // className='bg-[#2d285a]'
                        style={{
                            margin: '24px 16px 0',
                        }}
                    >
                        <div
                            style={{
                                padding: 24,
                                minHeight: '80vh',
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            {children}
                        </div>
                    </Content>
                    <Footer

                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Copyright ©{new Date().getFullYear()} Design & Developed by Imran Hossen
                    </Footer>
                </Layout>
            </Layout>
        </ProtectedRoute>
    );
};
export default Dashboard;