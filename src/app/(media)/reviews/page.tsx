import { ReviewsList } from "@/components/reviews-list";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Suspense } from "react";

export default function Reviews() {
  return (
    <div className="grow basis-1 flex gap-8 p-8">
      <div className="py-4 w-24 lg:w-1/12 flex flex-col gap-8">
        <h1 className="text-3xl font-bold ">Filters</h1>
        <div className="pl-2 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl">Genres</h2>
            <Separator />
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-2">
                <Checkbox id="comedy" />
                <Label htmlFor="comedy">Comedy</Label>
              </li>
              <li className="flex items-center gap-2">
                <Checkbox id="action" />
                <Label htmlFor="action">Action</Label>
              </li>
              <li className="flex items-center gap-2">
                <Checkbox id="sci-fi" />
                <Label htmlFor="sci-fi">Sci-fi</Label>
              </li>
              <li className="flex items-center gap-2">
                <Checkbox id="romance" />
                <Label htmlFor="romance">Romance</Label>
              </li>
              <li className="flex items-center gap-2">
                <Checkbox id="anime" />
                <Label htmlFor="anime">Anime</Label>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl">Time Period</h2>
            <Separator />
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-2">
                <Checkbox id="2020" />
                <Label htmlFor="2020">2020s</Label>
              </li>
              <li className="flex items-center gap-2">
                <Checkbox id="2010" />
                <Label htmlFor="2010">2010s</Label>
              </li>
              <li className="flex items-center gap-2">
                <Checkbox id="2000" />
                <Label htmlFor="2000">2000s</Label>
              </li>
              <li className="flex items-center gap-2">
                <Checkbox id="90" />
                <Label htmlFor="90">90s</Label>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Separator className="h-full" orientation="vertical" />
      <div className="flex flex-col grow gap-2 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Reviews</h1>
          </div>
          <div className="relative w-64">
            <SearchIcon className="absolute top-0 bottom-0 w-5 h-5 my-auto text-accent left-3" />
            <Input placeholder="Search reviews..." className="pl-12 pr-4" />
          </div>
        </div>
        <Separator className="w-full" />
        <Suspense fallback="Loading reviews...">
          <ReviewsList />
        </Suspense>
      </div>
    </div>
  );
}
