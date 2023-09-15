import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="flex justify-between gap-16 px-64 py-32">
      <Image
        width={600}
        height={800}
        src="/sam_serious.png"
        className="rounded-xl border-border border-2"
        alt=""
      />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Sam Mroz</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Natoque
          penatibus et magnis dis parturient montes nascetur ridiculus. Mauris
          in aliquam sem fringilla ut morbi tincidunt. Platea dictumst
          vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras.
          Purus gravida quis blandit turpis cursus. Eu lobortis elementum nibh
          tellus molestie. Imperdiet massa tincidunt nunc pulvinar sapien et
          ligula ullamcorper. Arcu cursus euismod quis viverra nibh cras
          pulvinar mattis. Magnis dis parturient montes nascetur ridiculus mus.
          Ornare quam viverra orci sagittis eu volutpat odio facilisis. Tellus
          id interdum velit laoreet id donec ultrices tincidunt arcu. A iaculis
          at erat pellentesque adipiscing commodo elit at. Consectetur libero id
          faucibus nisl tincidunt. Fermentum dui faucibus in ornare quam viverra
          orci sagittis eu. Ut diam quam nulla porttitor massa. Ipsum faucibus
          vitae aliquet nec ullamcorper.
        </p>
        <p>
          Amet consectetur adipiscing elit pellentesque habitant. Vel fringilla
          est ullamcorper eget nulla facilisi etiam dignissim diam. Nisl nisi
          scelerisque eu ultrices vitae auctor eu augue. Libero volutpat sed
          cras ornare arcu dui vivamus. Aenean vel elit scelerisque mauris
          pellentesque pulvinar pellentesque habitant morbi. Purus in massa
          tempor nec feugiat nisl pretium fusce. Magna etiam tempor orci eu
          lobortis elementum nibh tellus molestie. Praesent semper feugiat nibh
          sed pulvinar proin gravida hendrerit lectus. Sed viverra ipsum nunc
          aliquet bibendum enim facilisis gravida. Faucibus vitae aliquet nec
          ullamcorper sit amet risus. Velit egestas dui id ornare arcu odio ut
          sem. Vitae ultricies leo integer malesuada nunc vel risus. Dignissim
          sodales ut eu sem integer vitae justo eget. Aliquam sem et tortor
          consequat id porta nibh. Purus sit amet volutpat consequat. Dolor sit
          amet consectetur adipiscing elit duis tristique sollicitudin nibh.
          Lectus mauris ultrices eros in. Lorem ipsum dolor sit amet
          consectetur. Tincidunt arcu non sodales neque.
        </p>
        <Button>
          <Link href="/contact">Contact Me</Link>
        </Button>
      </div>
    </div>
  );
}
