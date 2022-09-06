import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { GameStatus, RegionStatus } from "../const";
import { regionData } from "../data/region-data";
import { getRandomElement } from "../utils";

const adapter = createEntityAdapter({
  selectId: (region) => region.id
});

export const initialState = adapter.getInitialState({
  gameStatus: GameStatus.UNSTARTED,
  playingRegionId: null,
  failedAttemptsCount: 0,
  score: 0,
});

const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    gameInit(state) {
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
    gameReset(state) {
      state.gameStatus = GameStatus.STARTED;
      state.playingRegionId = null;
      state.failedAttemptsCount = 0;
      state.score = 0;

      Object.values(state.entities).forEach((entity) => {
        entity.status = RegionStatus.INITIAL;
      })
    },
    gameStatusSet(state, action) {
      state.gameStatus = action.payload;
    },
    playingRegionIdSet(state, action) {
      state.playingRegionId = action.payload;
    },
    regionStatusChanged: {
      reducer(state, action) {
        const { id, status } = action.payload;
        state.entities[id].status = status;
      },
      prepare(id, status) {
        return {
          payload: {
            id, status
          }
        }
      }
    },
    failedAttemptsCountInc(state) {
      state.failedAttemptsCount++;

      if (state.failedAttemptsCount === 3) {
        state.entities[state.playingRegionId].status = RegionStatus.FAILED;
      }
    },
    failedAttemptsCountReset(state) {
      state.failedAttemptsCount = 0;
    },
    scoreIncreased(state, action) {
      state.score += action.payload;
    }
  }
});

// Selectors
export const {selectAll: selectRegions, selectById: selectRegionById} = adapter.getSelectors((state) => state);

export const selectPlayingRegions = (state) => {
  return state.ids.filter((id) => state.entities[id].status === RegionStatus.INITIAL);
}

// Action
export const nextQuestion = () => (dispatch, getState) => {
  const activeRegions = selectPlayingRegions(getState());

  if (activeRegions.length === 0) {
    dispatch(gameStatusSet(GameStatus.FINISHED));
    return;
  }

  const randomRegionId = getRandomElement(activeRegions);
  dispatch(playingRegionIdSet(randomRegionId));
};

export const {
  gameInit,
  gameReset,
  gameStatusSet,
  playingRegionIdSet,
  failedAttemptsCountInc,
  failedAttemptsCountReset,
  regionStatusChanged,
  scoreIncreased,
} = rootSlice.actions;

export default rootSlice.reducer;