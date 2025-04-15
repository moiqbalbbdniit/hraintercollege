import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Users,
  Award,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 h-full w-full bg-gradient-to-r from-teal-900/80 to-teal-800/80" />

        {/* Hero Image */}
        <div className="relative w-full h-[500px]">
          <Image
            src="/hero.jpg"
            alt="HRA Inter College Campus"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Hero Text */}
        <div className="container absolute inset-0 z-20 mx-auto px-4 flex items-center text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to HRA Inter College
            </h1>
            <p className="text-xl mb-8">Education Way of Peace & Knowledge</p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-teal-900 font-semibold"
              >
                <Link href="/admissions">
              Apply now
            </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Announcement Banner */}
      <section className="bg-yellow-600 text-white py-3">
        <div className="container mx-auto px-4">
          <p className="text-center font-medium">
            Admissions open for 2025-26 academic year!{" "}
            <Link href="/admissions" className="underline font-bold">
              Apply now
            </Link>
          </p>
        </div>
      </section>
      {/* Quick Links */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1 */}
              <Card className="border-l-4 border-l-teal-600">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-teal-100 p-3 rounded-full">
                      <BookOpen className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Academics</h3>
                      <p className="text-gray-600 mb-4">
                        Explore our diverse range of academic programs
                      </p>
                      <Link
                        href="/academics"
                        className="text-teal-600 font-medium flex items-center gap-1 hover:underline"
                      >
                        Learn more <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card 2 */}
              <Card className="border-l-4 border-l-yellow-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <Users className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Admissions</h3>
                      <p className="text-gray-600 mb-4">
                        Information about the admission process
                      </p>
                      <Link
                        href="/admissions"
                        className="text-yellow-600 font-medium flex items-center gap-1 hover:underline"
                      >
                        Apply now <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card 3 */}
              <Card className="border-l-4 border-l-yellow-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <Award className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Achievements</h3>
                      <p className="text-gray-600 mb-4">
                        Discover our students' and faculty's achievements
                      </p>
                      <Link
                        href="/achievements"
                        className="text-yellow-600 font-medium flex items-center gap-1 hover:underline"
                      >
                        Explore <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* // director message section */}
      <section className="bg-white py-12 px-4 md:px-16" id="director-message">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Director's Image */}
          <div className="flex justify-center">
            <div className="w-[400px] h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/ansarkhan.jpg" // Replace with your image path
                alt="Director"
                width={400}
                height={400}
                className="w-full h-full object-cover rounded-2xl"
                priority
              />
            </div>
          </div>

          {/* Director's Message */}
          <div>
            <h2 className="text-3xl font-bold text-teal-600 mb-4">
              Director's Message
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Welcome to our institution, where dedication meets excellence. As
              the Director, I am proud to lead a team committed to quality
              education and innovation. Our mission is to empower students with
              knowledge, skills, and values that shape a brighter future.
            </p>
            <p className="mt-4 text-teal-600 font-semibold">
              -Mr. Ansar Ahmed Khan, Director
            </p>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                About HRA Inter College
              </h2>
              <p className="text-gray-700 mb-4">
                Founded in 2003 with a vision to provide quality education, HRA
                Inter College has been a center of academic excellence for over
                two decades. Our institution is committed to nurturing young
                minds and preparing them for future challenges.
              </p>
              <p className="text-gray-700 mb-6">
                With state-of-the-art facilities, experienced faculty, and a
                comprehensive curriculum, we ensure that our students receive
                the best education and opportunities for growth.
              </p>
              <Button className="bg-teal-700 hover:bg-teal-800">
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/mainbanner.jpg"
                alt="College Building"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Toppers Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Toppers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We take pride in the academic excellence of our students. Meet
              some of our top performers who have made us proud with their
              outstanding achievements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
            <Card className="w-full max-w-sm rounded-xl overflow-hidden shadow-md p-0">
              <div className="relative w-full h-60">
                <Image
                  src="/images/topper1.jpg"
                  alt="Topper - bilal khan"
                  fill
                  className="object-fit"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Bilal Khan</h3>
                <p className="text-teal-600 font-semibold mb-3">
                  Science Stream - 98.8%
                </p>
                <div className="bg-yellow-100 p-3 rounded-md">
                  <p className="text-gray-800 font-medium">District Rank: 9</p>
                  {/* <p className="text-gray-800 font-medium">State Rank: 15</p> */}
                </div>
                {/* <div className="mt-4">
                  <p className="text-gray-600">Secured admission in IIT Delhi for B.Tech in Computer Science.</p>
                </div> */}
              </CardContent>
            </Card>

            <Card className="w-full max-w-sm rounded-xl overflow-hidden bg-white shadow-md p-0">
              <div className="relative w-full h-60">
                <Image
                  src="/images/topper2.jpg"
                  alt="Topper - shivnath katiyar"
                  fill
                  className="object-fill"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Shivnath Katiyar</h3>
                <p className="text-teal-600 font-semibold mb-3">
                  Science Stream - 99.8%
                </p>
                <div className="bg-yellow-100 p-3 rounded-md">
                  <p className="text-gray-800 font-medium">District Rank: 4</p>
                  {/* <p className="text-gray-800 font-medium">State Rank: 15</p> */}
                </div>
                {/* <div className="mt-4">
                  <p className="text-gray-600">Secured admission in IIT Delhi for B.Tech in Computer Science.</p>
                </div> */}
              </CardContent>
            </Card>

            <Card className="w-full max-w-sm rounded-xl overflow-hidden bg-white shadow-md p-0">
              <div className="relative w-full h-60">
                <Image
                  src="/images/topper3.jpg"
                  alt="Topper - bilal khan"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Mohammad Iqbal</h3>
                <p className="text-teal-600 font-semibold mb-3">
                  Science Stream - 98.8%
                </p>
                <div className="bg-yellow-100 p-3 rounded-md">
                  <p className="text-gray-800 font-medium">District Rank: 9</p>
                  {/* <p className="text-gray-800 font-medium">State Rank: 15</p> */}
                </div>
                {/* <div className="mt-4">
                  <p className="text-gray-600">Secured admission in IIT Delhi for B.Tech in Computer Science.</p>
                </div> */}
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-gray-50  shadow-md rounded-lg border border-gray-200">
              <div className="text-left">
                <h3 className="font-bold text-lg mb-1">
                  100% Results in Board Exams
                </h3>
                <p className="text-gray-600">
                  Our students have consistently achieved excellent results in
                  board examinations year after year.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button className="bg-teal-700 hover:bg-teal-800">
              <Link href="/achievements">View All Achievements</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Campus Life & Facilities Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Campus Life & Facilities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our state-of-the-art facilities and vibrant campus life
              that provide an enriching environment for learning and growth.
            </p>
          </div>

          {/* Main Facilities Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/campus2.jpg"
                alt="Campus Overview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Modern Campus</h3>
                  <p>
                    Our sprawling campus features modern architecture, green
                    spaces, and a conducive learning environment.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              <div className="relative h-[240px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/campus1.jpg"
                  alt="Library"
                  fill
                  className="object-cover"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-lg font-bold">Library</h3>
                    <p className="text-sm">
                      Extensive collection of books, journals, and digital
                      resources
                    </p>
                  </div>
                </div> */}
              </div>

              <div className="relative h-[240px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/campus3.jpg"
                  alt="Computer Lab"
                  fill
                  className="object-cover"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-lg font-bold">Computer Labs</h3>
                    <p className="text-sm">
                      Advanced computing facilities with latest software and
                      hardware
                    </p>
                  </div>
                </div> */}
              </div>

              <div className="relative h-[240px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/campus4.jpg"
                  alt="Science Labs"
                  fill
                  className="object-cover"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-lg font-bold">Science Labs</h3>
                    <p className="text-sm">
                      Well-equipped laboratories for physics, chemistry, and
                      biology
                    </p>
                  </div>
                </div> */}
              </div>

              <div className="relative h-[240px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/campus5.jpg"
                  alt="Sports Facilities"
                  fill
                  className="object-cover"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-lg font-bold">Sports Complex</h3>
                    <p className="text-sm">
                      Indoor and outdoor sports facilities for physical
                      development
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          

         
          
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-teal-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Students Say</h2>
            <p className="max-w-2xl mx-auto opacity-80">
              Hear from our students about their experiences at HRA Inter
              College.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-teal-700 text-white border-none">
              <CardContent className="p-6">
                <p className="italic mb-6">
                  Studying at H.R.A. Inter College was a transformative experience for me. The dedicated teachers, supportive environment, and focus on discipline laid a strong foundation for my higher education. It helped me build the confidence and academic skills necessary for engineering. I truly appreciate everything I learned during my time there.
                </p>
                <div className="flex items-center">
                  <div className=" rounded-full bg-teal-600 mr-4">
                    <Image
                      src="/images/iqbalphoto.png"
                      alt="Iqbal"
                      width={60}
                      height={60}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">Mohammad Iqbal</h4>
                    <p className="opacity-80">Batch of 2022</p>
                    <p className="opacity-80">Pursuing B.Tech. CSE from BBD University Lucknow</p>

                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-teal-700 text-white border-none">
              <CardContent className="p-6">
                <p className="italic mb-6">
                  H.R.A. Inter College played a major role in shaping my future. The school encouraged creativity, critical thinking, and discipline, which are all important in my architecture studies. The faculty was always supportive and pushed me to do better. I'm proud to have been a student of this prestigious institution.
                </p>
                <div className="flex items-center">
                  <div className=" rounded-full bg-teal-600 mr-4">
                    <Image
                      src="/images/nadeem.jpg"
                      alt="nadeemkhan"
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold pt-5">Mohammad Nadeem Khan</h4>
                    <p className="opacity-80">Batch of 2022</p>
                    <p className="opacity-80">Pursuing Bachelor of Architecture from Integral University Lucknow</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-teal-700 text-white border-none">
              <CardContent className="p-6">
                <p className="italic mb-6">
                  My journey at H.R.A. Inter College was filled with learning, growth, and memorable experiences. The supportive teachers and well-structured curriculum prepared me well for my physiotherapy studies. The school didn’t just focus on academics, but also on overall development. I’m grateful for the values and education I received here.
                </p>
                <div className="flex items-center">
                <div className=" rounded-full bg-teal-600 mr-4">
                    <Image
                      src="/images/faiz.jpg"
                      alt="faiz khan"
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">Faiz Khan</h4>
                    <p className="opacity-80">Batch of 2022</p>
                    <p className="opacity-80">Pursuing Bachelor of Physiotherapy from Integral University Lucknow</p>

                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Location</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find us easily with the map below. We're conveniently located in
              the heart of the Utraula.
            </p>
          </div>

          <div className="max-w-5xl mx-auto h-[400px] bg-gray-200 rounded-lg overflow-hidden">
            {/* This would be replaced with an actual map component in a real implementation */}
            <div className="w-full h-full flex items-center justify-center bg-gray-300">
              {/* <p className="text-gray-600">Map would be displayed here</p> */}
              <iframe
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3544.935613792043!2d82.40960907455944!3d27.315203576409512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399742ea359dbe87%3A0xe5f4bdc5f2ae71e7!2sH%20R%20A%20Inter%20Collage!5e0!3m2!1sen!2sin!4v1744703873153!5m2!1sen!2sin"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* <div className="max-w-5xl mx-auto mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">By Public Transport</h3>
                  <p className="text-gray-600">Bus Routes: 101, 203, 305 stop directly in front of the college.</p>
                  <p className="text-gray-600">Metro: Nearest station is Central Station (10 minutes walk).</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">By Car</h3>
                  <p className="text-gray-600">Ample parking space available within the campus.</p>
                  <p className="text-gray-600">Follow the main highway and take the Education District exit.</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">Nearby Landmarks</h3>
                  <p className="text-gray-600">City Public Library (500m)</p>
                  <p className="text-gray-600">Central Park (1km)</p>
                  <p className="text-gray-600">City Hospital (1.5km)</p>
                </CardContent>
              </Card>
            </div>
          </div> */}
        </div>
      </section>


      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
              <p className="text-gray-700 mb-8">
                Have questions or need more information? Feel free to reach out
                to us. We're here to help!
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-teal-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Address</h3>
                    <p className="text-gray-600">
                      Mohallah Gandhi Nagar, Near C. H. C. Utraula, Utraula,
                      India, 271604
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-teal-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Phone</h3>
                    <p className="text-gray-600">+91 9918776564</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-teal-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Email</h3>
                    <p className="text-gray-600">
                      info@hraintercollegeutraula.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6">Send us a message</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Full Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          className="w-full p-2 border rounded-md"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="w-full p-2 border rounded-md"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter subject"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter your message"
                      ></textarea>
                    </div>
                    <Button className="w-full bg-teal-700 hover:bg-teal-800">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
