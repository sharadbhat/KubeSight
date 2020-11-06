import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Table } from "antd";

class DataTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Table
          scroll={{ y: "70vh" }}
          columns={this.props.columns}
          dataSource={this.props.data}
          bordered
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
