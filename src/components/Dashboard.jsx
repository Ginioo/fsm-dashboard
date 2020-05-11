import { useMachine } from "@xstate/react";
import { assign, spawn } from "xstate";
import _get from "lodash/get";

import machine from "./../machines/dashboardMachine";
import panelMachine from "../machines/panelMachine";

const Dashboard = ({ children, dataProvider, data }) => {
  const [state, send] = useMachine(machine.withConfig({
    actions: {
      initialize: assign((ctx, e) => {
        const dashboards = ctx.dashboards.map(it => ({
          id: it.id,
          name: it.name,
          ref: spawn(panelMachine.withContext(it).withConfig({
            services: {
              fetchDashboard: ctx => dataProvider.fetchDashboard(ctx.id)
            }
          }))
        }));
        const active = _get(dashboards, "[0]", {});
        const activeKey = _get(active, "id", false);

        return {
          dashboards,
          activeKey,
          active
        };
      })
    },
    services: {
      fetchDashboards: (ctx, e) => {
        if (dataProvider && typeof dataProvider.fetchDashboards === "function") {
          return dataProvider.fetchDashboards();
        }
        if (data && typeof data === "object") {
          return new Promise(resolve => resolve(data));
        }
        return new Promise(resolve => resolve({}));
      }
    }
  }));
  const { active, dashboards } = state.context;
  const selectDashboard = key => send("SELECT_DASHBOARD", { key });

  if (typeof children === "function") {
    return children({ current: active, dashboards, selectDashboard });
  }

  return children;
};

export default Dashboard;
