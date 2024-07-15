import React from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const PublicLayout = ({ children }) => {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default PublicLayout;