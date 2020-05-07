import { useMachine } from '@xstate/react';
import machine from './../machines/dashboardMachine';

const Dashboard = ({ children, dataProvider, data }) => {
  const [state, send] = useMachine(machine.withConfig({
    services: {
      fetchDashboards: () => {
        if (dataProvider && typeof dataProvider.fetchDashboards === 'function') {
          return new Promise(resolve => resolve(dataProvider.fetchDashboards()));
        }
        if (data && typeof data === 'object') {
          return new Promise(resolve => resolve(data));
        }
        return new Promise(resolve => resolve({}));
      }
    }
  }));
  const { active, dashboards } = state.context;
  const selectDashboard = key => send('SELECT_DASHBOARD', { key });

  if (typeof children === 'function') {
    return children({ current: active, dashboards, selectDashboard });
  }

  return children;
};

export default Dashboard;
