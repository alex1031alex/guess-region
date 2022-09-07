import { gameStatusSet, playingRegionIdSet } from "./slice";
import { selectPlayingRegions } from "./selectors";
import { getRandomElement } from "../utils";
import { GameStatus } from "../const";

export const nextQuestion = () => (dispatch, getState) => {
  const activeRegions = selectPlayingRegions(getState());

  if (activeRegions.length === 0) {
    dispatch(gameStatusSet(GameStatus.FINISHED));
    return;
  }

  const randomRegionId = getRandomElement(activeRegions);
  dispatch(playingRegionIdSet(randomRegionId));
};