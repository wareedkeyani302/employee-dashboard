import React, { Children } from 'react';
import Header from '../HeaderComp/Header';
import Sidebar from '../SidebarComp/Sidebar';
import Footer from '../FooterComp/Footer';

const Layout = ({ children }) => {
  console.log('Layout component rendered');
  return (
    <div className='layout'>
      <Header />
      <div className='content'>
        <Sidebar />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;


