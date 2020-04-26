import React, { Fragment } from "react";
import { useMachine } from "@xstate/react";
import machine from "./../machines/dashboardMachine";

const Dashboard = ({ children, dataProvider }) => {
  const [state, send] = useMachine(machine.withConfig({
    services: {
      fetchDashboards: (context, event) => dataProvider.fetchDashboards()
    }
  }));
  const { active, dashboards } = state.context;
  const selectDashboard = key => send("SELECT_DASHBOARD", { key });

  if (typeof children === "function") {
    return children({ current: active, dashboards, selectDashboard });
  }

  return <Fragment>{children}</Fragment>;
};

export default Dashboard;
