import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { TrackType } from "@/sharedTypes/sharedTypes";

interface TrackFilters {
  query?: string;
  artists?: string[];
  years?: number[];
  genres?: string[];
}

interface FacetOptions {
  artists: string[];
  years: number[];
  genres: string[];
}

interface FilterableTrack extends TrackType {
  title?: string;
  artist?: string; 
  performer?: string;
  year?: number | string;
  release_year?: number | string;
  releaseYear?: number | string;
  releaseDate?: string;
  date?: string;
  publishedAt?: string;
  createdAt?: string;
}

const selectPlayList = (s: RootState) => s.tracks.playList;
const selectShuffled = (s: RootState) => s.tracks.isShuffle;
const selectShuffledPlayList = (s: RootState) => s.tracks.shuffledPlayList;

export const selectActiveList = createSelector(
  [selectShuffled, selectPlayList, selectShuffledPlayList],
  (isShuffle, list, shuffled) => (isShuffle ? shuffled : list)
);

const getArtist = (t: FilterableTrack): string => {
  return t.artist || t.author || t.performer || "";
};

const getYear = (t: FilterableTrack): number | null => {
  const candidates = [
    t.year,
    t.release_year,
    t.releaseYear,
    t.release_date,
    t.releaseDate,
    t.date,
    t.publishedAt,
    t.createdAt,
  ].filter(Boolean);

  for (const value of candidates) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
    
    if (typeof value === "string" && value) {
      const yearMatch = value.match(/(\d{4})/);
      if (yearMatch) {
        const year = Number(yearMatch[1]);
        if (year >= 1900 && year <= 2100) return year;
      }
      try {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          const year = date.getFullYear();
          if (year >= 1900 && year <= 2100) return year;
        }
      } catch {
      }
    }
  }
  return null;
};

const getGenres = (t: FilterableTrack): string[] => {
  if (Array.isArray(t.genre)) {
    return t.genre.filter((g): g is string => typeof g === "string" && g !== "");
  }
  
  if (typeof t.genre === "string" && t.genre) {
    return [t.genre];
  }
  
  return [];
};

const textMatch = (t: FilterableTrack, query: string): boolean => {
  if (!query) return true;
  
  const lowerQuery = query.trim().toLowerCase();
  const fields = [
    t.name,
    t.title,
    getArtist(t),
    t.album
  ].filter((field): field is string => typeof field === "string" && field !== "");
  
  return fields.some(field => field.toLowerCase().includes(lowerQuery));
};

export const selectVisibleTracks = createSelector(
  [selectActiveList, (s: RootState) => s.tracks.filters as TrackFilters],
  (list, filters) => {
    const artistSet = new Set((filters.artists ?? []).map(String));
    const yearSet = new Set<number>(filters.years ?? []);
    const genreSet = new Set((filters.genres ?? []).map(g => g.toLowerCase()));

    return list.filter((t): t is TrackType => {
      if (!textMatch(t, filters.query ?? "")) return false;

      if (artistSet.size > 0) {
        const artist = String(getArtist(t));
        if (!artistSet.has(artist)) return false;
      }

      if (yearSet.size > 0) {
        const year = getYear(t);
        if (year === null || !yearSet.has(year)) return false;
      }

      if (genreSet.size > 0) {
        const trackGenres = getGenres(t).map(g => g.toLowerCase());
        if (trackGenres.length === 0 || !trackGenres.some(g => genreSet.has(g))) {
          return false;
        }
      }
      return true;
    });
  }
);

export const selectFacetOptions = createSelector(
  [selectActiveList], 
  (list): FacetOptions => {
    const artists = new Set<string>();
    const years = new Set<number>();
    const genres = new Set<string>();

    for (const track of list) {
      const artist = getArtist(track);
      if (artist) artists.add(artist);

      const year = getYear(track);
      if (year !== null) years.add(year);

      for (const genre of getGenres(track)) {
        if (genre) genres.add(genre);
      }
    }

    return {
      artists: Array.from(artists).sort((a, b) => a.localeCompare(b)),
      years: Array.from(years).sort((a, b) => a - b),
      genres: Array.from(genres).sort((a, b) => a.localeCompare(b)),
    };
  }
);