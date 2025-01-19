import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getRentals } from "@/services/rental.api";
import RentalDataGrid from "@/components/dashboard/DataGrids/RentalDataGrid";

const OrdersPage: React.FC = async () => {
  const session = await getServerSession(authOptions);
  let rentals: any = [];
  if (session) rentals = await getRentals();

  return (
    <div>
      <RentalDataGrid rentals={rentals} />
    </div>
  );
};

export default OrdersPage;
