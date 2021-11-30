import React, { Fragment, useCallback, useContext } from "react";
import { Form } from "react-bootstrap";
import { LocalizationContext } from "../contexts/localization";

const MIN_GOOD_COUNT = 0;
const MIN_BAD_COUNT = 1;

export default function TaskCountSettings({
  goodCount,
  setGoodCount,
  badCount,
  setBadCount,
}) {
  const localizedStrings = useContext(LocalizationContext);

  const handleGoodCountChange = useCallback((event) => {
    const newGoodCount = Math.max(parseInt(event.target.value), MIN_GOOD_COUNT);
    setGoodCount(newGoodCount);
    if (newGoodCount >= badCount) setBadCount(newGoodCount + 1);
  }, []);
  const handleBadCountChange = useCallback((event) => {
    const newBadCount = Math.max(parseInt(event.target.value), MIN_BAD_COUNT);
    setBadCount(newBadCount);
    if (newBadCount <= goodCount) setGoodCount(newBadCount - 1);
  }, []);

  return (
    <>
      <Form.Group as={Fragment} controlId="good-task-count">
        <Form.Label className="m-0">
          {localizedStrings.goodTaskCount}
        </Form.Label>
        <Form.Control
          type="number"
          min={MIN_GOOD_COUNT}
          value={goodCount}
          onChange={handleGoodCountChange}
        />
      </Form.Group>

      <Form.Group as={Fragment} controlId="bad-task-count">
        <Form.Label className="m-0">{localizedStrings.badTaskCount}</Form.Label>
        <Form.Control
          type="number"
          min={MIN_BAD_COUNT}
          value={badCount}
          onChange={handleBadCountChange}
        />
      </Form.Group>
    </>
  );
}
