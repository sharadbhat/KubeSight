import React from "react";
import { useLocation } from "react-router-dom";
import { PageHeader } from "antd";

import pathMap from "../utils/pathMap.json";

const Header = () => {
  let location = useLocation();

  console.log(location.pathname);

  return (
    <div>
      <PageHeader title={pathMap[location.pathname].stylizedName} />
    </div>
  );
};

export default Header;
