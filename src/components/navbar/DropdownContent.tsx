import React from "react";
import { DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import RentModal from "../modals/RentModal"

export default function DropdownContent() {
  return (
    <>
      <DropdownMenuItem asChild>
        <Link href="/profile" className="flex items-center gap-2">
          <User size={16} /> Profile
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
       <RentModal/>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem
        onClick={() => signOut({ callbackUrl: "/" })}
        className="flex items-center gap-2 text-red-500 cursor-pointer"
      >
        <LogOut size={16} /> Logout
      </DropdownMenuItem>
    </>
  );
}
