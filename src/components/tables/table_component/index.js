import React from 'react';
import {  Table } from 'antd';

const TableComponent = (props) => {
  const {columns,data,rowKey}=props;
  return <Table columns={columns} dataSource={data} rowKey={rowKey}/>
};
export default TableComponent;