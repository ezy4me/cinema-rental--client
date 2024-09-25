"use client";

import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

interface Equipment {
  id: number;
  name: string;
  description: string;
  pricePerDay: string;
  quantity: number;
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
  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        {rentals.map((rental) => (
          <Grid item xs={12} key={rental.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Заказ № {rental.id}</Typography>
                <Typography>
                  Дата начала:{" "}
                  {new Date(rental.startDate).toLocaleDateString()}
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
