'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

function LiveVideo() {
  const [streamUrl, setStreamUrl] = useState(null);
  const [error, setError] = useState(null);
  const API_ENDPOINT = 'http://localhost:8000/api/live_video/'
  const router = useRouter();
  const {cameraId, cameraName} = router.query;

  useEffect(() => {
    async function fetchStreamUrl() {
      try {
        const response = await axios.get(`${API_ENDPOINT}${cameraId}/`);
        setStreamUrl(response.data.stream_url);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchStreamUrl();
  }, [cameraId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!streamUrl) {
    return (
      <div>
        <h1>Loading...</h1>
        <div className='loader'></div>
      </div>
    )
  }

  return (
    <div>
      <h1>Live Video</h1>
      <h2>{cameraName}</h2>
      <video src={streamUrl} width="640" height="480" controls />
    </div>
  );
}

export default LiveVideo;