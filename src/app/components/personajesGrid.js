'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function PersonajesGrid() {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Comienza la llamada
    const fetchPersonajes = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        console.log(response.data.results);
        setPersonajes(response.data.results); // Guardar los datos
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchPersonajes();
  }, []);

  // Parte visible del componente:
  return (
    <div>
      {loading && <p>Loading...</p>}
      <div className="grid">
        {!loading &&
          personajes.map((personaje) => (
            <div
              key={personaje.id}
              className="col_3 flex flex-col justify-center items-center gap-3 p-4 rounded-lg bg-emerald-800 text-cyan-100"
            >
              <Image
                src={personaje.image}
                alt={personaje.name}
                width={200}
                height={200}
                className="rounded-lg"
              />
              <h1>{personaje.name}</h1>
              <p>{personaje.gender}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
