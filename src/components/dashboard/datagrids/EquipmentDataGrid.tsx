"use client";

import React, { useState, useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  gridClasses,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import { fetchImageUrl } from "@/utils/fetchImageUrl";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteEquipmentById } from "@/services/equipment.api";
import { useSession } from "next-auth/react";

interface EquipmentDataGridProps {
  equipments: any[];
}

const EquipmentDataGrid: React.FC<EquipmentDataGridProps> = ({
  equipments,
}) => {
  const { data: session } = useSession();
  const [rows, setRows] = useState<any[]>([]);
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});

  const loadImageUrls = async () => {
    const urls: { [key: string]: string } = {};
    for (const equipment of equipments) {
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
    if (equipments) {
      setRows(equipments);
    }
  }, [equipments]);

  useEffect(() => {
    loadImageUrls();
  }, [equipments]);

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
            src={imageUrls[params.row.id]}
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
    {
      field: "name",
      headerName: "Название",
      width: 150,
      editable: true,
    },
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
    {
      field: "quantity",
      headerName: "Количество",
      sortable: true,
      width: 160,
    },
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
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            sx={{
              display: "flex",
              alignItems: "flex-start",
            }}
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
        Оборудование CRS
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
    </div>
  );
};

export default EquipmentDataGrid;
