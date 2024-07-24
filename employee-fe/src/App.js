import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

axios.defaults.baseURL = "http://localhost:1620/"


function Notify() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
  )
}

function App() {
  const [addSection, setAddSection] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  })
  const [dataList, setDataList] = useState([])

  const handleOnchange = (e) => {
    const { value, name } = e.target
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }


  //Submit form
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.name.trim() !== "" || formData.email.trim() !== ""
      || formData.mobile.trim() !== "" || formData.address.trim() !== "") {
      const data = await axios.post("/create", formData)
      console.log(data)
      //Check if add data success
      if (data.data.success) {
        toast.success(data.data.message)
        setAddSection(!addSection)
      }
    }
    else {
      toast.error("Vui lòng nhập đầy đủ thông tin")
    }
  }

  //Get all Data
  const fetchData = async () => {
    const data = await axios.get("/")
    console.log(data)
    //Check if add data success
    if (data.data.success) {
      setDataList(data.data.data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="App">
      <Notify />
      <div className="container">
        <button className="btn btn-add"
          onClick={() => setAddSection(!addSection)}>
          Tạo mới
        </button>
        {addSection && (
          <div className="add-container">
            <form onSubmit={handleSubmit}>
              <div className="content-title">
                <h2>Thêm nhân viên</h2>
                <div className="btn-close"
                  onClick={() => setAddSection(!addSection)}
                > <h3>-</h3>
                </div>
              </div>
              <label htmlFor="name">Họ tên: </label>
              <input type="text" id="name" name="name" onChange={handleOnchange} />

              <label htmlFor="email">Email: </label>
              <input type="text" id="email" name="email" onChange={handleOnchange} />

              <label htmlFor="mobile">Số điện thoại: </label>
              <input type="number" id="mobile" name="mobile" onChange={handleOnchange} />

              <label htmlFor="address">Địa chỉ hiện tại: </label>
              <textarea id="address" name="address" onChange={handleOnchange} />
              <button className="btn-submit">Lưu thông tin</button>
            </form>
          </div>
        )}

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Họ Tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {
                dataList.map((dataList, index) => {
                  return (
                    <tr>
                      <td>{index}</td>
                      <td>{dataList.name}</td>
                      <td>{dataList.email}</td>
                      <td>{dataList.mobile}</td>
                      <td>{dataList.address}</td>
                      <td>
                        <div className="action-container">
                          <button className="btn-see"><FontAwesomeIcon icon={faEye}></FontAwesomeIcon></button>
                          <button className="btn-edit" onClick={() => setAddSection(!addSection)}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>
                          <button className="btn-delete"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default App;
