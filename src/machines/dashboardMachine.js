import { Machine, assign, spawn } from "xstate";
import _get from "lodash/get";
import _find from "lodash/find";

import panelMachine from "./panelMachine";

const dashboardMachine = {
  id: "dashboard",
  initial: "loading",
  context: {
    dashboards: [],
    activeKey: "",
    active: {}
  },
  states: {
    loading: {
      invoke: {
        src: "fetchDashboards",
        onDone: {
          target: 'ready',
          actions: assign({ dashboards: (context, event) => {
            console.log(event.data);
            return event.data;
          }})
        }
      }
    },
    ready: {
      entry: "initialize",
      on: {
        SELECT_DASHBOARD: { actions: "changeActiveItem" }
      }
    }
  }
};

const options = {
  actions: {
    initialize: assign((ctx, e) => {
      const dashboards = ctx.dashboards.map(item => ({
        ...item,
        ref: spawn(panelMachine.withContext(item))
      }));
      const active = _get(dashboards, "[0]", {});
      const activeKey = _get(active, "id", false);

      return {
        dashboards,
        activeKey,
        active
      };
    }),
    changeActiveItem: assign((ctx, e) => ({
      activeKey: e.key,
      active: _find(ctx.dashboards, item => item.id === e.key)
    }))
  },
  services: {
    fetchDashboards: () => new Promise(resolve => resolve([]))
  }
};

export default Machine(dashboardMachine, options);
