/* eslint-disable react/display-name */
"use client";

import { Quill } from "./quill";

// @ts-ignore
// import ImageUploader from "quill-image-uploader";

// import { useEffect, useRef } from "react";

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export function RichTextEditor() {
  return (
    <Quill
      theme="snow"
      modules={{
        toolbar: {
          container: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "image"],
            ["clean"],
          ],
          handlers: {
            // imageUploader: {
            //   async upload(file: File) {
            //     return "https://sam-mroz.s3.amazonaws.com/c8bf4c96-4a51-4cda-9576-882160d9960b.webp";
            //   },
            // },
          },
        },
      }}
      formats={formats}
    />
  );
}
