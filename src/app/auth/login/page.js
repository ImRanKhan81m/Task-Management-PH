'use client'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import Image from 'next/image';
import loginImage from '/public/assets/3891948.jpg';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const login = () => {
    const router = useRouter();

    const handleSubmit = (values) => {
        // set email on local storage
        localStorage.setItem('email', values.email);
        // redirect to dashboard
        router.push('/');
        toast.success('Login Successfully');
    };


    return (
        <div className='flex max-h-[100%] w-[100%] justify-center items-center gap-20'>
            <div className='w-[50%]'>
                <Image
                    src={loginImage}
                    alt="logo"
                    width={1200}
                    height={1200}
                    className='object-cover w-[100%] h-max-[100%]'
                />
            </div>
            <div className='w-[50%] mx-auto'>
                <div className='w-[80%] mx-auto'>
                    <h1 className='text-3xl font-bold mb-5 '>Login Your Account </h1>

                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={handleSubmit}
                    >
                        <h1 className=' mb-2'>Email</h1>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your Email!' }]}
                        >

                            <Input className='h-10' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Enter your email" />
                        </Form.Item>
                        <h1 className=' mb-2'>Password</h1>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >

                            <Input className='h-10'
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default login;