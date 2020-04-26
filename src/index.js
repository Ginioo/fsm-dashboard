import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import Dashboard from "./components/Dashboard";
import Panel from "./components/Panel";
import Loader from "./components/Loader";
import dataProvider from "./dataProvider/sampleDataProvider";

function App() {
  return (
    <Dashboard dataProvider={dataProvider}>
      {({ current, dashboards, selectDashboard }) => (
        <Fragment>
          <Fragment>
            {dashboards.map(item => (
              <button key={item.id} onClick={() => selectDashboard(item.id)}>
                {item.name}
              </button>
            ))}
          </Fragment>
          {current.ref && (
            <Panel panelRef={current.ref} loader={Loader}>
              {({ id, name, meta }) => (
                <Fragment>
                  <div>{id}</div>
                  <div>{name}</div>
                  <div>{JSON.stringify(meta)}</div>
                </Fragment>
              )}
            </Panel>
          )}
        </Fragment>
      )}
    </Dashboard>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
