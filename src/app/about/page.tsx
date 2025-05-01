import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-800/60 to-teal-800/60 z-10" />
        <Image
          src="/images/about/hracampus.jpg"
          alt="About HRA Inter College"
          width={1600}
          height={400}
          className="w-full h-[400px] object-cover"
          priority
        />
        <div className="container relative z-20 mx-auto px-4 py-16 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl max-w-3xl">
            Learn about our history, mission, vision, and the values that drive us to provide quality education.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2000, HRA Inter College has established itself as a premier educational institution committed
                to academic excellence and holistic development of students. What started as a small institution with
                limited resources has now grown into a comprehensive educational center with state-of-the-art
                facilities.
              </p>
              <p className="text-gray-700 mb-4">
                Over the years, we have consistently maintained high academic standards, producing top-ranking students
                who have excelled in various competitive examinations and secured admissions in prestigious universities
                across the country and abroad.
              </p>
              <p className="text-gray-700">
                Our journey has been marked by continuous growth, innovation, and adaptation to the changing educational
                landscape, always keeping the welfare and success of our students at the forefront of our mission.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image src="/images/about/studentphoto.jpg" alt="College History" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission & Vision</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Guiding principles that shape our approach to education and student development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Our Mission</h3>
              <p className="text-gray-700 mb-4">
                To provide quality education that nurtures intellectual curiosity, critical thinking, and creativity
                while instilling values of integrity, respect, and social responsibility.
              </p>
              <p className="text-gray-700">
                We are committed to creating a supportive learning environment that empowers students to realize their
                full potential and prepares them to meet the challenges of a rapidly changing world.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Our Vision</h3>
              <p className="text-gray-700 mb-4">
                To be recognized as a center of academic excellence that transforms students into knowledgeable,
                skilled, and responsible citizens who contribute positively to society.
              </p>
              <p className="text-gray-700">
                We envision creating a learning community that fosters innovation, embraces diversity, and promotes
                lifelong learning, preparing students not just for examinations but for life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The fundamental beliefs that guide our actions and define our character as an institution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 border rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in all our endeavors, setting high standards and continuously raising the bar.
              </p>
            </div>

            <div className="p-6 border rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Integrity</h3>
              <p className="text-gray-600">
                We uphold the highest ethical standards, fostering honesty, transparency, and accountability.
              </p>
            </div>

            <div className="p-6 border rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We encourage creative thinking and innovative approaches to teaching, learning, and problem-solving.
              </p>
            </div>

            <div className="p-6 border rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Inclusivity</h3>
              <p className="text-gray-600">
                We embrace diversity and create an inclusive environment where every individual is valued and respected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated professionals who guide our institution towards excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                <Image
                  src="/images/about/principal.png"
                  alt="Principal"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">Mr. V.K. Srivastava</h3>
              <p className="text-blue-600 mb-3">Principal</p>
              <p className="text-gray-600 mb-4">
                With over 25 years of experience in education, Mr. V.K. leads our institution with vision and
                dedication.
              </p>
            </div>

            {/* <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Vice Principal"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">Dr. Sunita Sharma</h3>
              <p className="text-blue-600 mb-3">Vice Principal</p>
              <p className="text-gray-600 mb-4">
                A distinguished academician with expertise in curriculum development and student counseling.
              </p>
            </div> */}

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                <Image
                  src="/images/ansarkhan.jpg"
                  alt="Director sir"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">Mr. Ansar Ahmad Khan</h3>
              <p className="text-blue-600 mb-3">Managing Director</p>
              <p className="text-gray-600 mb-4">
                Manages the administrative functions of the School with efficiency and precision.
              </p>
            </div>
          </div>

          {/* <div className="text-center mt-10">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Link href="/about/faculty">View All Faculty & Staff</Link>
            </Button>
          </div> */}
        </div>
      </section>

      {/* Achievements */}
      <section className="py-5 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Achievements</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Milestones that mark our journey of excellence in education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 border rounded-lg text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <p className="text-gray-700">Pass Percentage in Board Exams</p>
            </div>

            <div className="p-6 border rounded-lg text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <p className="text-gray-700">Trained Teachers</p>
            </div>

            <div className="p-6 border rounded-lg text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">5000+</div>
              <p className="text-gray-700">Alumni in Prestigious Institutions</p>
            </div>

            <div className="p-6 border rounded-lg text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">25+</div>
              <p className="text-gray-700">Years of Educational Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Educational Community</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Be a part of an institution that values excellence, integrity, and holistic development. Apply for admission
            today!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Link href="/admissions">Apply Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-black bg-teal-600 border-black hover:bg-white/10">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
