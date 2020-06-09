import {
  CREATE_EVENT,
  DELETE_CHECKED_EVENTS,
  DELETE_EVENT,
  CHECK_EVENT,
  CHECK_ALL_EVENTS,
} from "../actions";

// action = {
//   type: 'CREATE_EVENT',
//   titile: '2020東京オリンピックのお知らせ',
//   body: '2020年に東京でオリンピックを開催します！つきましては、、、、、、、'
// }
//
//
// # before
// state = []
//
// # after
// state = [
//   {
//     id: 1,
//     titile: '2020東京オリンピックのお知らせ',
//     body: '2020年に東京でオリンピックを開催します！つきましては、、、、、、、'
//   }
// ]
//
// # before
// state = [
//   { id: 1, title: 'タイトル1', body: 'ボディー1'},
//   { id: 2, title: 'タイトル2', body: 'ボディー2'},
//   { id: 3, title: 'タイトル3', body: 'ボディー3'},
// ]
//
// # after
// state = [
//   { id: 1, title: 'タイトル1', body: 'ボディー1'},
//   { id: 2, title: 'タイトル2', body: 'ボディー2'},
//   { id: 3, title: 'タイトル3', body: 'ボディー3'},
//   {
//     id: 4,
//     titile: '2020東京オリンピックのお知らせ',
//     body: '2020年に東京でオリンピックを開催します！つきましては、、、、、、、'
//   }
// ]
const events = (state = [], action) => {
  switch (action.type) {
    case CREATE_EVENT:
      const event = { title: action.title, body: action.body, checked: false };
      const length = state.length;
      const id = length === 0 ? 1 : state[length - 1].id + 1;
      return [...state, { id, ...event }];
    case DELETE_EVENT:
      return state.filter((event) => event.id !== action.id);
    case DELETE_CHECKED_EVENTS:
      return state.filter((event) => event.checked === false);
    case CHECK_EVENT:
      return state.map((event) =>
        event.id === action.id ? { ...event, checked: !event.checked } : event
      );
    case CHECK_ALL_EVENTS:
      return state.map((event) => ({ ...event, checked: action.checked }));
    default:
      return state;
  }
};

export default events;
