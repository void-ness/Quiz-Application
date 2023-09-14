import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
  name: "user",

  initialState: {
    name: "",
    questionList: [
      // {
      //   questionId: "",
      //   startTime: "",
      //   totalTime: {
      //     minutes: "",
      //     seconds: "",
      //   }
      // }
    ],
    totalTime: 0,
    finishTime: {
      minutes: "",
      seconds: "",
    },
  },

  reducers: {
    updateName: (state, action) => {
      state.name = action.payload;
    },

    updateQues: (state, action) => {
      state.questionList = action.payload;
    },

    updateFinishTime: (state, action) => {
      state.finishTime.minutes = action.payload.minutes;
      state.finishTime.seconds = action.payload.seconds;
    },

    updateTotalTime: (state, action) => {
      state.totalTime = action.payload;
    },

    updateTimeSpentonQues: (state, action) => {
      state.questionList[action.payload.quesNo].totalTime.minutes += action.payload.timeDiff.minutes;
      state.questionList[action.payload.quesNo].totalTime.seconds += action.payload.timeDiff.seconds;
    },

    updateStartTimeofQues: (state, action) => {
      state.questionList[action.payload.quesNo].startTime = action.payload.currTime;
    }
  },
})

export const {
  updateName,
  updateQues,
  updateTotalTime, updateFinishTime,
  updateTimeSpentonQues, updateStartTimeofQues
} = userSlice.actions

export const selectUser = (state) => state.user.name
export const selectQuestions = (state) => state.user.questionList
export const selectTotalTime = (state) => state.user.totalTime
export const selectFinishTime = (state) => state.user.finishTime

export default userSlice.reducer
