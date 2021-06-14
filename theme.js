// Portions of this file are adapted from Bootstrap v5.0.1
// (https://github.com/twbs/bootstrap/blob/v5.0.1/dist/css/bootstrap.css),
// which is provided under the following license:

// The MIT License (MIT)
//
// Copyright (c) 2011-2021 Twitter, Inc.
// Copyright (c) 2011-2021 The Bootstrap Authors
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import { bootstrap } from "@theme-ui/presets";

const buttonCore = {
  cursor: "pointer",
  transition:
    "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
};
const buttons = {
  primary: {
    ...buttonCore,
    "&:hover": {
      backgroundColor: "#0b5ed7",
      borderColor: "#0a58ca",
    },
    "&:focus": {
      color: "#fff",
      backgroundColor: "#0b5ed7",
      borderColor: "#0a58ca",
      boxShadow: "0 0 0 0.25rem rgba(49, 132, 253, 0.5)",
    },
    "&:active": {
      backgroundColor: "#0a58ca",
      borderColor: "#0a53be",
    },
    "&:active:focus": {
      boxShadow: "0 0 0 0.25rem rgba(49, 132, 253, 0.5)",
    },
    "&:disabled": {
      backgroundColor: "#0d6efd",
      borderColor: "#0d6efd",
    },
  },
};

const input = {
  border: "1px solid #ced4da",
  transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
  "&:focus": {
    borderColor: "#86b7fe",
    outline: 0,
    boxShadow: "0 0 0 0.25rem rgba(13, 110, 253, 0.25)",
  },
};
const forms = { input };

const container = {
  px: "0.75rem",
};
const layout = {
  container,
  sm: { ...container, maxWidth: "sm" },
  md: { ...container, maxWidth: "md" },
  lg: { ...container, maxWidth: "lg" },
  xl: { ...container, maxWidth: "xl" },
};

const theme = { ...bootstrap, buttons, forms, layout };
export default theme;
