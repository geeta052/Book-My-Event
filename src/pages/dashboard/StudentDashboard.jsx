// StudentDashboard.js

import React, { useEffect, useState, useContext } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import './StudentDashboard.css';

function StudentDashboard() {
  const [events, setEvents] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsSnapshot = await getDocs(collection(db, 'events'));
        const eventsList = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          images: doc.data().images || [],
        }));
        setEvents(eventsList);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [currentUser]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents((prevEvents) =>
        prevEvents.map((event) => {
          const updatedImages = [...event.images];
          const firstImage = updatedImages.shift();
          updatedImages.push(firstImage);
          return { ...event, images: updatedImages };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Student Dashboard</h1>
      <div className="events-container">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <img
                src={event.images[0] || 'https://via.placeholder.com/300'}
                alt="Event Main"
                className="event-main-image"
              />
              <h2 className="event-title">{event.eventName || 'No Event Name'}</h2>
              <p className="event-detail"><strong>Participant:</strong> {event.participantName || 'No Name'}</p>
              <p className="event-detail"><strong>Date:</strong> {event.eventDate || 'No Date'}</p>
              <p className="event-detail"><strong>Time:</strong> {event.eventTime || 'No Time'}</p>
              <p className="event-detail"><strong>Ticket Price:</strong> {event.ticketPrice || 'Not Available'}</p>
              <button className="book-button">Book Now</button>
            </div>
          ))
        ) : (
          <p className="loading-text">No current events</p>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
