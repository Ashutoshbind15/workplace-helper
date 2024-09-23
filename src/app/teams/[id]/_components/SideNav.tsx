"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  CodeIcon,
  NotebookIcon,
  PencilIcon,
  PresentationIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

import Link from "next/link";

const SideNav = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const pathsegs = pathname.split("/");
  const finalPath = pathsegs[pathsegs.length - 1];

  const isActive = (path: string) => {
    return finalPath === path;
  };

  const SideNavLink = ({
    subpath,
    description,
    Icon,
  }: {
    subpath: string;
    description: string;
    Icon: React.ElementType;
  }) => {
    return (
      <Link href={`/teams/${id}/${subpath}`}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={!isActive(subpath) ? "outline" : "default"}>
                <Icon className={`${isActive(subpath) ? "text-xl" : ""}`} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Link>
    );
  };

  return (
    <div className="h-screen px-2 border-r-2 border-slate-300 flex flex-col pt-2 gap-y-3 items-center">
      <SideNavLink subpath="projects" description="Projects" Icon={CodeIcon} />
      <SideNavLink
        subpath="meets"
        description="Meets"
        Icon={PresentationIcon}
      />
      <SideNavLink
        subpath="diagrams"
        description="Diagrams"
        Icon={PencilIcon}
      />
      <SideNavLink subpath="notes" description="notes" Icon={NotebookIcon} />
    </div>
  );
};

export default SideNav;
