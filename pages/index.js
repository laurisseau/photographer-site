import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Gallery } from 'react-grid-gallery';
import { Button, Nav } from 'react-bootstrap';

// implement lazy loading and infinit scroll

export async function getServerSideProps() {
  try {
    const response = await axios.get(
      'http://localhost:5000/api/user/getUserPhotos/66629208090d561a012f7669'
    );
    const data = response.data;
    const serverTime = new Date().toString();
    const photos = data.photos;

    return {
      props: {
        serverTime,
        photos,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        serverTime: new Date().toString(),
        photos: [],
      },
    };
  }
}

const Page = ({ photos: initialPhotos }) => {
  const [photos, setPhotos] = useState(initialPhotos);

  useEffect(() => {
    //console.log('Photos updated:', photos); // these new photos that are selected will be sent back to admin
  }, [photos]);

  const handleSelect = (index, photo) => {
    console.log(photo);
    const newPhotos = [...photos];
    newPhotos[index] = { ...photo, isSelected: !photo.isSelected };
    setPhotos(newPhotos);
  };

  return (
    <>
      {/* NavBar */}
      <div className="container">
        <Gallery
          images={photos}
          enableImageSelection={true}
          onSelect={handleSelect}
          margin={20}
          rowHeight={280}
        />

        <div className="d-flex justify-content-center mb-5 mt-5">
          <Button className="w-50 h-50">Submit</Button>
        </div>
      </div>
    </>
  );
};

export default Page;
