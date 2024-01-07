import React from "react";
import { useState } from "react";

export const BuscadorPeliculas = () => {
    const urlBase = 'https://api.themoviedb.org/3/search/movie';
    const apiKey = '434d58550d0abe5f5f88d325fe93a178';

    const [busqueda, setBusqueda] = useState('');
    const [peliculas, setPeliculas] = useState([]);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setBusqueda(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchPeliculas();
    }

    const fetchPeliculas = async () => {
        try {
            const response = await fetch(`${urlBase}?query=${busqueda}&api_key=${apiKey}`);
            const data = await response.json();

            if (data.results.length === 0) {
                setError("No se encontraron películas.");
            } else {
                setError(null);
                setPeliculas(data.results);
            }
        } catch (error) {
            console.error('Ha ocurrido un error: ', error);
            setError("Ha ocurrido un error al buscar las películas.");
        }
    }

    return (
        <div className="container text-center mt-5">
            <h1 className="title">Buscador de Películas</h1>
            <form onSubmit={handleSubmit} className="mb-3">
                <input
                    type="text"
                    placeholder="Ingresa la Película"
                    value={busqueda}
                    onChange={handleInputChange}
                    className="form-control"
                />
                <button type="submit" className="search-button">Buscar</button>
            </form>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <div className="movie-list">
                {peliculas && peliculas.map((pelicula) => (
                    <div key={pelicula.id} className="movie-card">
                        <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
                        <h2>{pelicula.title}</h2>
                        <p>{pelicula.overview}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
