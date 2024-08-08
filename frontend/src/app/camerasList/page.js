'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';


function CameraList() {
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_ENDPOINT = 'http://localhost:8000/api/cameras/'
  const router = useRouter();

  const handleNavigate = (camera) => {
    router.push({
        pathname: '/liveVideo',
        query: { 
            cameraId: camera.cameraId, 
            cameraName: camera.cameraName
        }, 
    });
};

  useEffect(() => {
    async function fetchCameras() {
      try {
        setLoading(true);
        const response = await axios.get(API_ENDPOINT);
        setCameras(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCameras();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
        <div className='loader'></div>
      </div>
    )
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Camera List</h1>
      <ul>
        {cameras.map((camera) => (
          <li 
            key={camera.id}
            onClick={handleNavigate(camera)}
          >
            {camera.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CameraList;