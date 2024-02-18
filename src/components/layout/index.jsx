import React, { useState } from "react";
import Content from "../content";
import Header from "../header";
import "./index.scss";

function Layout() {
  const [selectedCompany, setSelectedCompany] = useState("po");

  return (
    <div>
      <Header selectedCompany={selectedCompany} />
      <Content
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
      />
    </div>
  );
}

export default Layout;
