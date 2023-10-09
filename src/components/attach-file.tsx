"use client";

import { useState } from "react";
import { Input, InputProps } from "./ui/input";
import { Label } from "./ui/label";

export interface ImageAttachment {
  url: string;
  file: File;
}

export interface ImageMeta {
  width: number;
  height: number;
  alt: string;
}

export function AttachImage(
  props: InputProps & React.RefAttributes<HTMLInputElement>,
) {
  const [image, setImage] = useState<ImageAttachment>();

  return (
    <div className="flex flex-col gap-2">
      <div className="relative items-center flex gap-2 w-full">
        <Input
          {...props}
          type="file"
          accept="image/*"
          onChange={(event) => {
            if (image) URL.revokeObjectURL(image.url);

            const files = event.target.files;
            if (!files || files.length === 0) return setImage(undefined);

            const file = files[0];
            const newImage = {
              url: URL.createObjectURL(file),
              file,
            };
            setImage(newImage);
          }}
        />
        <span className="absolute right-4 text-muted-foreground text-sm">
          Images will be resized to 1200x1000px
        </span>
      </div>
      {/* {image && <Image src={image.url} width={1200} height={1000} alt={""} />} */}
      {image && (
        <div className="flex flex-col gap-2">
          <Label htmlFor="alt">Alt Text</Label>
          <Input
            id="alt"
            name="alt"
            required
            placeholder="Meaningful description of the image for those using screen readers"
          />
        </div>
      )}
    </div>
  );
}
