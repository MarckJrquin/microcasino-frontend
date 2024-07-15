import React from 'react';
import AdminNav from '../components/Admin/AdminNav';
import AdminFooter from '../components/Admin/AdminFooter';
import Sidebar from '../components/Admin/Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <AdminNav />
      <Sidebar />
      <main>{children}</main>
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;