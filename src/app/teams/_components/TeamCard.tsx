"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React, { useState, useMemo } from "react";

const getRandomColor = () => {
  const colors = [
    "bg-red-700",
    "bg-slate-700",
    "bg-blue-700",
    "bg-zinc-700",
    "bg-yellow-700",
    "bg-pink-700",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const TeamCard = ({ team }: any) => {
  const [hoveredEmail, setHoveredEmail] = useState<string | null>(null);

  const memberColors = useMemo(() => {
    const colorMap: Record<string, string> = {};
    team?.members?.forEach((member: any) => {
      colorMap[member?.user?.email] = getRandomColor();
    });
    return colorMap;
  }, [team?.members]);

  const renderMembers = (role: string, maxDisplay: number = 4) => {
    const filteredMembers = team?.members?.filter(
      (member: any) => member?.role === role
    );

    return (
      <div className="py-2 border-y-2 border-slate-300 mb-1 flex gap-x-12 justify-between">
        <p className="w-20 capitalize">{role}s: </p>
        <div className="flex -space-x-2">
          {filteredMembers.slice(0, maxDisplay).map((member: any) => {
            const email = member?.user?.email;
            const initials = email?.charAt(0).toUpperCase();
            const bgColor = memberColors[email]; // Get memoized color

            return (
              <div
                key={email}
                className={`relative flex items-center justify-center w-8 h-8 rounded-full ${bgColor} text-white text-sm cursor-pointer`}
                onMouseEnter={() => setHoveredEmail(email)}
                onMouseLeave={() => setHoveredEmail(null)}
              >
                {hoveredEmail === email ? (
                  <span className="absolute top-full mt-1 w-auto px-2 py-1 text-xs text-white bg-black rounded shadow-lg">
                    {email}
                  </span>
                ) : (
                  initials
                )}
              </div>
            );
          })}
          {filteredMembers.length > maxDisplay && (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-300 text-sm text-slate-600">
              +{filteredMembers.length - maxDisplay}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="w-1/3 md:w-1/4">
      <CardHeader>
        <CardTitle>{team.title}</CardTitle>
        <CardDescription>{team.description}</CardDescription>
      </CardHeader>

      <CardContent>
        {renderMembers("member")}
        {renderMembers("admin")}
        {renderMembers("manager")}
      </CardContent>

      <CardFooter>
        <Button>
          <Link href={`/teams/${team.id}/projects`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TeamCard;
