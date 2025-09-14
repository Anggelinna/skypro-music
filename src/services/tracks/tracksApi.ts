import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../constants";
import { TrackType, SelectionType } from "@sharedTypes/sharedTypes";

interface ApiResponse<T> {
  data: T;
}

interface LikeResponse {
  success: boolean;
  message?: string;
}

interface SelectionParams {
  id: number;
}

interface AuthConfig {
  headers: {
    Authorization: string;
  };
}

type TrackApiResponse = ApiResponse<TrackType[]>;
type SelectionApiResponse = ApiResponse<SelectionType>;

export const tracksGetAll = (): Promise<TrackType[]> => {
  return axios
    .get<TrackApiResponse>(`${BASE_URL}/catalog/track/all/`)
    .then((response: AxiosResponse<TrackApiResponse>): TrackType[] => {
      return response.data.data;
    });
};

export const tracksGetSelection = ({ id }: SelectionParams): Promise<SelectionType> => {
  return axios
    .get<SelectionApiResponse>(`${BASE_URL}/catalog/selection/${id}/`)
    .then((response: AxiosResponse<SelectionApiResponse>): SelectionType => {
      return response.data.data;
    });
};

export const tracksGetFavorites = (token: string): Promise<TrackType[]> => {
  const config: AuthConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .get<TrackApiResponse>(`${BASE_URL}/catalog/track/favorite/all/`, config)
    .then((response: AxiosResponse<TrackApiResponse>): TrackType[] => {
      return response.data.data;
    });
};

export const addLike = (token: string, trackId: string): Promise<LikeResponse> => {
  const config: AuthConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .post<LikeResponse>(
      `${BASE_URL}/catalog/track/${trackId}/favorite/`,
      {},
      config
    )
    .then((response: AxiosResponse<LikeResponse>): LikeResponse => {
      return response.data;
    });
};

export const removeLike = (token: string, trackId: string): Promise<LikeResponse> => {
  const config: AuthConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .delete<LikeResponse>(
      `${BASE_URL}/catalog/track/${trackId}/favorite/`,
      config
    )
    .then((response: AxiosResponse<LikeResponse>): LikeResponse => {
      return response.data;
    });
};