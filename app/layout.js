import { ModalProvider } from "@/providers/modal-provider";
import NextAuthSessionProvider from "@/providers/session-provider";

import "./globals.css";
import ToastProvider from "@/providers/toast-provider";

export const metadata = {
  title: "Pettah.js",
  description: "The beginner friendly eCommerce backend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIwIiBoZWlnaHQ9IjIwNiIgdmlld0JveD0iMCAwIDIyMCAyMDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTAuMjE4MiA3MS40OTUzTDE1LjU3MjQgMTQyLjg4NUMxNy40MjM2IDE3Mi4yNzYgNDEuNjIzNiAxOTUuMjY4IDcxLjA3MDkgMTk1LjYxNEgxNDguOTE1QzE3OC4zNjcgMTk1LjI3NSAyMDIuNTc2IDE3Mi4yODIgMjA0LjQyOCAxNDIuODg1TDIwOS43ODIgNzEuNDk1M0MyMTEuMTYxIDU1LjgzNjMgMjA1Ljk1OCA0MC4zMTAxIDE5NS40MjQgMjguNjQzQzE4NC44ODggMTYuOTc1OSAxNjkuOTcyIDEwLjIyMTIgMTU0LjI1NSAxMEg2NS43MzFDNTAuMDE1NSAxMC4yMjUyIDM1LjEwMyAxNi45ODE2IDI0LjU3MTMgMjguNjQ4MkMxNC4wMzk3IDQwLjMxNDkgOC44MzkzNiA1NS44Mzg3IDEwLjIxODIgNzEuNDk1M1oiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMjAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTUyLjgyNyA2Ny4xMTE5QzE1Mi44MjcgODIuNDE1IDE0NC42NjMgOTYuNTU1OSAxMzEuNDEgMTA0LjIwOEMxMTguMTU3IDExMS44NTkgMTAxLjgyOSAxMTEuODU5IDg4LjU3NiAxMDQuMjA4Qzc1LjMyMzIgOTYuNTU1OSA2Ny4xNTkgODIuNDE1IDY3LjE1OSA2Ny4xMTE5IiBzdHJva2U9IiNGNTlFMEIiIHN0cm9rZS13aWR0aD0iMjAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K"
        sizes="any"
      />
      <body>
        <NextAuthSessionProvider>
          <ToastProvider />
          <ModalProvider />
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
