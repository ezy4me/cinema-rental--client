import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#000" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <TopBar />
        <Box sx={{ flexGrow: 1, p:4, backgroundColor: "#ffffff", mt: 8 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
