import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div>
      Page not found. <Link to="/">Click here to go back</Link>
    </div>
  );
}

export default NotFoundPage;
