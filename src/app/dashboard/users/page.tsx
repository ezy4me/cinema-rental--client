import React from "react";
import { getCustomers } from "@/services/customer.api";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import UsersDataGrid from "@/components/dashboard/datagrids/UsersDataGrid";

const UsersPage: React.FC = async () => {
  const session = await getServerSession(authOptions);
  let customers: any = [];
  if (session) customers = await getCustomers(session?.accessToken);
  return (
    <div>
      <UsersDataGrid users={customers} />
    </div>
  );
};

export default UsersPage;
