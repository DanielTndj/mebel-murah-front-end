import React from "react";
import AdminNav from '../../../components/nav/AdminNav'

const SubCreate = () => {
  return (
    <div className='row'>
        <AdminNav selectedKeys='subcategory'/>
        <div className="m-5 col">
            <div class="row">
                <div class="col-md-12">Sub Create</div>
            </div>
        </div>
    </div>
  );
};

export default SubCreate;
