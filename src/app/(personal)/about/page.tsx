import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="flex justify-between gap-16 px-64 py-32">
      <Image
        width={400}
        height={600}
        src="/sam_serious.png"
        className="rounded-xl border-border border-2"
        alt=""
      />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Sam Mroz</h1>
        <p>
          Sam Mroz is a Chicago-based writer, covering stories in pop culture,
          television and film. As a sophomore at DePaul University, he is
          actively pursuing a major in journalism with a minor in Media and
          Cinema Studies. Before moving to the city, his time was spent in
          suburban Indiana, writing for his high school paper.
        </p>
        <p>
          He currently acts as the Assistant Arts and Life Editor for
          DePaul&apos;s student newspaper, The DePaulia, where his work details
          the creative scene at DePaul as well as broader entertainment trends.
          He has also written various film and television reviews for the
          publication, alongside feature stories on DePaul student clubs and
          Chicago establishments.
        </p>
        <p>
          When not writing, he works as an intern for the California-based media
          analytics company, Katch Data. Poised to graduate in 2025, he hopes to
          move to either LA or New York, where he can write on further topics
          within the entertainment industry.
        </p>
        <Button>
          <Link href="/contact">Contact Me</Link>
        </Button>
      </div>
    </div>
  );
}
