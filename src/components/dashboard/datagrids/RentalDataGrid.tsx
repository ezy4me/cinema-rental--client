"use client";

import React, { useState, useEffect } from "react";
import { Box, Modal, Typography } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import { Inventory } from "@mui/icons-material";
import { getUserRentals } from "@/services/rental.api";
import UserRentals from "../Rentals/UserRentals";

interface RentalDataGridProps {
  rentals: any[];
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 600,
  overflow: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  color: "#000",
  p: 4,
};

const RentalDataGrid: React.FC<RentalDataGridProps> = ({ rentals }) => {
  const [rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [userRentals, setUserRentals] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUserRentals = async (userId: number, firstName: string, id: any) => {
    const allRentals = await getUserRentals(userId);
    
    const filteredRentals = allRentals.filter((rental: any) => rental.id === id);

    setUserRentals(filteredRentals); 
    setSelectedUser(firstName); 
    handleOpen();
  };

  useEffect(() => {
    if (rentals) {
      setRows(rentals);
    }
  }, [rentals]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "Клиент",
      width: 150,
      editable: true,
      valueGetter: (value, row) => {
        if (!row.user) {
          return null;
        }
        return (
          row.user.customer.firstName +
          " " +
          row.user.customer.secondName +
          " " +
          row.user.customer.lastName
        );
      },
    },
    {
      field: "email",
      headerName: "Почта",
      width: 150,
      editable: true,
      valueGetter: (value, row) => {
        if (!row.user) {
          return null;
        }
        return row.user.email;
      },
    },
    {
      field: "phone",
      headerName: "Телефон",
      width: 150,
      editable: true,
      valueGetter: (value, row) => {
        if (!row.user) {
          return null;
        }
        return row.user.customer.phone;
      },
    },
    {
      field: "totalAmount",
      headerName: "Стоимость",
      sortable: true,
      width: 160,
    },
    {
      field: "startDate",
      headerName: "Начало",
      sortable: true,
      width: 160,
      valueGetter: (value, row) => {
        const date = new Date(row.startDate);
        return date.toLocaleDateString();
      },
    },
    {
      field: "endDate",
      headerName: "Конец",
      sortable: true,
      width: 160,
      valueGetter: (value, row) => {
        const date = new Date(row.endDate);
        return date.toLocaleDateString();
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
            onClick={() => handleUserRentals(row.user.id, row.user.customer.firstName, id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div>
      <Typography color="#000" variant="h4" gutterBottom>
        Заказы CRS
      </Typography>
      <DataGrid
        rows={rows}
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

export default RentalDataGrid;
