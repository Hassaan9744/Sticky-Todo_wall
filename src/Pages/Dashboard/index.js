import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddTask from './AddTask'
import UpdateTask from './UpdateTask'
import ShowTask from './ShowTask'

export default function index() {
    return (
        <>
            {/* <Routes>
                <Route path='/addTask' element={<AddTask />} />
                <Route path='/showTask' element={<ShowTask />} />
                <Route path='/updateTask' element={<UpdateTask />} />
            </Routes> */}
            <ShowTask />
            <AddTask />

        </>
    )
}
