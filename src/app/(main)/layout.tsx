"use client";
import Container from "@/components/Container";
import Navbar from "@/components/navbar";
import { SessionProvider } from "next-auth/react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Navbar />

      <Container className="pt-20">
        <main className=""> {children}</main>
      </Container>
    </SessionProvider>
  );
}
