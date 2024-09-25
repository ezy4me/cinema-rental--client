"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import { fetchImageUrl } from "@/utils/fetchImageUrl";


interface Equipment {
  id: number;
  name: string;
  description: string;
  pricePerDay: string;
  quantity: number;
  fileId: number;
}

interface RentalEquipment {
  id: number;
  quantity: number;
  rentalId: number;
  equipmentId: number;
  equipment: Equipment;
}

interface Rental {
  id: number;
  startDate: string;
  endDate: string;
  totalAmount: number;
  userId: number;
  rentalEquipment: RentalEquipment[];
}

interface UserOrdersProps {
  rentals: Rental[];
}

const UserRentals: React.FC<UserOrdersProps> = ({ rentals }) => {
  const [imageUrls, setImageUrls] = useState<{ [key: number]: string }>({});

  const loadImageUrls = async () => {
    const urls: { [key: number]: string } = {};
    for (const rental of rentals) {
      for (const rentalItem of rental.rentalEquipment) {
        const { equipment } = rentalItem;
        try {
          const url = await fetchImageUrl(equipment.fileId);
          urls[equipment.id] = url;
        } catch (error) {
          console.error("Ошибка загрузки изображения", error);
        }
      }
    }
    setImageUrls(urls);
  };

  useEffect(() => {
    loadImageUrls();
  }, [rentals]);

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        {rentals.map((rental) => (
          <Grid item xs={12} key={rental.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Заказ № {rental.id}</Typography>
                <Typography>
                  Дата начала: {new Date(rental.startDate).toLocaleDateString()}
                </Typography>
                <Typography>
                  Дата окончания:{" "}
                  {new Date(rental.endDate).toLocaleDateString()}
                </Typography>
                <Typography>Общая сумма: {rental.totalAmount} ₽</Typography>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Арендуемое оборудование:
                </Typography>
                <List>
                  {rental.rentalEquipment.map((rentalItem) => (
                    <ListItem key={rentalItem.id}>
                      <Avatar
                        src={imageUrls[rentalItem.equipment.id] || ""}
                        alt={rentalItem.equipment.name}
                        sx={{ width: 56, height: 56, marginRight: 2 }}
                      />
                      <ListItemText
                        primary={`${rentalItem.equipment.name} — ${rentalItem.quantity} шт.`}
                        secondary={`Цена за день: ${rentalItem.equipment.pricePerDay} ₽`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserRentals;
