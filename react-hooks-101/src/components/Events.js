import React, { useContext } from "react";

import Event from "./Event";
import AppContext from "../contexts/AppContext";
import { CHECK_ALL_EVENTS } from "../actions";

const Events = () => {
  const { state, dispatch } = useContext(AppContext);
  let checkedAll =
    state.events.filter((event) => event.checked === true).length ===
    state.events.length;
  if (state.events.length === 0) {
    checkedAll = false;
  } else {
    checkedAll =
      state.events.filter((event) => event.checked === true).length ===
      state.events.length;
  }
  const handleClickCheckAllButton = (e) => {
    dispatch({ type: CHECK_ALL_EVENTS, checked: e.target.checked });
  };

  return (
    <>
      <h4>イベント一覧</h4>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={checkedAll}
                onChange={handleClickCheckAllButton}
              />
            </th>
            <th>ID</th>
            <th>タイトル</th>
            <th>ボディー</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {state.events.map((event, index) => (
            <Event key={index} event={event} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Events;
