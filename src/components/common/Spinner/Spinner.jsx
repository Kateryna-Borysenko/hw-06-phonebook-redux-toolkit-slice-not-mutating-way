import React from 'react';
import { createPortal } from 'react-dom';
import { BallTriangle } from 'react-loader-spinner';
import s from './Spinner.module.css';

const Spinner = () => {
  return createPortal(
    <div className={s.spinner}>
      <BallTriangle
        color="#007188"
        height={150}
        width={150}
        ariaLabel="loading"
        timeout={3000}
      />
    </div>,
    document.querySelector('#modal-root'),
  );
};
export default Spinner;
