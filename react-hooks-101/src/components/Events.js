import React, { useContext } from "react";
import { SortableContainer } from "react-sortable-hoc";
import arrayMove from "array-move";

import Event from "./Event";
import AppContext from "../contexts/AppContext";
import { CHECK_ALL_EVENTS, SORT_EVENT } from "../actions";

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

  const SortableTbody = SortableContainer(({ events }) => (
    <tbody>
      {events.map((event, index) => (
        <Event key={index} index={index} event={event} />
      ))}
    </tbody>
  ));

  const onSortEnd = ({ oldIndex, newIndex }) => {
    dispatch({
      type: SORT_EVENT,
      events: arrayMove(state.events, oldIndex, newIndex),
    });
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
        <SortableTbody
          events={state.events}
          onSortEnd={onSortEnd}
          lockAxis="y"
        />
      </table>
    </>
  );
};

export default Events;
