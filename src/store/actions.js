import { gameStatusSet, goToNextQuestion, gameStarted } from "./slice";
import { selectPlayingRegions } from "./selectors";
import { getRandomElement } from "../utils";
import { GameStatus } from "../const";

export const goToNextQuestionThunk = () => (dispatch, getState) => {
  const activeRegions = selectPlayingRegions(getState());

  if (activeRegions.length === 0) {
    dispatch(gameStatusSet(GameStatus.FINISHED));
    return;
  }

  const randomRegionId = getRandomElement(activeRegions);
  dispatch(goToNextQuestion(randomRegionId));
};

export const gameStartedTnunk = () => (dispatch, getState) => {
  const ids = getState().ids;
  const randomId = getRandomElement(ids);
  dispatch(gameStarted(randomId));
};
