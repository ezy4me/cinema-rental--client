"use client";

import React, { useState, useEffect } from "react";
import { Button, Stack, Typography } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  gridClasses,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import { fetchImageUrl } from "@/utils/fetchImageUrl";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteEquipmentById, getEquipments } from "@/services/equipment.api";
import { useSession } from "next-auth/react";
import ConfirmDelete from "../ConfirmDelete";
import EquipmentForm from "../Equipment/EquipmentForm";
import EditEquipmentForm from "../Equipment/EditEquipmentForm";

const EquipmentDataGrid: React.FC = () => {
  const { data: session } = useSession();
  const [rows, setRows] = useState<any[]>([]);
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [selectedEquipmentForEdit, setSelectedEquipmentForEdit] =
    useState<any>(null);

  const fetchData = async () => {
    const equipments = await getEquipments();
    setRows(equipments);
  };

  const loadImageUrls = async () => {
    const urls: { [key: string]: string } = {};
    for (const equipment of rows) {
      try {
        const url = await fetchImageUrl(equipment.fileId);
        urls[equipment.id] = url;
      } catch (error) {
        console.error("Ошибка загрузки изображения", error);
      }
    }
    setImageUrls(urls);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (rows.length) {
      loadImageUrls();
    }
  }, [rows]);

  const handleDeleteClick = (id: GridRowId) => () => {
    const equipment = rows.find((row) => row.id === id);
    setSelectedEquipment(equipment);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedEquipment) {
      await deleteEquipmentById(
        selectedEquipment.id.toString(),
        session?.accessToken!
      );
      setRows((prevRows) =>
        prevRows.filter((row) => row.id !== selectedEquipment.id)
      );
    }
    setDeleteOpen(false);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const handleEditClick = (equipment: any) => () => {
    setSelectedEquipmentForEdit(equipment);
    setEditFormOpen(true);
  };

  const handleEditFormClose = () => {
    setEditFormOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "fileId",
      headerName: "Фото",
      width: 60,
      editable: false,
      renderCell: (params) => (
        <Stack direction={"row"} alignItems={"center"} mt={0.5}>
          <img
            src={imageUrls[params.row.id] || "/images/placeholder.png"}
            alt={params.row.name}
            style={{
              width: 40,
              height: 40,
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        </Stack>
      ),
    },
    { field: "name", headerName: "Название", width: 150, editable: true },
    {
      field: "description",
      headerName: "Описание",
      width: 300,
      editable: true,
    },
    {
      field: "pricePerDay",
      headerName: "Стоимость",
      width: 110,
      editable: true,
    },
    { field: "quantity", headerName: "Количество", sortable: true, width: 160 },
    {
      field: "category",
      headerName: "Категория",
      sortable: true,
      width: 160,
      valueGetter: (value, row) => {
        if (!row.category) {
          return null;
        }
        return row.category.name;
      },
    },
    {
      field: "brand",
      headerName: "Бренд",
      sortable: true,
      width: 160,
      valueGetter: (value, row) => {
        if (!row.brand) {
          return null;
        }
        return row.brand.name;
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Действия",
      cellClassName: "actions",
      width: 200,
      getActions: ({ id, row }) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          key={id}
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          key={id}
          onClick={handleEditClick(row)}
          color="inherit"
        />,
      ],
    },
  ];

  return (
    <div>
      <Stack flexDirection={"row"} alignItems={"center"} mb={2} gap={4}>
        <Typography color="#000" variant="h4">
          Оборудование CRS
        </Typography>
        <Button
          sx={{ backgroundColor: "#000" }}
          variant="contained"
          onClick={handleFormOpen}>
          Добавить
        </Button>
      </Stack>

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
        getRowHeight={() => "auto"}
        sx={{
          [`& .${gridClasses.cell}`]: {
            py: 1,
            alignItems: "flex-start",
          },
        }}
        pageSizeOptions={[20]}
        checkboxSelection
        disableRowSelectionOnClick
      />

      {selectedEquipment && (
        <ConfirmDelete
          open={deleteOpen}
          handleClose={handleDeleteClose}
          handleConfirm={handleDeleteConfirm}
          itemName={selectedEquipment.name}
        />
      )}

      <EquipmentForm
        open={formOpen}
        handleClose={handleFormClose}
        onEquipmentAdded={fetchData}
      />

      {selectedEquipmentForEdit && (
        <EditEquipmentForm
          open={editFormOpen}
          handleClose={handleEditFormClose}
          equipment={selectedEquipmentForEdit}
          onEquipmentUpdated={fetchData}
        />
      )}
    </div>
  );
};

export default EquipmentDataGrid;
