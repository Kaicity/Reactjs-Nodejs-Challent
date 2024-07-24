import React from "react";
import "../App.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

const TableData = ({ dataList, handleEdit, handleDelete }) => {
    return (
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
                    {dataList[0] ? (
                        dataList.map((dataList, index) => {
                            return (
                                <tr key={dataList._id}>
                                    <td>{index}</td>
                                    <td>{dataList.name}</td>
                                    <td>{dataList.email}</td>
                                    <td>{dataList.mobile}</td>
                                    <td>{dataList.address}</td>
                                    <td>
                                        <div className="action-container">
                                            <button className="btn-see"><FontAwesomeIcon icon={faEye}></FontAwesomeIcon></button>
                                            <button className="btn-edit" onClick={() => handleEdit(dataList)}>
                                                <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                                            </button>
                                            <button className="btn-delete" onClick={() =>
                                                handleDelete(dataList._id)
                                            }>
                                                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    )
                        : (
                            <p style={{ textAlign: "center" }}>Không có dữ liệu</p>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableData