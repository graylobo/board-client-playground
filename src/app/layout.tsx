"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "../components/Header";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
