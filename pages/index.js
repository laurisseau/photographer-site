import React from 'react';
import axios from 'axios';

export async function getServerSideProps() {
  try {
    const response = await axios.get(
      'http://localhost:5000/api/user/getUserPhotos/66629208090d561a012f7669'
    );
    const photos = response.data.photos;
    const serverTime = new Date().toString();

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

const page = ({ serverTime, photos }) => {
  return (
    <div>
      <div>
        {photos?.map((photoUrl, index) => (
          <div key={index} className="photo">
            <img src={photoUrl} alt={`Photo ${index}`} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
