const SET_HEADING = "SET_HEADING";
const SET_DESCRIPTION = "SET_DESCRIPTION";
const SET_PRIORITY = "SET_PRIORITY";
const SET_ASSIGNEE = "SET_ASSIGNEE";
const SET_STORY_POINTS = "SET_STORY_POINTS";
const SET_ARCHIVED_STATUS = "SET_ARCHIVED_STATUS";
const SET_STORY_STATUS = "SET_STORY_STATUS";

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case SET_HEADING:
      return { ...state, heading: data };
    case SET_DESCRIPTION:
      return { ...state, description: data };
    case SET_PRIORITY:
      return { ...state, priority: data };
    case SET_ASSIGNEE:
      return { ...state, assignee: data };
    case SET_STORY_POINTS:
      return { ...state, storyPoints: data };
    case SET_ARCHIVED_STATUS:
      return { ...state, archived: data };
    case SET_STORY_STATUS:
      return { ...state, status: data };
    default:
      return state;
  }
};

export const setHeading = (data) => ({
  type: SET_HEADING,
  data,
});

export const setDescription = (data) => ({
  type: SET_DESCRIPTION,
  data,
});

export const setPriority = (data) => ({
  type: SET_PRIORITY,
  data,
});

export const setAssignee = (data) => ({
  type: SET_ASSIGNEE,
  data,
});

export const setStoryPoints = (data) => ({
  type: SET_STORY_POINTS,
  data,
});

export const setArchivedStatus = (data) => ({
  type: SET_ARCHIVED_STATUS,
  data,
});

export const setStoryStatus = (data) => ({
  type: SET_STORY_STATUS,
  data,
});

export default reducer;
