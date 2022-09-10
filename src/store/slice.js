import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { GameStatus, RegionStatus, ScoresForAnswer } from "../const";
import { regionData } from "../data/region-data";

const adapter = createEntityAdapter({
  selectId: (region) => region.id
});

export const initialState = adapter.getInitialState({
  gameStatus: GameStatus.UNSTARTED,
  playingRegionId: null,
  failedAttemptsCount: 0,
  score: 0,
});

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    initGame(state) {
      const newEntities = {};

      regionData.outlines.forEach((it) => {
        newEntities[it.id] = {
          id: it.id,
          name: it.name,
          status: RegionStatus.INITIAL
        }
        state.ids.push(it.id);
      });

      state.entities = newEntities;
    },
    startGame(state, action) {
      state.gameStatus = GameStatus.STARTED;
      state.playingRegionId = action.payload;
    },
    resetGame(state) {
      state.gameStatus = GameStatus.STARTED;
      state.playingRegionId = null;
      state.failedAttemptsCount = 0;
      state.score = 0;

      Object.values(state.entities).forEach((entity) => {
        entity.status = RegionStatus.INITIAL;
      })
    },
    finishGame(state, action) {
      state.gameStatus = GameStatus.FINISHED;
    },
    setSuccess(state) {
      const id = state.playingRegionId;
      switch (state.failedAttemptsCount) {
        case 0: {
          state.entities[id].status = RegionStatus.FROM_FIRST_TRY;
          state.score += ScoresForAnswer.FROM_FIRST_TRY;
          break;
        }
        case 1: {
          state.entities[id].status = RegionStatus.FROM_SECOND_TRY;
          state.score += ScoresForAnswer.FROM_SECOND_TRY;
          break;
        }
        case 2: {
          state.entities[id].status = RegionStatus.FROM_THIRD_TRY;
          state.score += ScoresForAnswer.FROM_THIRD_TRY;
          break;
        }
        default: {
          state.entities[id].status = RegionStatus.UNGUESSED;
        }
      }
    },
    setFail(state) {
      state.failedAttemptsCount++;
      if (state.failedAttemptsCount === 3) {
        state.entities[state.playingRegionId].status = RegionStatus.FAILED;
      }
    },
    goToNextQuestion(state, action) {
      state.failedAttemptsCount = 0;
      state.playingRegionId = action.payload;
    },
  }
});

export const {
  initGame,
  startGame,
  resetGame,
  finishGame,
  setSuccess,
  setFail,
  goToNextQuestion,
} = gameSlice.actions;

export default gameSlice.reducer;