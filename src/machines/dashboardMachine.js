import { Machine, assign } from "xstate";
import _find from "lodash/find";

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
          target: "ready",
          actions: assign({ dashboards: (context, event) => event.data })
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
    changeActiveItem: assign((ctx, e) => ({
      activeKey: e.key,
      active: _find(ctx.dashboards, item => item.id === e.key)
    }))
  }
};

export default Machine(dashboardMachine, options);
