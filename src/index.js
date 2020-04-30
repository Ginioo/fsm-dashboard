import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import Dashboard from "./components/Dashboard";
import Panel from "./components/Panel";
import Loader from "./components/Loader";
import dataProvider from "./dataProvider/sampleDataProvider";

import { SampleButton } from "./components/styled/SampleButton";

function Demo({ Button, Item }) {
  return (
    <Dashboard dataProvider={dataProvider}>
      {({ current, dashboards, selectDashboard }) => (
        <Fragment>
          <Fragment>
            {dashboards.map(it => (
              <Button
                  key={it.id}
                  active={current.id === it.id}
                  onClick={() => selectDashboard(it.id)}
                  onMouseEnter={() => selectDashboard(it.id)}
              >
                {it.name}
              </Button>
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

ReactDOM.render(<Demo Button={SampleButton} />, document.getElementById("root"));
