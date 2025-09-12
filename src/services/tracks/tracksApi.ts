import axios from "axios";
import { BASE_URL } from "../constants";
import { TrackType, SelectionType } from "@sharedTypes/sharedTypes";
import { userGetToken } from "../auth/authApi";

// Интерфейсы для типизации ответов API
interface ApiResponse<T> {
  data: T;
  status?: number;
  message?: string;
}

interface LikeResponse {
  success: boolean;
  message?: string;
}

export const tracksGetAll = (): Promise<TrackType[]> => {
  return axios
    .get<ApiResponse<TrackType[]>>(`${BASE_URL}/catalog/track/all/`)
    .then((response) => {
      return response.data.data;
    });
};

export const tracksGetSelection = ({
  id,
}: {
  id: number;
}): Promise<SelectionType> => {
  return axios
    .get<ApiResponse<SelectionType>>(`${BASE_URL}/catalog/selection/${id}/`)
    .then((response) => {
      return response.data.data;
    });
};

export const tracksGetFavorites = (token: string): Promise<TrackType[]> => {
  return axios
    .get<ApiResponse<TrackType[]>>(
      `${BASE_URL}/catalog/track/favorite/all/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      return response.data.data;
    });
};

export const addLike = (token: string, trackId: string): Promise<LikeResponse> => {
  return axios
    .post<LikeResponse>(
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

export const removeLike = (token: string, trackId: string): Promise<LikeResponse> => {
  return axios
    .delete<LikeResponse>(
      `${BASE_URL}/catalog/track/${trackId}/favorite/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data);
};