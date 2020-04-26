export default {
  fetchDashboards: () => new Promise(resolve => resolve(
    [
      {
        id: "dashboard-c7b906da-2ab3-433a-81ba-4a7ee9fc75be",
        name: "Dashbaord",
        etc: "etc"
      },
      {
        id: "dashboard-f151fa8d-41a1-41fd-9fb0-d4e40fb5fe5e",
        name: "Dashbaord 2"
      }
    ]
  ))
};
