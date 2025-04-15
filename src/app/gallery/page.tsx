import Image from "next/image"
import { Button } from "@/components/ui/button"
import GalleryCarousel from "@/components/gallery-carousel"

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative ">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-teal-800/80 z-10" />
        <Image
          src="/images/mainbanner.jpg"
          alt="HRA Inter College Gallery"
          width={1600}
          height={400}
          className="w-full h-[600px] object-cover"
          priority
        />
        <div className="container relative z-20 mx-auto px-4 py-16 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Photo Gallery</h1>
          <p className="text-xl max-w-3xl">
            Explore moments and memories from our campus life, events, and achievements.
          </p>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* Gallery description */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-teal-800">Our College in Pictures</h2>
            <p className="text-gray-600">
              Browse through our collection of photographs showcasing the vibrant life at HRA Inter College. From
              academic achievements to cultural events, sports activities to campus infrastructure, these images capture
              the essence of our institution.
            </p>
          </div>

          {/* Featured Images Carousel */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-teal-800">Featured Highlights</h3>
            <GalleryCarousel />
          </div>

         
        </div>
      </section>

      {/* Submit Photos CTA */}
      {/* <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-teal-800">Have Photos to Share?</h2>
            <p className="text-gray-600 mb-6">
              Are you a student, alumni, or parent with memorable photos from college events or activities? We'd love to
              feature them in our gallery!
            </p>
            <Button className="bg-teal-700 hover:bg-teal-800">Submit Your Photos</Button>
          </div>
        </div>
      </section> */}
    </div>
  )
}
