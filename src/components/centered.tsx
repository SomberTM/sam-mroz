import { cn } from "@/lib/utils";

export function Centered({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full flex justify-center self-center my-auto",
        className,
      )}
    >
      {children}
    </div>
  );
}
