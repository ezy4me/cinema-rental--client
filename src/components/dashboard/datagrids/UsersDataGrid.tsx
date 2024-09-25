"use client";

import React from "react";
import { Typography } from "@mui/material";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface UsersDataGridProps {
  users: any[];
}

const UsersDataGrid: React.FC<UsersDataGridProps> = async ({ users }) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "Имя",
      width: 150,
      editable: true,
    },
    {
      field: "secondName",
      headerName: "Фамилия",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Отчество",
      width: 110,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Телефон",
      sortable: false,
      width: 160,
    },
    {
      field: "user",
      headerName: "Почта",
      sortable: false,
      width: 160,
      valueGetter: (value, row) => {
        if (!row.user) {
          return null;
        }
        return row.user.email;
      },
    },
  ];

  return (
    <div>
      <Typography color="#000" variant="h4" gutterBottom>
        Пользователи CRS
      </Typography>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[20]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default UsersDataGrid;
