import { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios';


function App() {
  const [selectedRover, setSelectedRover] = useState('Curiosity');
  const [roverPhotos, setRoverPhotos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://roverphotos.test/api/rover?rover=${encodeURIComponent(selectedRover)}`;
        const response = await axios.get(url, {
          headers: {
            'Authorization': 'test_api_token'
          }
        });
        setRoverPhotos(response.data); // Assume the API returns an object with arrays
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedRover]); // Empty dependency array means this effect runs once after initial render

  const handleRoverChange = (event) => {
    setSelectedRover(event.target.value);
  };


  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };


  return (
    <>
      <div>
      <select
        className="form-control my-3"
        id="roverSelect"
        value={selectedRover}
        onChange={handleRoverChange}
      >
        <option value="Curiosity">Curiosity</option>
        <option value="Opportunity">Opportunity</option>
        <option value="Spirit">Spirit</option>
        <option value="Curiosity,Opportunity,Spirit">View All</option>
      </select>

      <small className='d-block mb-3 text-muted'>You're viewing photos taken by <strong>{selectedRover}</strong></small>

      {Object.entries(roverPhotos).map(([roverName, photos]) => (
        <div key={roverName}>
          <h2>{roverName}</h2>
          {photos.map(photo => (
            <div key={photo.id} className="card my-3">
              <img src={photo.img_src} alt={`Photo taken by ${roverName}`} />
              <div className="card-body">
                <p>Photo taken by <strong>{roverName}</strong></p>
                <small className="text-muted">Posted on {photo.earth_date}</small>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
    </>
  )
}

export default App
