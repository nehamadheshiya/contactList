import React, { createContext, useContext, useEffect, useState } from "react";

const AlbumContext = createContext();

const useValue = () => {
  const value = useContext(AlbumContext);
  return value;
};

const AlbumsContext = ({ children }) => {
  const [albums, setAlbums] = useState([]);

  // Fetch data from the API and update the state
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data);
      })
      .catch((error) => {
        console.error("Error fetching albums:", error);
      });
  }, []);

  // Remove an Album
  function removeAlbum(id) {
    setAlbums((prevAlbums) => prevAlbums.filter((album) => album.id !== id));
    alert("Album Removed from the List");
  }

  // Add a new Album
  function addNewAlbum(name, email, id,phone) {
    setAlbums((prevAlbums) => [
      ...prevAlbums,
      {
        email,
        name,
        id,
        phone
      },
    ]);
    alert("New Album Added to the list");
  }

  // Update the albums
  function updateAlbum(name, email, id) {
    setAlbums((prevAlbums) =>
      prevAlbums.map((album) => {
        if (album.id === id) {
          // Update name and email if the id matches
          alert("UPDATED SUCCESSFULLY");
          return { ...album, name, email };
        }
        return album;
      })
    );
  }

  return (
    <AlbumContext.Provider
      value={{
        albums,
        removeAlbum,
        addNewAlbum,
        updateAlbum,
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
};

export { useValue };
export default AlbumsContext;
