import Image from "next/image";
import Link from "next/link";

function CaptionedImage({ src, caption }: { src: string; caption: string }) {
  return (
    <div className="flex flex-col gap-1 py-2">
      <Image src={src} alt={caption} width={800} height={600} />
      <p className="text-sm text-muted-foreground">{caption}</p>
    </div>
  );
}

function ExternalLink({
  href,
  children,
}: React.PropsWithChildren<{ href: string }>) {
  return (
    <Link href={href} target="_blank" className="underline text-blue-600">
      {children}
    </Link>
  );
}

export default async function Story() {
  return (
    <div className="md:w-1/2 sm:w-2/3 w-full mx-auto flex flex-col py-8 px-4 gap-4">
      <h1 className="text-center font-bold text-xl">
        Neighborhood to neighborhood, Chicago cuisine is carried by its inviting
        restaurants and the history they offer
      </h1>
      <iframe
        className="self-center"
        src="https://www.google.com/maps/d/embed?mid=1nS5cu7kCpi_uQDmBKK2Ot60Nhho0TDo&ehbc=2E312F"
        width="640"
        height="480"
      ></iframe>
      <p>
        Yari Vargas is a longtime Chicago native and is no stranger to the
        city&apos;s dense network of dining options. Born and raised in a
        household defined by Puerto Rican and Honduran roots, she didn&apos;t
        have to look far for culture.
      </p>
      <p>
        But after opening up her Latin American restaurant Casa Yari in 2013,
        her background would serve as the deciding difference between other
        culinary alternatives.
      </p>
      <p>
        &quot;Chicago is known for so many amazing restaurants and sometimes
        it&apos;s hard to be visible and compete with all these other options,”
        said Vargas. “But above everything, staying true to myself has been the
        key to Casa&apos;s success.”
      </p>
      <CaptionedImage
        src="/casayari.jpg"
        caption="Chicago native, Yari Vargas used her family roots from Honduras and Puerto Rico to bring a Latin American feel to Casa Yari and the culture it promotes. Photo by Sam Mroz"
      />
      <p>
        A decade later and Casa Yari continues to promote a Latin lifestyle
        through palettes, blending family recipes with Chicago influences to
        make an experience as distinct as it is personal. As both Yari and her
        Casa continue to grow, her efforts reflect the intimate side of dining
        that is often overlooked amid Chicago&apos;s sprawling grid of food
        fare.
      </p>
      <p>
        Uptown Chicago has long known the scent of Hong Kong-style Chinese
        Barbeque, as Sun Wah BBQ has been serving up original dishes since 1987.
      </p>
      <p>
        Just off the Western station on the CTA&apos;s Blue Line, and Costa
        Rican quality would settle down in Bucktown, with Irazú offering “
        <ExternalLink href="https://www.irazuchicago.com/">
          traditional homecooked foods to the Chicago--land area
        </ExternalLink>
        ” since 1990.
      </p>
      <p>
        Separated by location and culture, they all share an authentic touch.
        Built by family values that are instilled into every appetizer, entrée,
        and even the occasional cheeky dessert. Representing their histories at
        large, to them being genuine isn&apos;t a suggestion. It&apos;s a code.
      </p>
      <CaptionedImage
        src="/sunwah.jpg"
        caption="Right off the Argyle station, Sun Wah BBQ has offered Hong Kong-style Chinese barbecue to Chicago citizens for over 35 years. Photo by Sam Mroz"
      />
      <CaptionedImage
        src="/costarica.jpg"
        caption="Serving the cuisine of Costa Rica since 1990, Irazú offers a wide sample of traditional homecooked foods to the Chicago-land area. Photo by Sam Mroz"
      />
      <p>
        For Michael Campo, co-owner of Mart Anthony&apos;s Italian Restaurant,
        his right to serve real Italian tastes would take an entire childhood to
        master. Growing up alongside the business, his grandpa and the spaces
        founder, Martin Campo, would instill in him a family standard.
      </p>
      <p>
        &quot;I think the most important part is making people feel comfortable,
        making them feel welcome,&quot; said Campo. Layered with family
        memorabilia and classic Italian suave, every item inside Mart
        Anthony&apos;s bore its own history. &quot;My grandpa, for example, this
        was his life. He spent more time in this chair that you&apos;re in right
        now than he did with my grandma.&quot;
      </p>
      <CaptionedImage
        src="/martanthonys.jpg"
        caption="Founded by Martin Anthony Campo in 1981, Mart Anthony's lives off it's Italian aesthetic and enduring community to bring Chicago a welcoming space built by family roots. Photo by Sam Mroz"
      />
      <p>
        With an oak outline coated by a burgundy-red leather cushion, there were
        20 seats that looked just like it. And yet, they were all different,
        with years of late-night banter and casual conversation that no
        cleaning, no matter how extensive, could wipe away.
      </p>
      <p>
        Welcomed like family, Chicago citizens come to Mart Anthony&apos;s to
        roost, settling in for a night of real food sheltered by honest people.
        But the morning still comes, and in Lincoln Park, a Chicago staple wakes
        up bright and early to serve up some soul for those who are lacking.
      </p>
      <p>
        Founded in 2012 by Dr. Tanya and Craig Richardson, Batter and Berries
        had one mission… to redefine Chicago&apos;s brunch scene. Opening up
        along North Lincoln Ave. to a growing Chicago neighborhood,{" "}
        <ExternalLink href="https://www.chicago.gov/city/en/depts/dcd/provdrs/ec_dev/news/2023/march/city-grant-will-support-new-austin-restaurant.html">
          the restaurant would only grow
        </ExternalLink>{" "}
        in the years to come.
      </p>
      <p>
        Infamous for their cheese-crusted hashbrowns and above all, their “
        <ExternalLink href="https://batterandberries.com/">
          world-famous French toast flight
        </ExternalLink>
        ”, a good breakfast is only as quality as those who make it. Co-owner of
        Batter and Berries, Craig Richardson defined the value they place
        towards their food, but even more so for the personal brand as a whole.
      </p>
      <p>
        “There are a lot of great places to target,” said Richardson. “With good
        food or customer service, they get a lot of business, but they
        don&apos;t have a full product. Product is my teaching. Product is
        everything”
      </p>
      <CaptionedImage
        src="/batterandberries.jpg"
        caption="Opened in 2012, Batter and Berries has spent over a decade on Lincoln Ave. treating Lincoln Park locals and Chicago residents with a bounty of breakfast dishes. "
      />
      <p>
        A principle can go a long way, especially for independent establishments
        with eyes to grow. But in all the developments, competing franchises and
        global epidemics considered, making connections can turn local patrons
        into lifelong friends.
      </p>
      <p>
        &quot;That&apos;s how I feel with my regulars,&quot; said Vargas.
        &quot;If I&apos;m adding something new or a special on my menu, I get
        excited to have them try it and get their opinions. Whenever I see them
        I hug them just like family.&quot;
      </p>
      <p>
        And what&apos;s a family without a home, especially one with a chair
        like no other.
      </p>
      <p>
        &quot;This is his home, his dining room, his living room, and he invited
        people in and that&apos;s what we&apos;ve continued doing,&quot; said
        Campo.
      </p>
      <p>
        Places to eat, to talk and most of all, to connect, Chicago cuisine
        carries itself by the many cultures within its city bounds. Latin
        American to Chinese, Costa Rican to Italian, and a bit of soul food left
        over, these five restaurants offer a broader city experience.
      </p>
      <p>
        One that prefers authentic dishes over haphazard chow. With histories
        known to invite conversations rather than avoid them, who knows what
        talks with arise? No matter the chatter, you can expect a well-cooked
        meal wedged between active discussions, but no promises can be made for
        any hugs thrown one&apos;s way.
      </p>
    </div>
  );
}
