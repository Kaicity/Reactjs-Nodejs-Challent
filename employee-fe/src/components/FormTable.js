import React from "react";
import "../App.css"

const FormTable = ({ handleSubmit, handleOnchange, handleClose, dataOld }) => {
    return (
        <div className="add-container">
            <form onSubmit={handleSubmit}>
                <div className="content-title">
                    <h2>Thêm nhân viên</h2>
                    <div className="btn-close"
                        onClick={handleClose}
                    > <h3>-</h3>
                    </div>
                </div>
                <label htmlFor="name">Họ tên: </label>
                <input type="text" id="name" name="name" onChange={handleOnchange} value={dataOld.name} />

                <label htmlFor="email">Email: </label>
                <input type="text" id="email" name="email" onChange={handleOnchange} value={dataOld.email} />

                <label htmlFor="mobile">Số điện thoại: </label>
                <input type="number" id="mobile" name="mobile" onChange={handleOnchange} value={dataOld.mobile} />

                <label htmlFor="address">Địa chỉ hiện tại: </label>
                <textarea id="address" name="address" onChange={handleOnchange} value={dataOld.address} />
                <button className="btn-submit">Lưu thông tin</button>
            </form>
        </div>
    )
}

export default FormTable