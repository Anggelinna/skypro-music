import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrackType } from "../../sharedTypes/sharedTypes";

type TrackState = {
  tracks: TrackType[];
  currentTrack: {
    track: TrackType | null;
    isPlaying: boolean;
  };
};

const initialState: TrackState = {
  tracks: [],
  currentTrack: {
    track: null,
    isPlaying: false,
  },
};

const trackSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    setTracks(state, action: PayloadAction<TrackType[]>) {
      state.tracks = action.payload;
    },
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack.track = action.payload;
      state.currentTrack.isPlaying = true;
    },
    togglePlay: (state, action: PayloadAction<boolean | undefined>) => {
      state.currentTrack.isPlaying =
        action.payload === undefined
          ? !state.currentTrack.isPlaying
          : action.payload;
    },
    stopPlayback(state) {
      if (state.currentTrack.track) {
        state.currentTrack.isPlaying = false;
      }
    },
  },
});

export const { setTracks, setCurrentTrack, togglePlay, stopPlayback } =
  trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;