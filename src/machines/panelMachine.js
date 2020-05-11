import { assign, Machine } from "xstate";

const panelMachine = {
  id: "panel",
  initial: "idle",
  context: {
    id: "",
    name: ""
  },
  states: {
    idle: {
      on: {
        INITIALIZE: "loading"
      }
    },
    loading: {
      invoke: {
        src: "fetchDashboard",
        onDone: {
          target: "ready",
          actions: assign((context, event) => ({ ...event.data }))
        }
      }
    },
    ready: {
      entry: "initialize",
      on: {
        EDIT: "editing"
      }
    },
    editing: {
      on: {
        COMMIT: "ready"
      }
    }
  }
};

export default Machine(panelMachine);
