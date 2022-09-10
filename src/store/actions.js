import { goToNextQuestion, startGame, finishGame } from "./slice";
import { selectPlayingRegions } from "./selectors";
import { getRandomElement } from "../utils";

export const goToNextQuestionThunk = () => (dispatch, getState) => {
  const activeRegions = selectPlayingRegions(getState());

  if (activeRegions.length === 0) {
    dispatch(finishGame());
    return;
  }

  const randomRegionId = getRandomElement(activeRegions);
  dispatch(goToNextQuestion(randomRegionId));
};

export const gameStartedTnunk = () => (dispatch, getState) => {
  const ids = getState().ids;
  const randomId = getRandomElement(ids);
  dispatch(startGame(randomId));
};
