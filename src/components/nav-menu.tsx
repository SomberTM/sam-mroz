"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import {
  StarHalfIcon,
  ScrollTextIcon,
  PhoneIcon,
  User2Icon,
  type LucideIcon,
  NewspaperIcon,
  PencilIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";

interface Route {
  title: string;
  href: string;
  // exhaustive set of roles allowed to access this route.
  // if no roles defined everyone can access
  roles?: string[];
  description?: string;
  icon?: LucideIcon;
}

interface RouteGroup {
  title: string;
  routes: Route[];
}

function isAuthorizedForRoute(route: Route, role?: string) {
  if (!route.roles) return true;
  if (!role) return route.roles.includes("USER");
  return route.roles.includes(role);
}

function isRouteGroup(route: Route | RouteGroup): route is RouteGroup {
  return "routes" in route;
}

const routes: (Route | RouteGroup)[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Media",
    routes: [
      {
        title: "Stories",
        href: "/stories",
        description: "Find articles written by me",
        icon: ScrollTextIcon,
      },
      {
        title: "Create Story",
        href: "/stories/new",
        roles: ["CREATOR", "ADMIN"],
        description: "Create a new story",
      },
      {
        title: "Reviews",
        href: "/reviews",
        description: "Find movie and tv reviews written by me",
        icon: StarHalfIcon,
      },
      {
        title: "Create Review",
        href: "/reviews/new",
        roles: ["CREATOR", "ADMIN"],
        description: "Create a new review",
      },
      {
        title: "Posts",
        href: "/posts/1",
        description: "Shorter form content and updates",
        icon: NewspaperIcon,
      },
      {
        title: "Create Post",
        href: "/posts/new",
        roles: ["CREATOR", "ADMIN"],
        description: "Create a new post",
      },
    ],
  },
  {
    title: "Personal Info",
    routes: [
      {
        title: "About Me",
        href: "/about",
        description: "A little bit about myself and what drives me",
        icon: User2Icon,
      },
      {
        title: "Contact",
        href: "/contact",
        description: "All my contact information and socials",
        icon: PhoneIcon,
      },
      {
        title: "Edit Profile",
        href: "/profile",
        description: "Edit your author profile",
        roles: ["CONTENT", "ADMIN"],
        icon: PencilIcon,
      },
    ],
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: LucideIcon }
>(({ className, title, icon: Icon, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none rounded-md space-y-1 p-4 h-20 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="flex items-center gap-2 font-medium leading-none">
            {title} {!!Icon && <Icon size="18" />}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export async function NavMenu({
  role,
  className,
}: {
  role?: string;
  className?: string;
}) {
  return (
    <NavigationMenu className={cn("hidden md:block", className)}>
      <NavigationMenuList>
        {routes.map((routeOrGroup) => {
          if (isRouteGroup(routeOrGroup)) {
            return (
              <NavigationMenuItem key={routeOrGroup.title}>
                <NavigationMenuTrigger>
                  {routeOrGroup.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid grid-cols-2 gap-2 p-4 rounded-lg w-[400px]">
                    {routeOrGroup.routes
                      .filter((route) => isAuthorizedForRoute(route, role))
                      .map((route) => (
                        <ListItem
                          key={route.title}
                          href={route.href}
                          title={route.title}
                          icon={route.icon}
                        >
                          {route.description}
                        </ListItem>
                      ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          } else if (isAuthorizedForRoute(routeOrGroup, role)) {
            return (
              <NavigationMenuItem key={routeOrGroup.title}>
                <Link href={routeOrGroup.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {routeOrGroup.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          }
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function NavList({
  role,
  className,
}: {
  role?: string;
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-col gap-2", className)}>
      {routes.map((routeOrGroup) => {
        if (isRouteGroup(routeOrGroup)) {
          return (
            <li key={routeOrGroup.title} className="flex flex-col gap-2">
              <span className="ml-4">{routeOrGroup.title}</span>
              <ul className="flex flex-col gap-1 pl-4">
                {routeOrGroup.routes
                  .filter((route) => isAuthorizedForRoute(route, role))
                  .map((route) => {
                    const Icon = route.icon;
                    return (
                      <li key={route.title}>
                        <Link href={route.href}>
                          <Button variant="link" className="flex gap-2">
                            {route.title}
                            {!!Icon && (
                              <span className="text-muted-foreground">
                                <Icon size="18" />
                              </span>
                            )}
                          </Button>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </li>
          );
        } else if (isAuthorizedForRoute(routeOrGroup, role)) {
          const Icon = routeOrGroup.icon;
          return (
            <li key={routeOrGroup.title}>
              <Link href={routeOrGroup.href}>
                <Button variant="link" className="flex gap-2">
                  {routeOrGroup.title}
                  {!!Icon && (
                    <span className="text-muted-foreground">
                      <Icon size="18" />
                    </span>
                  )}
                </Button>
              </Link>
            </li>
          );
        }
      })}
    </ul>
  );
}
