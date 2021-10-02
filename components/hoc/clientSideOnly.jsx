import React, { useEffect, useState } from "react";

export default function clientSideOnly(WrappedComponent, placeholder = null) {
  return function ClientSideOnly(props) {
    const [showChild, setShowChild] = useState(false);
    useEffect(() => setShowChild(true), []);

    return showChild ? <WrappedComponent {...props} /> : placeholder;
  };
}
