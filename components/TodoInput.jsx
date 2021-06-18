import React, { useState } from "react";
import { Button, Flex, Input } from "@theme-ui/components";

export default function TodoInput() {
  function computeExpensiveValue(returnValue) {
    const randomNumbers = Array(100000000).map(() => Math.random());
    randomNumbers.sort((a, b) => a - b);
    return returnValue;
  }
  const [description, setDescription] = useState(computeExpensiveValue(""));

  return (
    <Flex sx={{ gap: 3 }}>
      <Input
        aria-label="To-do item description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <Button sx={{ flexShrink: 0 }}>Add</Button>
    </Flex>
  );
}
