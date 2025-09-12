import { TrackType } from "../sharedTypes/sharedTypes";

export const dateFormat = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = new Date(date).toLocaleDateString("ru-RU", options);
  return formattedDate;
};

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${formattedMinutes}:${formattedSeconds}`;
};

export const getTimePanel = (currentTime: number, totalTime: number) => {
  const current = formatTime(currentTime);
  const total = formatTime(totalTime);
  return `${current} / ${total}`;
};

export const getUniqueValuesByKey = (
  arr: TrackType[],
  key: keyof TrackType
): string[] => {
  // Используем Set для хранения уникальных значений
  const uniqueValues = new Set<string>();

  // Проходим по каждому объекту в массиве
  arr.forEach((item) => {
    const value = item[key];

    // Если значение — массив строк
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v) {
          uniqueValues.add(v);
        }
      });
    }
    // Если значение — строка
    else if (typeof value === "string") {
      uniqueValues.add(value);
    }
  });

  // Преобразуем Set обратно в массив и возвращаем
  return Array.from(uniqueValues);
};

export const getFilteredTracks = (
  tracks: TrackType[],
  filter: string | null,
  filterValue: string | null
): TrackType[] => {
  if (!filter || !filterValue) return tracks;

  return tracks.filter((track) => {
    if (filter === "author") {
      return track.author === filterValue;
    }
    if (filter === "release_date") {
      return String(track.release_date) === filterValue;
    }

    if (filter === "genre") {
      return track.genre.includes(filterValue);
    }
    if (filter === "all") {
      console.log("track", track);
      console.log("filterValue", filterValue);
      console.log(
        "result",
        track.author
          .toLowerCase()
          .includes(String(filterValue).toLowerCase()) ||
          track.name
            .toLowerCase()
            .includes(String(filterValue).toLowerCase()) ||
          track.album.toLowerCase().includes(String(filterValue).toLowerCase())
      );
      return (
        track.author
          .toLowerCase()
          .includes(String(filterValue).toLowerCase()) ||
        track.name.toLowerCase().includes(String(filterValue).toLowerCase()) ||
        track.album.toLowerCase().includes(String(filterValue).toLowerCase())
      );
    }
  });
};