import React from 'react';
import './Header.css';

export const Header = ({ title, desc, height }) => {
  return (
    <div className="header" style={{ height: height + "vh" }}>
      <div className='d-flex justify-content-center align-items-center' style={{ height: height + "vh" }}>
        <div className='header-content text-center text-white'>
          <h1 className='title'>{title}</h1>
          <p className='w-50 m-auto mt-5 paragraph'>{desc}</p>
          <div className="button-container text-center"> {/* Center the button within this div */}
          </div>
          <button className='btn-home' >Watch</button> {/* Add the btn-home class */}

        </div>
      </div>
    </div>
  );
}
