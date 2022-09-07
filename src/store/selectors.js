import { RegionStatus } from "../const";

export const selectGameStatus = (state) => state.gameStatus;
export const selectPlayingRegionId = (state) => state.playingRegionId;
export const selectPlayingRegion = (state) => {
  if (state.playingRegionId) {
    return state.entities[state.playingRegionId];
  }
  return null;
};
export const selectFailedAttemptsCount = (state) => state.failedAttemptsCount;
export const selectScore = (state) => state.score;
export const selectPlayingRegions = (state) => {
  return state.ids.filter((id) => state.entities[id].status === RegionStatus.INITIAL);
}
