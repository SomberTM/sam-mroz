import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

export default function Contact() {
  // return <Image width={600} height={800} src="/sam_bg_rotated.jpg" alt="" />;
  return (
    <>
      <div className="flex h-full justify-between grow">
        <Image
          className="my-8 ml-48 rounded-2xl border-2 border-border"
          width={400}
          height={600}
          src="/sam_left.jpg"
          alt=""
        />
        <Image
          className="my-8 mr-48 rounded-2xl border-2 border-border"
          width={400}
          height={600}
          src="/sam_right.jpg"
          alt=""
        />
      </div>
      <div className="flex flex-col gap-2 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <h1 className="text-3xl font-bold text-center">Contacts</h1>
        <Card className="flex flex-col w-64 p-4 gap-4 border-none">
          <Button>
            <Link href="mailto:smroz@depaul.edu" target="_blank">
              Email
            </Link>
          </Button>
          <Separator />
          <Button>
            <Link
              href="https://depauliaonline.com/staff_name/sam-mroz/"
              target="_blank"
            >
              DePaulia
            </Link>
          </Button>
          <Separator />
          <Button>
            <Link href="https://twitter.com/SamMroz" target="_blank">
              Twitter
            </Link>
          </Button>
          <Separator />
          <Button>
            <Link
              href="https://www.linkedin.com/in/samuel-mroz-458410219/"
              target="_blank"
            >
              LinkedIn
            </Link>
          </Button>
        </Card>
      </div>
    </>
  );
}
