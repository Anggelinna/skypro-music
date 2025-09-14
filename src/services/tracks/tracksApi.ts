import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../constants";
import { TrackType, SelectionType } from "@sharedTypes/sharedTypes";
import { userGetToken } from "../auth/authApi";

interface ApiResponse<T> {
  data: T;
}

export const tracksGetAll = (): Promise<TrackType[]> => {
  return axios
    .get<ApiResponse<TrackType[]>>(`${BASE_URL}/catalog/track/all/`)
    .then((response: AxiosResponse<ApiResponse<TrackType[]>>) => {
      return response.data.data; // response.data - это ApiResponse<TrackType
    });
};

export const tracksGetSelection = ({
  id,
}: {
  id: number;
}): Promise<SelectionType> => {
  return axios
    .get<ApiResponse<SelectionType>>(`${BASE_URL}/catalog/selection/${id}/`)
    .then((response: AxiosResponse<ApiResponse<SelectionType>>) => {
      return response.data.data; // response.data - это ApiResponse<SelectionType>
    });
};

export const tracksGetFavorites = (token: string): Promise<TrackType[]> => {
  return axios
    .get<ApiResponse<TrackType[]>>(`${BASE_URL}/catalog/track/favorite/all/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: AxiosResponse<ApiResponse<TrackType[]>>) => {
      return response.data.data;
    });
};

interface LikeResponse {
  success: boolean;
  message?: string;
}

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
    .then((res: AxiosResponse<LikeResponse>) => res.data);
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
    .then((res: AxiosResponse<LikeResponse>) => res.data);
};