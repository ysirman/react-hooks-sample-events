import React, { useContext } from "react";
import { SortableElement } from "react-sortable-hoc";

import { ADD_OPERATION_LOG, DELETE_EVENT, CHECK_EVENT } from "../actions";
import AppContext from "../contexts/AppContext";
import { timeCurrentIso8601 } from "../utils";

const Event = SortableElement(({ event }) => {
  const { dispatch } = useContext(AppContext);
  const id = event.id;
  const handleClickDeleteButton = () => {
    const result = window.confirm(
      `イベント(id=${id})を本当に削除しても良いですか？`
    );
    if (result) {
      dispatch({ type: DELETE_EVENT, id });

      dispatch({
        type: ADD_OPERATION_LOG,
        description: `イベント(id=${id})を削除しました。`,
        operatedAt: timeCurrentIso8601(),
      });
    }
  };
  const handleClickCheckButton = () => {
    dispatch({ type: CHECK_EVENT, id });
  };

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={event.checked ? "checked" : ""}
          onChange={handleClickCheckButton}
        />
      </td>
      <td>{id}</td>
      <td>{event.title}</td>
      <td>{event.body}</td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleClickDeleteButton}
        >
          削除
        </button>
      </td>
    </tr>
  );
});

export default Event;
