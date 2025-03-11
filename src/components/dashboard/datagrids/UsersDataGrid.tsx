"use client";

import React, { useState, useEffect } from "react";
import { Typography, Modal, Box } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Inventory, Delete } from "@mui/icons-material";
import { getCustomers } from "@/services/customer.api"; 
import { deleteUserById } from "@/services/user.api"; 
import { useSession } from "next-auth/react";
import UserRentals from "../Rentals/UserRentals";
import { getUserRentals } from "@/services/rental.api";

const style = {
  position: "absolute" as const,
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

const UsersDataGrid: React.FC = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<any[]>([]); 
  const [userRentals, setUserRentals] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");

  useEffect(() => {
    const fetchCustomers = async () => {
      if (session?.accessToken) {
        const customers = await getCustomers(session?.accessToken);
        setUsers(customers);
      }
    };

    fetchCustomers();
  }, [session?.accessToken]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUserRentals = async (id: any, firstName: string) => {
    const rentals = await getUserRentals(parseInt(id));
    setUserRentals(rentals);
    setSelectedUser(firstName);
    handleOpen();
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUserById(id, session?.accessToken!);
      setUsers((prevRows) =>
        prevRows.filter((row) => row.user.id !== id)
      );
    } catch (error) {
      console.error("Ошибка при удалении пользователя:", error);
    }
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
            key={id}
            icon={<Inventory />}
            label="Просмотр аренды"
            onClick={() => handleUserRentals(row.user.id, row.firstName)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={`delete-${id}`}
            icon={<Delete />}
            label="Удалить"
            onClick={() => handleDeleteUser(row.user.id)} // Обработчик удаления
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
