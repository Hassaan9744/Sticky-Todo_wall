import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, message } from "antd";
// import { auth, db } from '../../../config/firebase'
import Upcoming from "../Upcoming";
import Dashboard from "../../Dashboard";
import Today from "../Today";
import Personal from "../Pesonal";
import Work from "./Work";
import Calender from "../Calender";

const { Sider, Content } = Layout;

export default function Hero() {
  const [collapsed, setCollapsed] = useState(false);

  
// const handleLogOut =()=>{
//   signOut(auth)
//   .then(()=>{
//     message.success("Sign Out successfully")
//     dispatch({ type: "SET_LOGGED_OUT" })
//   })
// }

  return (
    <>
      <Layout className="sider">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            minWidth: "250px",
            minHeight: "100vh",
            marginRight: "10px",
            background: "#b3bfb8",
            position: "static",
          }}
        >
          <div className="demo-logo-vertical" />
          <span className="float-left fs-4 fw-bold m-3">
            {collapsed ? "" : "Menu"}
          </span>
          <Button
            icon={
              collapsed ? (
                <MenuUnfoldOutlined className="fs-4 me-5" />
              ) : (
                <MenuFoldOutlined className="fs-4 me-4" />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{
              border: "1px solid transparent",
              backgroundColor: "transparent",
              float: "right",
            }}
          />
          <Menu
            style={{
              background: "#CAD9D5",
              color: "black",
              fontFamily: "Roboto",
              paddingTop: "5px",
            }}
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={[
              {
                label: collapsed ? (
                  ""
                ) : (
                  <span className="fw-bold mb-0">TASKS</span>
                ),
              },
              {
                key: "1",
                icon: <i className="fa-solid fa-forward-fast"></i>,
                label: (
                  <Link to="/upcoming" className="text-decoration-none">
                    Upcoming
                  </Link>
                ),
              },
              {
                key: "2",
                icon: <i className="fa-solid fa-list"></i>,
                label: (
                  <Link to="/today" className="text-decoration-none">
                    Today
                  </Link>
                ),
              },
              {
                key: "3",
                icon: <i className="fa-solid fa-calendar-days"></i>,
                label: (
                  <Link to="/calender" className="text-decoration-none">
                    Calendar
                  </Link>
                ),
              },
              {
                key: "4",
                icon: <i className="fa-solid fa-note-sticky"></i>,
                label: (
                  <Link to="/" className="text-decoration-none">
                    Sticky Wall
                  </Link>
                ),
              },
            ]}
          />
          <hr className="bg-dark" />
          <Menu
            style={{
              background: "#CAD9D5",
              color: "black",
              fontFamily: "Roboto",
              paddingTop: "5px",
            }}
            mode="inline"
            items={[
              {
                label: collapsed ? (
                  ""
                ) : (
                  <span className="fw-bold mb-0">LISTS</span>
                ),
              },
              {
                key: "1",
                icon: <i className="bg-danger p-2 rounded-1"></i>,
                label: (
                  <Link to="/Personal" className="text-decoration-none">
                    Personal
                  </Link>
                ),
              },
              {
                key: "2",
                icon: <i className="bg-info p-2 rounded-1"></i>,
                label: (
                  <Link to="/Work" className="text-decoration-none">
                    Work
                  </Link>
                ),
              },
              {
                key: "3",
                icon: <i className="bg-warning p-2 rounded-1"></i>,
                label: (
                  <Link to="/" className="text-decoration-none">
                    List 1
                  </Link>
                ),
              },
              {
                key: "4",
                icon: <i className="fa-solid fa-plus"></i>,
                label: (
                  <Link
                    to="/dashboard/addTask"
                    className="text-decoration-none"
                  >
                    Add new List
                  </Link>
                ),
              },
            ]}
          />
          <hr className="text-center bg-dark" />
          <Menu
            style={{
              background: "#CAD9D5",
              color: "black",
              fontFamily: "Roboto",
              marginTop: "80px",
            }}
            mode="inline"
            items={[
              {
                key: "1",
                icon: <i className="fa-solid fa-sliders"></i>,
                label: (
                  <Link to="/" className="text-decoration-none">
                    Setting
                  </Link>
                ),
              },
              {
                key: "2",
                icon: <i className="fa-solid fa-right-from-bracket"></i>,
                label: (
                  <Link to='/' className="text-decoration-none">
                    SignOut
                  </Link>
                ),
              },
            ]}
          />
        </Sider>
        <Layout>
          <h1 className="mt-2 mb-0 fw-bold" style={{ marginLeft: 30 }}>
            Sticky Wall
          </h1>
          <hr className="py-2" />
          <Content className="content-home">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/upcoming" element={<Upcoming />} />
              <Route path="/today" element={<Today />} />
              <Route path="/calender" element={<Calender />} />
              <Route path="/Personal" element={<Personal />} />
              <Route path="/Work" element={<Work />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
