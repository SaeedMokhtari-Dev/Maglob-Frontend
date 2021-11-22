import React from "react";
import {observer} from "mobx-react";
import UserContext from "identity/contexts/UserContext";
import RoleType from "identity/constants/RoleType";

import CustomerDashboard from "customer/components/dashboard/CustomerDashboard";
import AdminDashboard from "../../../admin/components/dashboard/AdminDashboard";

const Dashboard: React.FC = observer(({}) =>
{
    if(!UserContext.info) return null;

    if(UserContext.info.roles.includes(RoleType.user)) return <CustomerDashboard />
    if(UserContext.info.roles.includes(RoleType.admin)) return <AdminDashboard />
});

export default Dashboard;
