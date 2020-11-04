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
          scroll={{ y: "80vh" }}
          columns={this.props.columns}
          dataSource={this.props.data}
          bordered
          pagination={false}
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