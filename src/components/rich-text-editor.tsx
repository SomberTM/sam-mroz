/* eslint-disable react/display-name */
"use client";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    RQ.Quill.register("modules/imageUploader", ImageUploader);

    return ({
      forwardedRef,
      ...props
    }: { forwardedRef: any } & React.ComponentProps<typeof RQ>) => (
      <RQ ref={forwardedRef} {...props} />
    );
  },
  {
    ssr: false,
  },
);
import "react-quill/dist/quill.snow.css";

// @ts-ignore
import ImageUploader from "quill-image-uploader";

import { useEffect, useRef } from "react";

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

export function RichTextEditor(props: React.ComponentProps<typeof ReactQuill>) {
  // const quillRef = useRef<any>(null);

  // useEffect(() => {
  //   if (quillRef.current) {
  //     const quill = quillRef.current.getEditor();
  //     if (quill)
  //   }
  // }, []);

  return (
    <ReactQuill
      // forwardedRef={quillRef}
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
            imageUploader: {
              async upload(file: File) {
                return "https://sam-mroz.s3.amazonaws.com/c8bf4c96-4a51-4cda-9576-882160d9960b.webp";
              },
            },
          },
        },
      }}
      formats={formats}
      {...props}
    />
  );
}
