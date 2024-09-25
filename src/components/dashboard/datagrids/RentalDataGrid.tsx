"use client";

import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteEquipmentById } from "@/services/equipment.api";
import { useSession } from "next-auth/react";

interface RentalDataGridProps {
  rentals: any[];
}

const RentalDataGrid: React.FC<RentalDataGridProps> = ({ rentals }) => {
  const { data: session } = useSession();
  const [rows, setRows] = useState<any[]>([]);

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
        const date = new Date(row.endDate);
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
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleDeleteClick = (id: GridRowId) => async () => {
    await deleteEquipmentById(id.toString(), session?.accessToken!);
    setRows(rows.filter((row: any) => row.id !== id));
  };

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
        slotProps={{
          toolbar: { setRows },
        }}
        pageSizeOptions={[20]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default RentalDataGrid;
