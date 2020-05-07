import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import Dashboard from "./components/Dashboard";
import Panel from "./components/Panel";
import Loader from "./components/Loader";

import { SampleButton } from './components/styled/SampleButton';

const dataProvider = {
  fetchDashboards: () => ([
    {
      id: 'dashboard-c7b906da-2ab3-433a-81ba-4a7ee9fc75be',
      name: 'Dashbaord',
      etc: 'etc'
    },
    {
      id: 'dashboard-f151fa8d-41a1-41fd-9fb0-d4e40fb5fe5e',
      name: 'Dashbaord 2'
    }
  ])
};

const App = ({ TabButton }) => {
  return (
    <Dashboard
      dataProvider={dataProvider}
    >
      {({ current, dashboards, selectDashboard }) => (
        <Fragment>
          {dashboards.map(it => (
            <TabButton
              key={it.id}
              active={current.id === it.id}
              onClick={() => selectDashboard(it.id)}
            >
              {it.name}
            </TabButton>
          ))}

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
};

ReactDOM.render(
  <App TabButton={SampleButton}/>,
  document.getElementById('root')
);
