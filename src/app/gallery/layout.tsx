import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gallery | HRA Inter College",
  description: "Explore photos from campus life, events, and achievements at HRA Inter College Utraula.",
}

export default function GalleryLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
