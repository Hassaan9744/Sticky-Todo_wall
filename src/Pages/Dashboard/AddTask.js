import React, { useState } from "react";
import {
  Button,
  Card,
  ColorPicker,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Typography,
  message,
} from "antd";
// import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
const { Title } = Typography;

const initialstate = { title: "", date: "", description: "" };
function AddTask() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, setState] = useState(initialstate);
  // const [value, setValue] = useState('')
  const [status, setstatus] = useState("Personal Use");
  const [color, setColor] = useState("#B1FFF4");
  const [isProcessing, setIsProcessing] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setIsProcessing(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };
  const handleDate = (_, date) => setState((s) => ({ ...s, date }));

  const handleSubmit = async () => {
    let { title, date, description } = state;

    if (title.length < 3) {
      return message.error("Your title should be atleast 3 chars");
    }
    if (!date) {
      return message.error("Please select the Date ");
    }
    if (!color) return message.error("Please select the color");
    if (description.length < 10) {
      return message.error("Please enter the detail correctly");
    }

    const todo = {
      title,
      date,
      description,
      color,
      status: status,
      dateCreated: date,
      id: Math.random().toString(36).slice(2),
    };
    setIsProcessing(true);
    try {
      await setDoc(doc(db, "todos", todo.id), todo);
      console.log("todo.id", todo.id);
      message.success("A new List added successfully");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setIsProcessing(false);
    setIsModalOpen(false);
  };
  //   const handleUpdate = async () => {
  //     setIsProcessing(true)
  //     const { title, backgroundColor, date, description, list, todoID } = state
  //     if (!title || !backgroundColor || !date || !description || !list) {
  //         setIsProcessing(false)
  //         return message.error("Fill all Inputs")
  //     }
  //     const todo = {
  //         title, backgroundColor, date, description, list, todoID,
  //         dateCreated: serverTimestamp(), createdBy: user.uid, status: "active"
  //     }
  //     try {
  //         await setDoc(doc(firestore, "todos", todoID), todo);
  //         const updatedAllTodo = showTodo.filter(item => item.todoID !== todo.todoID);
  //         updatedAllTodo.unshift(todo)
  //         setShowTodo(updatedAllTodo);
  //         setAllTodo([...allTodo, todo]);
  //         // setShowTodo([...allTodo, todo])
  //         message.success("Updtaed successfully")
  //     } catch (e) {
  //         console.error(e)
  //         message.error(" some Error In Updating Todo")
  //     }
  //     setIsProcessing(false)
  //     setIsModalOpenForUpdate(false)
  //     setState(initValue)

  // }

  return (
    <>
      <div className="conatiner-xxl g-4">
        <div className="row">
          <div className="col mx-3">
            <div className="row row-cols-1 row row-cols-sm-2 row-cols-md-3 g-4">
              <div className="col">
                <div
                  className="card "
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#F4F4F4",
                  }}
                >
                  <div
                    className="card-body d-flex justify-content-center align-items-center"
                    onClick={showModal}
                  >
                    {/* <PlusOutlined style={{ fontSize: '70px' }} /> */}
                    <i
                      className="fa-solid fa-plus text-dark"
                      style={{ fontSize: "70" }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Title level={2} className="text-center my-3">
          Add List
        </Title>

        <Divider />
        <Form layout="vertical">
          <Form.Item label="Select your List">
            <Select
              defaultValue="PersonalUse"
              value={status}
              onChange={(value) => {
                setstatus(value);
              }}
              options={[
                {
                  value: "Personal Use",
                  label: "Personal Use",
                },
                {
                  value: "Public Work",
                  label: "Public Work",
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="Title here:">
            <Input
              type="text"
              placeholder="Input your Field"
              name="title"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Select Date:">
            <DatePicker
              name="date"
              placeholder="select date"
              className="w-100"
              onChange={handleDate}
            />
          </Form.Item>
          <Form.Item label="Select Color:">
            <ColorPicker
              value={color}
              onChange={(e, color) => {
                setColor(color);
              }}
            />
          </Form.Item>
          {/* <Form.Item label="List Description:">
            <ReactQuill theme="snow" value={value} onChange={setValue} />
            <div dangerouslySetInnerHTML={{ __html: value }}></div>
          </Form.Item> */}
          <Form.Item label="Detail here:">
            <Input.TextArea
              type="text"
              placeholder="Detail here about your Title"
              name="description"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-100"
              onClick={handleSubmit}
            >
              {!isProcessing ? (
                "Add List"
              ) : (
                <div className="spinner-border spinner-border-sm"></div>
              )}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default AddTask;
