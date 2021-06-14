import React, { useState } from "react";
import { Button, Flex, Input } from "@theme-ui/components";

export default function TodoInput() {
  const [description, setDescription] = useState("");

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
