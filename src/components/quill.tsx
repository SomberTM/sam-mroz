"use client";

/* eslint-disable react/display-name */
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import { ReactQuillProps } from "react-quill";
// @ts-ignore
import ImageUploader from "quill-image-uploader";

import "react-quill/dist/quill.snow.css";

export const Quill = React.forwardRef((props: ReactQuillProps, ref) => {
  const ReactQuill = useMemo(
    () =>
      dynamic(
        async () => {
          const { default: RQ } = await import("react-quill");

          if (RQ.Quill && document !== undefined)
            RQ.Quill.register("modules/imageUploader", ImageUploader);

          return ({
            forwardedRef,
            ...props
          }: { forwardedRef: any } & ReactQuillProps) => (
            <RQ ref={forwardedRef} {...props} />
          );
        },
        {
          ssr: false,
          loading() {
            return <p>Loading...</p>;
          },
        },
      ),
    [],
  );
  return (
    <ReactQuill
      {...props}
      forwardedRef={ref}
      modules={{
        ...props.modules,
        handlers: {
          ...props.modules?.handlers,
          imageUploader: {
            async upload(file: File) {
              return "https://sam-mroz.s3.amazonaws.com/c8bf4c96-4a51-4cda-9576-882160d9960b.webp";
            },
          },
        },
      }}
    />
  );
});
