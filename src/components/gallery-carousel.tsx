"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

// Featured gallery items for the carousel
const carouselImages = [
  {
    id: 1,
    src: "/images/gallery/awardfromdm.jpg",
    alt: "award from DM",
    caption: "Our students receiving an award from the District Magistrate",
  },
  {
    id: 2,
    src: "/images/gallery/awareness.jpg",
    alt: "awareness program from police official",
    
    caption: "Awareness program conducted bypolice official",
  },
  {
    id: 3,
    src: "/images/gallery/culturalevent.jpg",
    alt: "Annual Cultural Festival",
    caption: "Colorful performances during our annual cultural festival",
  },
  {
    id: 4,
    src: "/images/gallery/hostingflagatbuilding.jpg",
    alt: "Stundents hosting flag at building",
    caption: "Students hosting the flag at the college building",
  },
  {
    id: 5,
    src: "/images/gallery/independenceday.jpg",
    alt: " Celebrating Independence Day",
    caption: "Celebrating Independence Day with pride and unity",
  },
  {
    id: 6,
    src: "/images/gallery/newscut.jpg",
    alt: "topper student in news",
    caption: "Our student featured in the news for academic excellence",
  },
  {
    id: 7,
    src: "/images/gallery/nss.jpg",
    alt: "Students in NSS Scout Guide",
    caption: "Students participating in NSS Scout Guide activities",
  },
  {
    id: 8,
    src: "/images/gallery/studentassembly.jpg",
    alt: "student assembly for morning prayer",
    caption: "students assembly for morning prayer",
  },
  {
    id: 9,
    src: "/images/gallery/studentfarewell.jpg",
    alt: "school farewell party",
    caption: "Farewell party for our seniors students",
  },
  {
    id: 10,
    src: "/images/gallery/topperceleberation.jpg",
    alt: "topper celebration",
    caption: "Celebrating our students&#39; achievements",
  },
]

export default function GalleryCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovering, setIsHovering] = useState(false)

  // Function to go to next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1))
  }, [])

  // Function to go to previous slide
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1))
  }, [])

  // Function to go to a specific slide
  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Toggle autoplay
  const toggleAutoplay = () => {
    setIsPlaying((prev) => !prev)
  }

  // Autoplay functionality
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying && !isHovering) {
      interval = setInterval(() => {
        nextSlide()
      }, 5000) // Change slide every 5 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, isHovering, nextSlide])

  return (
    <div
      className="relative mb-12 rounded-lg overflow-hidden shadow-xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Carousel Images */}
      <div className="relative h-[300px] md:h-[500px]">
        {carouselImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
              <p className="text-lg md:text-xl font-medium">{image.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={toggleAutoplay}
        className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex justify-center gap-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  )
}
