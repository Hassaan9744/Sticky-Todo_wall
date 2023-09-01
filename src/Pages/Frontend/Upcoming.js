import React, { useEffect, useState } from "react";
import { Card, message } from "antd";
import { db } from "../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import dayjs from "dayjs";

export default function UpComing() {
  const [documents, setDocuments] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const myDate = new Date();
  const exactDate = dayjs(myDate).format("YYYY-MM-DD");

  const getTodos = async () => {
    try {
      const q = query(collection(db, "todos"), where("date", ">", exactDate));
      const querySnapshot = await getDocs(q);
      const array = [];
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        array.push(data);
      });
      setDocuments(array);
    } catch (err) {
      message.error("Up coming date not found");
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      {!isProcessing ? (
        <main className="d-flex justify-content-center align-items-center bg-white">
          <div
            className="spinner-border text-info"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          ></div>
        </main>
      ) : (
        <div className="container-fluid">
          <div className="row text-center">
            <div className="col my-4" style={{background: ' grey'}}>
              <h1 style={{color :'black', fontSize:' bold'}}>UpComing Todos</h1>
            </div>
          </div>
          <div
            className="row"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8%",
            }}
          >
            <>
              <div className="conatiner-xxl">
                <div className="row">
                  <div className="col mx-3">
                    <div className="row row-cols-1 row row-cols-sm-2 row-cols-md-3 g-4">
                      {documents.map((todo, i) => {
                        return (
                          <div className="col" key={todo.todoid}>
                            <div
                              className="card  square-card"
                              style={{
                                width: "100%",
                                height: "100%",
                                backgroundColor: todo.color,
                              }}
                            >
                              <div className="card-body">
                                <div className="d-flex justify-content-between">
                                  <h5 className="card-title">{todo.title} </h5>
                                  <div></div>
                                </div>
                                <p className="card-text">{todo.description}</p>
                                <p>
                                  {" "}
                                  <span className="fw-bold">Date:</span>
                                  {todo.date}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
      )}
    </>
  );
}
