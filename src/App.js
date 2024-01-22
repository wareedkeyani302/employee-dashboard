// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './Pages/Home/Home';
// import ContactUs from './Pages/ContactUs/ContactUs';
// import './App.css';
// import Header from './Components/HeaderComp/Header';
// import Sidebar from './Components/SidebarComp/Sidebar';
// import Footer from './Components/FooterComp/Footer'
// // import SingleEmployeeData from './Pages/Employeedetail/SingleEmployeeData';

// const App = () => {
//   return (
//     <Router>
//       <Header />
//       <Sidebar />   
//       <Routes>
//           <Route index element={<Home />} />
//           {/* <Route path='/singleEmployeeData/:id' element = {<SingleEmployeeData />} /> */}
//           <Route path="/contactus" element={<ContactUs />} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// };

// export default App;
import React from 'react'
import EmployeeTable from './Components/Employeetable/EmployeeTable';
import './App.css';

const App = () => {
  return (
    <div>
      <EmployeeTable />
    </div>
  )
}

export default App;

