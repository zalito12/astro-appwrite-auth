import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DashboardLayout, type DashboardProps } from './dashboard/DashboardLayout';
import { Index } from './dashboard/pages/Index';
import { Settings } from './dashboard/pages/Settings';
import type { Models } from 'node-appwrite';

const router = (user: Models.User<Models.Preferences>) => createBrowserRouter([
  {
    path: 'dashboard',
    element: <DashboardLayout user={user} />,
    children: [
      { path: '', element: <Index /> },
      { path: 'settings', element: <Settings /> }
    ]
  }
]);

export const App = (props: DashboardProps) => {
  return (
    <React.StrictMode>
      <RouterProvider router={router(props.user)} />
    </React.StrictMode>
  );
};