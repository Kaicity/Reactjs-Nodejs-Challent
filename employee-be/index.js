const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 1620

//Create the Schema in MongoDB
const schemaData = mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    address: String
},
    { timestamps: true }
)

//Entity Model MongooseModel
const employeeModel = mongoose.model("employee", schemaData)

//APIs
//http://localhost:1620/
//Read || get all employees
app.get("/", async (req, res) => {
    const data = await employeeModel.find({})

    res.json({ success: true, data: data })
})


//Create employee || save data
//http://localhost:1620/create
/*
    body
    {
        "name": "TRUNG QUÂN IDOL",
        "email": "TQIDOL@gmail.com",
        "mobile" : "09233983844"
    }
*/
app.post("/create", async (req, res) => {
    console.log(req.body)
    const data = new employeeModel(req.body)
    await data.save();

    res.send(
        {
            success: true,
            message: "Lưu dữ liệu thành công",
            data: data
        }
    )
})


//update employee
//http://localhost:1620/update
/*
    body
    {
        "id": "669ff8f94b662b102f3ecaa9",F
        "name": "Nguyễn Minh Thông",
        "email": "nguyenminhhthongitmix@gmail.com",
        "mobile" : "0703338458"
    }
*/
app.put("/update", async (req, res) => {
    console.log(req.body)
    const { _id, ...rest } = req.body
    await employeeModel.updateOne({ _id: req.body._id }, rest)

    res.send(
        {
            success: true,
            message: "Cập nhật dữ liệu thành công"
        }
    )
})

//delete employee
//http://localhost:1620/delete
/*
    parameter

    http://localhost:1620/delete/{id}
*/
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    console.log(id)
    const data = await employeeModel.deleteOne({ _id: id })
    res.send(
        {
            success: true,
            message: "Xóa dữ liệu thành công",
            data: data
        }
    )
})


//connect server to database mongodb
mongoose.connect("mongodb://127.0.0.1:27017/empcrud")
    .then(() => {
        console.log("Connect to Database")
        app.listen(PORT, () => console.log("Server is running..."))
    })
    .catch((err) => console.log(err))