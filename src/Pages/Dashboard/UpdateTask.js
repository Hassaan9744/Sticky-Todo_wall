import React, { useEffect, useState } from 'react'
import { Card } from 'antd'
import dayjs from 'dayjs'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../config/firebase'

export default function UpdateTask() {
    const [documents, setDocuments] = useState([])
    var today = new Date();

    const getTodos = async () => {
        const q = query(collection(db, "todos"))
        const querySnapshot = await getDocs(q);
        const array = []
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            array.push(data)
        });
        setDocuments(array)
    }
    useEffect(() => {
        getTodos()
                console.log()
    }, [getTodos])

    return (
        <>
            
                
                    {documents.map((todo, i) => {
                        return (
                           
                            <Card
                                key={i}
                                className={"col-12 col-md-3 col-lg-3 m-3 p-2"}
                                bordered={false}
                                style={{
                                    minHeight: '300px',
                                    backgroundColor: todo.color,
                                    // position: 'relative',1
                                    fontFamily: 'Roboto'
                                }}
                            >
                                <h4 style={{dispaly:"inline"}}><b>{todo.title}</b></h4>
                                <p><b>{todo.status}</b></p>
                                <p style={{ overflow: 'auto' }}>{todo.description}</p>
                                <p style={{ position: 'absolute', marginRight: '50px', bottom: '5px' }} className='mt-3'><b>{todo.date ? dayjs(todo.date).format("dddd, DD/MM/YYYY") : ""}</b></p>
                            </Card >
                        )
                    })}
               
                <h1>Upcoming</h1>
            
        </>
    )
}
