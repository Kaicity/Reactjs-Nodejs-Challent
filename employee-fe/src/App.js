import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import FormTable from './components/FormTable'
import TableData from './components/TableData';

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
  const [editSection, setEditSection] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  })
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    _id: "",
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


  //Handle Submit form
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
        setFormData({
          name: "",
          email: "",
          mobile: "",
          address: "",
        })
        getFetchData()
      }
    }
    else {
      toast.error("Vui lòng nhập đầy đủ thông tin")
    }
  }

  //Handle Get all Data
  const getFetchData = async () => {
    const data = await axios.get("/")
    console.log(data)
    //Check if add data success
    if (data.data.success) {
      setDataList(data.data.data)
    }
  }

  //Handle delete data
  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id)

    if (data.data.success) {
      toast.success(data.data.message)
      getFetchData()
    }
  }

  //Handle control data binding form
  const handleEditOnchange = async (e) => {
    const { value, name } = e.target
    setFormDataEdit((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  //Handle update data
  const handleUpdate = async (e) => {
    e.preventDefault()
    const data = await axios.put("/update", formDataEdit)

    if (data.data.success) {
      toast.success(data.data.message)
      setEditSection(!editSection)
      getFetchData()
    }
  }

  //Handle edit data old will load to form
  const handleEdit = async (data) => {
    setFormDataEdit(data)
    setEditSection(!editSection)
  }


  useEffect(() => {
    getFetchData()
  }, [])

  return (
    <div className="App">
      <Notify />
      <div className="container">
        <h3>Hi, I am Thongular</h3>
        <br></br>
        <button className="btn btn-add"
          onClick={() => setAddSection(!addSection)}>
          Tạo mới
        </button>
        {
          addSection && (
            <FormTable
              handleSubmit={handleSubmit}
              handleOnchange={handleOnchange}
              handleClose={() => setAddSection(!addSection)}
              dataOld={formData}
            />
          )
        }
        {
          editSection && (
            <FormTable
              handleSubmit={handleUpdate}
              handleOnchange={handleEditOnchange}
              handleClose={() => setEditSection(!editSection)}
              dataOld={formDataEdit}
            />
          )
        }

        <TableData
          dataList = {dataList}
          handleEdit = {handleEdit}
          handleDelete = {handleDelete}
        />

      </div>
    </div>
  );
}

export default App;
