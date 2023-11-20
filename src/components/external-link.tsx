import Link from "next/link";

export function ExternalLink({
  href,
  children,
}: React.PropsWithChildren<{ href: string }>) {
  return (
    <Link href={href} target="_blank" className="underline text-blue-600">
      {children}
    </Link>
  );
}
