import React from 'react';

const Home = () => {
  return (
    <div className="container">
      <div className="container">
      <h2 className="mt-3">Welcome to MyWebApp</h2>
      <p className="lead">MyWebApp is a simple and intuitive web application for managing your contacts.</p>
      <p>You can use MyWebApp to:</p>
      <ul>
        <li>Create and manage your contacts</li>
        <li>Edit contact details</li>
        <li>Delete contacts</li>
        <li>View contact information</li>
      </ul>
      <p className='mb-5'>Get started now by signing up or logging in to your account!</p>
    </div>
    </div>
  );
};

export default Home;