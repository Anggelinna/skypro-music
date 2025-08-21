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
  return axios
    .get(`${BASE_URL}/catalog/selection/${id}/`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data.data;
    });
};