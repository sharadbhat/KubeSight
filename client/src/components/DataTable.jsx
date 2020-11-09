import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Table } from "antd";
import { v4 as uuid } from "uuid";

class DataTable extends Component {
  render() {
    return (
      <div>
        <Table
          scroll={{ y: "70vh" }}
          columns={this.props.columns}
          dataSource={this.props.data}
          bordered
          rowKey={uuid()}
          pagination={
            this.props.data.length < 11 ? false : { position: ["bottomCenter"] }
          }
        />
      </div>
    );
  }
}

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default DataTable;
