import Image from "next/image";

export function CaptionedImage({
  src,
  caption,
}: {
  src: string;
  caption: string;
}) {
  return (
    <div className="flex flex-col gap-1 py-2">
      <Image src={src} alt={caption} width={800} height={600} />
      <p className="text-sm text-muted-foreground">{caption}</p>
    </div>
  );
}
