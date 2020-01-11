import { Machine } from "xstate";

const panelMachine = {
  id: "panel",
  initial: "loading",
  context: {
    id: "",
    name: ""
  },
  states: {
    loading: {
      on: {
        INITIALIZE: "ready"
      }
    },
    ready: {
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
