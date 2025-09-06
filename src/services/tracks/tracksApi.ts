import axios from "axios";
import { BASE_URL } from "../constants";
import { TrackType, SelectionType } from "@sharedTypes/sharedTypes";
import { userGetToken } from "../auth/authApi";

export const tracksGetAll = (): Promise<TrackType[]> => {
  return axios.get(`${BASE_URL}/catalog/track/all/`).then((response) => {
    return response.data.data;
  });
};

export const tracksGetSelection = ({
  id,
}: {
  id: number;
}): Promise<SelectionType> => {
  return axios.get(`${BASE_URL}/catalog/selection/${id}/`).then((response) => {
    return response.data.data;
  });
};

export const tracksGetFavorites = (token: string): Promise<TrackType[]> => {
  return axios
    .get(`${BASE_URL}/catalog/track/favorite/all/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.data;
    });
};

export const addLike = (token: string, trackId: string) => {
  return axios
    .post(
      `${BASE_URL}/catalog/track/${trackId}/favorite/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data);
};

export const removeLike = (token: string, trackId: string) => {
  return axios
    .delete(`${BASE_URL}/catalog/track/${trackId}/favorite/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};