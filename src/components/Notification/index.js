import React, { useState, useEffect } from 'react';

const Notification = ({ m }) => {
  const [message, setMessage] = useState(m);
  const [intervalId, setIntervalId] = useState(null);
  if (!message) return null;

  useEffect(() => {
    if (!intervalId) setMessage(null);
  }, [message]);

  setIntervalId(setInterval(() => {
    setMessage(null);
  }, 3000));
  return <div>
    {message}
  </div>;
};

export default Notification;
