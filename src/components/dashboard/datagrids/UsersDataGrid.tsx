"use client";

import React, { useState } from "react";
import { Typography, Button, Modal, Box, Grid, colors } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Inventory } from "@mui/icons-material";
import { getUserRentals } from "@/services/rental.api";
import UserRentals from "../Rentals/UserRentals";

interface UsersDataGridProps {
  users: any[];
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 600,
  overflow: 'auto',
  bgcolor: "background.paper",
  boxShadow: 24,
  color: "#000",
  p: 4,
};

const UsersDataGrid: React.FC<UsersDataGridProps> = ({ users }) => {
  const [open, setOpen] = useState(false);
  const [userRentals, setUserRentals] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUserRentals = async (id: any, firstName: string) => {
    const rentals = await getUserRentals(parseInt(id));
    console.log(rentals);

    setUserRentals(rentals);
    setSelectedUser(firstName);
    handleOpen();
  };

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
    {
      field: "actions",
      type: "actions",
      headerName: "Действия",
      cellClassName: "actions",
      width: 200,
      getActions: ({ id, row }) => {
        return [
          <GridActionsCellItem
            icon={<Inventory />}
            label="Просмотр аренды"
            onClick={() => handleUserRentals(row.user.id, row.firstName)}
            color="inherit"
          />,
        ];
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description">
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            АРЕНДА ПОЛЬЗОВАТЕЛЯ: {selectedUser}
          </Typography>
          <Box id="modal-description" sx={{ mt: 2 }}>
            {userRentals.length > 0 ? (
              <UserRentals rentals={userRentals} />
            ) : (
              <Typography>Аренд не найдено</Typography>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default UsersDataGrid;
