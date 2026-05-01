import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — AV Studio",
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
