import React, { useEffect, useState } from "react";
import { Button, Card, Dropdown, Menu, message } from "antd";
// import dayjs from "dayjs";
import { Firestore, collection, getDocs, query } from "firebase/firestore";
import { db } from "../../config/firebase";
import { DeleteOutlined, MoreOutlined, EditOutlined } from "@ant-design/icons";
import { Await } from "react-router-dom";

export default function ShowTask() {
  const [documents, setDocuments] = useState([]);
  const [doc, setDoc] = useState([]);
  const [showTodo, setShowTodo] = useState([]);
  const [allDocuments, setAllDocuments] = useState([]);
  // const [status, SetStatus] = useState("Personal Use")

  const getTodos = async () => {
    const q = query(collection(db, "todos"));
    const querySnapshot = await getDocs(q);
    // const docSnap = await getDocs(q);
    const array = [];
    // docSnap.forEach((doc) => {
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      array.push(data);
    });
    setAllDocuments(array);
    setDocuments(array);
  };

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
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
                          <div>
                            <Dropdown
                              overlay={
                                <Menu>
                                  <Menu.Item key="1">
                                    <Button
                                      icon={<EditOutlined />}
                                      // onClick={() => {
                                      //    setIsModalOpenForUpdate(true);
                                      //   setState(todo);
                                      // }}
                                    >
                                      Update Todo
                                    </Button>
                                  </Menu.Item>
                                  <Menu.Item key="2">
                                    <Button
                                      dange
                                      r
                                      icon={<DeleteOutlined />}
                                      onClick={async () => {
                                        let deletedTodo = {
                                          ...todo,
                                          status: "deleted",
                                        };
                                        try {
                                          await setDoc(
                                            doc(
                                              Firestore,
                                              "todos",
                                              todo.id
                                            ),
                                            deletedTodo
                                          );
                                          message.success(
                                            "Deleted Todo successfully"
                                          );
                                          const updatedAllTodo =
                                            showTodo.filter(
                                              (item) => item.id !== todo.id
                                            );
                                          setShowTodo(updatedAllTodo);
                                        } catch (e) {
                                          console.error(e);
                                          message.error(
                                            "Some Error In Deleting Todo"
                                          );
                                        }
                                      }}
                                    >
                                      Delete Todo
                                    </Button>
                                  </Menu.Item>
                                </Menu>
                              }
                            >
                              <a onClick={(e) => e.preventDefault()}>
                                <MoreOutlined
                                  size={50}
                                  style={{ color: "white" }}
                                />
                              </a>
                            </Dropdown>
                          </div>
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
  );
}
