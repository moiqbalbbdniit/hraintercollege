import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="HRA Inter College Utraula Logo"
                width={50}
                height={50}
                className="bg-white rounded-full p-1"
              />
              <div>
                <h3 className="text-xl font-bold">H.R.A. Inter College</h3>
                <p className="text-sm text-gray-400">Utraula • Estd 2003</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Education Way of Peace & Knowledge through quality education and holistic development.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-teal-500">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-teal-500">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-teal-500">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-teal-500">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-teal-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/academics" className="text-gray-400 hover:text-teal-500">
                  Academics
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="text-gray-400 hover:text-teal-500">
                  Admissions
                </Link>
              </li>
              
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-teal-500">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-teal-500">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-xl font-bold mb-4">Programs</h3>
            <ul className="space-y-2">
              {/* <li>
                <Link href="/academics/science" className="text-gray-400 hover:text-teal-500">
                  Science Stream
                </Link>
              </li>
              <li>
                <Link href="/academics/commerce" className="text-gray-400 hover:text-teal-500">
                  Commerce Stream
                </Link>
              </li>
              <li>
                <Link href="/academics/arts" className="text-gray-400 hover:text-teal-500">
                  Arts Stream
                </Link>
              </li>
              <li>
                <Link href="/academics/curriculum" className="text-gray-400 hover:text-teal-500">
                  Curriculum
                </Link>
              </li> */}
              <li>
                <Link href="/examination" className="text-gray-400 hover:text-teal-500">
                  Examination
                </Link>
              </li>
              <li>
                <Link href="/results" className="text-gray-400 hover:text-teal-500">
                  Results
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-10 w-10 text-teal-500 mt-0.5" />
                <span className="text-gray-400">Mohallah Gandhi Nagar, Near C. H. C. Utraula, Utraula, India, 271604</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-teal-500" />
                <span className="text-gray-400"><a href="tel:+911234567890" >
                  +91 9918776564
                  </a></span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-teal-500" />
                <span className="text-gray-400">info@hraintercollegeutraula.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} HRA Inter College Utraula. All rights reserved. <span className="text-yellow-600">made with ❤️ by <Link href="https://www.instagram.com/zaheen.iqbal/">Iqbal (web administrator)</Link></span></p>
        </div>
      </div>
    </footer>
  )
}
