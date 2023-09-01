import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Frontend from './Home'
import Auth from './Auth'
import Dashboard from './Dashboard'
import UpdateTask from './Dashboard/UpdateTask'

export default function Index() {
    return (
        <>
            {/* <Header /> */}
            <Routes>
                <Route path='/*' element={<Frontend />} />
                <Route path='/auth/*' element={<Auth />} />
                <Route path='/dashboard/*' element={<Dashboard />} />
                <Route path='/update' element={<UpdateTask />} />
            </Routes>
            {/* <Footer /> */}
        </>
    )
}
