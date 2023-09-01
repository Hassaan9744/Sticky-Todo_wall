import { Button, Divider, Form, Typography, Input } from 'antd'
import React, { useState } from 'react'
const { Title } = Typography

export default function Login() {
  const [state, setState] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handleRegister = () => {

    setIsProcessing(true)
    setTimeout(() => {
      console.log('state', state)
      setIsProcessing(false)
    }, 3000);
  }
  return (
    <>
      <main className='d-flex justify-content-center align-items-center'>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-6 offset-lg-3">
              <div className="card border-0 rounded-3 p-3 p-md-4" style={{ boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
                <Title level={1} className='m-0 my-4 text-center'>Login</Title>

                <Divider />

                <Form layout="vertical">
                  <Form.Item label="Email">
                    <Input placeholder='Input your email' name='email' onChange={handleChange} />
                  </Form.Item>
                  <Form.Item label="Password">
                    <Input.Password placeholder='Input your password' name='password' onChange={handleChange} />
                  </Form.Item>
                  <Button type='primary' htmlType='submit' className='w-100 my-4' disabled={isProcessing} onClick={handleRegister}>
                    {!isProcessing
                      ? "Login here"
                      : <div className='spinner-border spinner-border-sm'></div>
                    }
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
