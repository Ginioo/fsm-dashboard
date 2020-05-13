import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { AutoSizer } from "react-virtualized";
import { FixedSizeList as List } from "react-window";
import _find from "lodash/find";
import _get from "lodash/get";

import Dashboard from "./components/Dashboard";
import Panel from "./components/Panel";
import Loader from "./components/Loader";

import { SampleButton } from "./components/styled/SampleButton";

const dataProvider = {
  fetchDashboards: () => {
    return new Promise(resolve => resolve([
      {
        id: "dashboard-c7b906da-2ab3-433a-81ba-4a7ee9fc75be",
        name: "Dashbaord",
        etc: "etc"
      },
      {
        id: "dashboard-f151fa8d-41a1-41fd-9fb0-d4e40fb5fe5e",
        name: "Dashbaord 2"
      }
    ]));
  },
  fetchDashboard: (id) => {
    return new Promise(resolve => {
      setTimeout(() => resolve(_find([
        {
          id: "dashboard-c7b906da-2ab3-433a-81ba-4a7ee9fc75be",
          name: "Dashbaord",
          etc: "etc"
        },
        {
          id: "dashboard-f151fa8d-41a1-41fd-9fb0-d4e40fb5fe5e",
          name: "Dashbaord 2"
        }
      ], it => it.id === id)), 1000);
    });
  }
};

const SimpleDashboard = ({ children, dataProvider, TabButton }) => (
  <Dashboard dataProvider={dataProvider}>
    {({ current, dashboards, selectDashboard }) => (
      <Fragment>
        <AutoSizer
          disableHeight={true}
        >
          {({ width }) => (
            <List
              width={width}
              height={30}
              itemSize={120}
              itemCount={dashboards.length}
              layout="horizontal"
            >
              {({ index, style }) => {
                const item = _get(dashboards, index, {});

                return (
                  <TabButton
                    style={style}
                    key={item.id}
                    active={current.id === item.id}
                    onClick={() => selectDashboard(item.id)}
                  >
                    {item.name}
                  </TabButton>
                );
              }}
            </List>
          )}
        </AutoSizer>

        {current.ref && (
          <Panel panelRef={current.ref} Loader={Loader}>
            {children}
          </Panel>
        )}
      </Fragment>

    )}
  </Dashboard>
);

ReactDOM.render(
  <SimpleDashboard
    dataProvider={dataProvider}
    TabButton={SampleButton}
  >
    {({ id, name, meta }) => (
      <Fragment>
        <div>{id}</div>
        <div>{name}</div>
        <div>{JSON.stringify(meta)}</div>
      </Fragment>
    )}
  </SimpleDashboard>,
  document.getElementById("root")
);
