import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Home from '../pages/Home';
import Signup from '../components/auth/Signup';
import Login from '../components/auth/Login';
import CreateContactPage from '../pages/CreateContactPage';
import EditContactPage from '../pages/EditContactPage';
import ContactsListPage from '../pages/ContactsListPage';
import ContactDetails from '../components/contacts/ContactDetails';
import PrivateRoute from "./privateRoute";

const AllPages = () => (
  <>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>

        <Route
          path="/contacts"
          element={
            <PrivateRoute>
              <ContactsListPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/contacts/create"
          element={
            <PrivateRoute>
              <CreateContactPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/contacts/:id/edit"
          element={
            <PrivateRoute>
              <EditContactPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/contacts/:id"
          element={
            <PrivateRoute>
              <ContactDetails />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
      <Footer />
    </Router>

  </>
)
export default AllPages;