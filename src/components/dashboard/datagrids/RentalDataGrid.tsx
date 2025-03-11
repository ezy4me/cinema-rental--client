"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Modal,
  Typography,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Inventory, Edit, Download } from "@mui/icons-material";
import {
  getUserRentals,
  updateRentalStatus,
  getRentalDocument,
} from "@/services/rental.api";
import UserRentals from "../Rentals/UserRentals";
import { getStatuses } from "@/services/status.api";
import { useSession } from "next-auth/react";

interface RentalDataGridProps {
  rentals: any[];
}

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

const RentalDataGrid: React.FC<RentalDataGridProps> = ({ rentals }) => {
  const { data: session } = useSession();
  const [rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [userRentals, setUserRentals] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedRentalId, setSelectedRentalId] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [statuses, setStatuses] = useState<any[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenStatusModal = (rentalId: any) => {
    setSelectedRentalId(rentalId);
    setOpenStatusModal(true);
  };

  const handleCloseStatusModal = () => setOpenStatusModal(false);

  const handleUserRentals = async (
    userId: number,
    firstName: string,
    id: any
  ) => {
    const allRentals = await getUserRentals(userId);
    const filteredRentals = allRentals.filter(
      (rental: any) => rental.id === id
    );
    setUserRentals(filteredRentals);
    setSelectedUser(firstName);
    handleOpen();
  };

  const handleUpdateStatus = async () => {
    if (selectedRentalId && selectedStatus !== null) {
      try {
        await updateRentalStatus(
          selectedRentalId,
          selectedStatus,
          session?.accessToken!
        );
        const updatedStatus = statuses.find(
          (status) => status.id === selectedStatus
        );

        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === selectedRentalId
              ? {
                  ...row,
                  statusId: selectedStatus,
                  status: updatedStatus,
                }
              : row
          )
        );
      } catch (error) {
        console.error("Ошибка при обновлении статуса аренды:", error);
      }
    }
    handleCloseStatusModal();
  };

  useEffect(() => {
    if (rentals) {
      setRows(rentals);
    }
  }, [rentals]);

  useEffect(() => {
    if (openStatusModal) {
      const fetchStatuses = async () => {
        try {
          const statusesData = await getStatuses();
          setStatuses(statusesData);
        } catch (error) {
          console.error("Ошибка при загрузке статусов", error);
        }
      };

      fetchStatuses();
    }
  }, [openStatusModal]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Создан":
        return "gray";
      case "Оплачен":
        return "green";
      case "Отменен":
        return "red";
      default:
        return "black";
    }
  };

  const handleDownloadDocument = async (rentalId: any) => {
    if (session?.accessToken) {
      try {
        await getRentalDocument(rentalId, session.accessToken);
      } catch (error) {
        console.error("Ошибка при скачивании документа аренды:", error);
      }
    }
  };
  

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "Клиент",
      width: 150,
      editable: false,
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
      editable: false,
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
      editable: false,
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
      field: "status",
      headerName: "Статус",
      width: 150,
      editable: false,
      valueGetter: (value, row) => {
        if (!row.status) {
          return null;
        }
        return row.status.name;
      },
      renderCell: (params) => {
        const status = params.value;
        const statusColor = getStatusColor(status);
        return (
          <Typography
            style={{
              color: statusColor,
              textAlign: "left",
              marginTop: 12,
              textTransform: "uppercase",
            }}>
            {status}
          </Typography>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Действия",
      cellClassName: "actions",
      width: 250,
      getActions: ({ id, row }) => {
        return [
          <GridActionsCellItem
            key={id}
            icon={<Inventory />}
            label="Просмотр аренды"
            onClick={() =>
              handleUserRentals(row.user.id, row.user.customer.firstName, id)
            }
            color="inherit"
          />,
          <GridActionsCellItem
            key={`${id}-status`}
            icon={<Edit />}
            label="Изменить статус"
            onClick={() => handleOpenStatusModal(id)}
            color="primary"
          />,
          <GridActionsCellItem
            key={`${id}-download`}
            icon={<Download />}
            label="Скачать документ"
            onClick={() => handleDownloadDocument(id)}
            color="default"
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

      {/* Модальные окна */}
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

      <Modal
        open={openStatusModal}
        onClose={handleCloseStatusModal}
        aria-labelledby="modal-status-title">
        <Box sx={{ ...style, width: 300, height: "auto" }}>
          <Typography id="modal-status-title" variant="h6">
            Изменить статус аренды
          </Typography>
          <Select
            fullWidth
            value={selectedStatus || ""}
            onChange={(e) => setSelectedStatus(Number(e.target.value))}
            sx={{ mt: 2, mb: 2 }}>
            {statuses.length > 0 ? (
              statuses.map((status) => (
                <MenuItem key={status.id} value={status.id}>
                  {status.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Загрузка статусов...</MenuItem>
            )}
          </Select>
          <Button
            sx={{ backgroundColor: "#000", color: "#fff", width: "100%" }}
            color="primary"
            onClick={handleUpdateStatus}>
            Сохранить
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default RentalDataGrid;
