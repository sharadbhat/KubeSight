import React, { useContext } from "react";
import { PageHeader } from "antd";

// Utils
import { Context } from "../utils/Context";

const Header = () => {
  const context = useContext(Context);
  return (
    <div>
      <PageHeader title={context.state.header} />
    </div>
  );
};

export default Header;
