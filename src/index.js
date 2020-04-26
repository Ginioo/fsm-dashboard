import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import Dashboard from "./components/Dashboard";
import Panel from "./components/Panel";
import Loader from "./components/Loader";

function App() {
  const data = [
    {
      id: "dashboard-c7b906da-2ab3-433a-81ba-4a7ee9fc75be",
      name: "Dashbaord",
      etc: "etc"
    },
    {
      id: "dashboard-f151fa8d-41a1-41fd-9fb0-d4e40fb5fe5e",
      name: "Dashbaord 2"
    }
  ];

  return (
    <Dashboard data={data}>
      {({ current, dashboards, selectDashboard }) => (
        <Fragment>
          <Fragment>
            {dashboards.map(item => (
              <button key={item.id} onClick={() => selectDashboard(item.id)}>
                {item.name}
              </button>
            ))}
          </Fragment>
          <Panel panelRef={current.ref} loader={Loader}>
            {({ id, name, meta }) => (
              <Fragment>
                <div>{id}</div>
                <div>{name}</div>
                <div>{JSON.stringify(meta)}</div>
              </Fragment>
            )}
          </Panel>
        </Fragment>
      )}
    </Dashboard>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
