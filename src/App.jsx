import { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios';


function App() {
  const [loading, setLoading] = useState(true);
  const [selectedRover, setSelectedRover] = useState('Curiosity'); // default to Curiosity
  const [roverPhotos, setRoverPhotos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://roverphotos.test/api/rover?rover=${encodeURIComponent(selectedRover)}`;
        const response = await axios.get(url, {
          headers: {
            'Authorization': 'test_api_token' // This would be dynamic, for test purposes its fixed
          }
        });
        setLoading(false);  // change the state to hide the loading
        setRoverPhotos(response.data); // Assume the API returns an object with arrays
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [selectedRover]); // Empty dependency array means this effect runs once after initial render

  // Used for the selection input
  const handleRoverChange = (event) => {
    setSelectedRover(event.target.value);
  };

  // Used for the modal
  const openImage = (image) => {
    setSelectedImage(image);
  };

  // Used for the modal
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

        {loading ? (
          <div class="alert alert-primary">
            Loading Photos
          </div>
        ) :
          <>
            {Object.entries(roverPhotos).map(([roverName, photos]) => (
              <div key={roverName}>
                <h2>{roverName}</h2>
                {photos.map(photo => (
                  <div key={photo.id} className="card my-3">
                    <img
                      src={photo.img_src}
                      alt={`Photo taken by ${roverName}`}
                      onClick={() => openImage(photo.img_src)}
                      style={{ cursor: 'pointer' }}
                    />
                    <div className="card-body">
                      <p>Photo taken by <strong>{roverName}</strong></p>
                      <small className="text-muted">Posted on {photo.earth_date}</small>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </>}



        {selectedImage && (
          <div className="modal" onClick={closeImage} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 1)' }}>
            <button onClick={closeImage} style={{ position: 'absolute', top: 0, right: 0, border: 'none', background: 'transparent', color: 'white', fontSize: '40px', cursor: 'pointer' }}>
              &times;
            </button>
            <img src={selectedImage} alt='Maximised Image of Mars' style={{ maxWidth: '90%', maxHeight: '90%' }} onClick={(e) => e.stopPropagation()} />
          </div>
        )}
      </div>
    </>
  )
}

export default App
