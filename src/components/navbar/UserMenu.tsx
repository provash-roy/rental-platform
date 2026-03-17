"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Menu, User } from "lucide-react";
import DropdownContent from "./DropdownContent";

export default function UserMenu() {
  const { data: session } = useSession();
  const currentUser = session?.user;

  return (
    <div className="flex items-center gap-2">
      {/* Desktop */}
      <div className="hidden md:flex">
        {currentUser ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={currentUser?.image || ""}
                  alt="User profile"
                  className="grayscale hover:grayscale-0 transition"
                />
                <AvatarFallback>
                  {currentUser?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 rounded-lg">
              <DropdownContent />
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-2">
            <Link href="/login">
              <button className="px-4 py-2 border rounded hover:bg-gray-100 transition">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="px-4 py-2 border rounded hover:bg-gray-100 transition">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="p-2 rounded-full border hover:shadow-md transition"
              aria-label="Menu"
            >
              <Menu size={20} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44 rounded-lg">
            {currentUser ? (
              <DropdownContent />
            ) : (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/login" className="flex items-center gap-2">
                    <User size={16} /> Login
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/register" className="flex items-center gap-2">
                    <User size={16} /> Sign Up
                  </Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
