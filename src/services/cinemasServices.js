import axios from "axios";
import { endpoints } from "./data";

export const getCinemas = async () => {
  try {
    const { data } = await axios.get(endpoints.urlTeatros);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCinemaAndCinemaShows = async () => {
  try {
    const { data } = await axios.get(endpoints.urlCinemaAndCinemaShows);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCinemaShowsByMovie = async (movieId) => {
  try {
    const cinemaAndCinemaShows = await getCinemaAndCinemaShows();
    //Queremos traernos todos los cines con cinema_shows donde se proyecte la película seleccionada
    const cinemaShows = cinemaAndCinemaShows.filter((item) =>
      item.cinema_shows.find((element) => element.movie == movieId)
      );
      const results = cinemaShows.map((item) => ({
        ...item,
        cinema_shows: item.cinema_shows.find(
          (element) => element.movie == movieId
        ),
      }));

      console.log("Results", results);
      return results.length ? results : null;
    
  } catch (error) {
    console.log(error);
    return null;
  }
};
