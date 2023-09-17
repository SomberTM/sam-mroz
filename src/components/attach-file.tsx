"use client";

import { useState } from "react";
import { Input, InputProps } from "./ui/input";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
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

const defaultImageMeta: ImageMeta = {
  width: 600,
  height: 400,
  alt: "An image",
};

export function AttachImage(
  props: InputProps & React.RefAttributes<HTMLInputElement>,
) {
  const [image, setImage] = useState<ImageAttachment>();
  const [imageMeta, setImageMeta] = useState<ImageMeta>(defaultImageMeta);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2">
        <Input
          {...props}
          type="file"
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
        {image && (
          <Popover>
            <PopoverTrigger asChild>
              <Button>Meta</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Image Meta</h4>
                  <p className="text-sm text-muted-foreground">
                    Set the image metadata
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Width</Label>
                    <Input
                      id="width"
                      name="width"
                      type="number"
                      className="col-span-2 h-8"
                      value={imageMeta.width}
                      onChange={(event) =>
                        setImageMeta((meta) => ({
                          ...meta,
                          width: event.target.valueAsNumber,
                        }))
                      }
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="height">Height</Label>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      className="col-span-2 h-8"
                      value={imageMeta.height}
                      onChange={(event) =>
                        setImageMeta((meta) => ({
                          ...meta,
                          height: event.target.valueAsNumber,
                        }))
                      }
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="altText">Alt Text</Label>
                    <Input
                      id="altText"
                      name="altText"
                      className="col-span-2 h-8"
                      value={imageMeta.alt}
                      onChange={(event) =>
                        setImageMeta((meta) => ({
                          ...meta,
                          alt: event.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
      {image && (
        <span>
          {imageMeta.width} x {imageMeta.height} ・ &quot;{imageMeta.alt}&quot;
        </span>
      )}
      {image && (
        <Image
          src={image.url}
          width={imageMeta.width}
          height={imageMeta.height}
          alt={imageMeta.alt}
        />
      )}
    </div>
  );
}
