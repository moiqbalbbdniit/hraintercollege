import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, Calendar,  ArrowRight, Clock, Wrench} from "lucide-react"

export default function AdmissionsWorkingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-yellow-100 text-yellow-800 rounded-full mb-4">
            <Wrench className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-teal-800">Iqbal&#39;s Team working hard on the Academics Page</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're working to improve your experience with a new and improved academics page
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          {/* Illustration */}
          {/* <div className="relative h-64 md:h-80 mb-12">
            <Image
              src="/placeholder.svg?height=400&width=800"
              alt="Under Construction Illustration"
              fill
              className="object-contain"
            />
          </div> */}

          {/* Coming Soon Card */}
          <Card className="mb-12 border-teal-200 border-2">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-teal-100 p-4 rounded-full">
                  <Calendar className="h-10 w-10 text-teal-700" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-teal-800">Coming Soon</h2>
                  <p className="text-gray-600 mb-4">
                    Our new academic page will be ready soon Insallah. It
                    will feature a streamlined application process, detailed program information, and an improved user
                    experience.
                  </p>
                  <div className="flex items-center gap-2 text-teal-700">
                    <Clock className="h-5 w-5" />
                    <span className="font-medium">Estimated completion: 2 weeks</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alternative Ways Section */}
          <h2 className="text-2xl font-bold mb-6 text-center text-teal-800">
            In the meantime, you can still get information about academics:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-yellow-700" />
                  </div>
                  <h3 className="font-bold text-lg">Call Us</h3>
                  <p className="text-gray-600">Speak directly with our admissions team for immediate assistance.</p>
                  <a href="tel:+911234567890" className="text-teal-700 font-semibold">
                  +91 9918776564
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-yellow-700" />
                  </div>
                  <h3 className="font-bold text-lg">Email Us</h3>
                  <p className="text-gray-600">
                    Send your queries to our admissions department for detailed information.
                  </p>
                  <a href="mailto:admissions@hraicollege.edu" className="text-teal-700 font-semibold">
                  info@hraintercollegeutraula.com
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <FileText className="h-6 w-6 text-yellow-700" />
                  </div>
                  <h3 className="font-bold text-lg">Download Brochure</h3>
                  <p className="text-gray-600">Access our admissions brochure with all essential information.</p>
                  <Button className="bg-teal-700 hover:bg-teal-800 mt-2">Download PDF</Button>
                </div>
              </CardContent>
            </Card> */}
          </div>

          {/* Notification Form */}
          {/* <Card className="mb-12">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-yellow-100 p-4 rounded-full flex-shrink-0">
                  <Bell className="h-10 w-10 text-yellow-700" />
                </div>
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold mb-2">Get Notified When We're Ready</h2>
                  <p className="text-gray-600 mb-4">
                    Leave your email address and we'll notify you as soon as our new admissions page is live.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input type="email" placeholder="Your email address" className="flex-grow p-3 border rounded-md" />
                    <Button className="bg-teal-700 hover:bg-teal-800 whitespace-nowrap">Notify Me</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card> */}

          {/* Important Dates Preview */}
          {/* <div className="bg-white p-6 rounded-lg shadow-sm border mb-12">
            <h2 className="text-2xl font-bold mb-4 text-teal-800">Important Dates to Remember</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-teal-100 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-teal-700" />
                </div>
                <div>
                  <h3 className="font-bold">Application Forms Available</h3>
                  <p className="text-gray-600">June 20, 2025</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-teal-100 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-teal-700" />
                </div>
                <div>
                  <h3 className="font-bold">Last Date for Form Submission</h3>
                  <p className="text-gray-600">July 31, 2025</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-teal-100 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-teal-700" />
                </div>
                <div>
                  <h3 className="font-bold">Entrance Examination</h3>
                  <p className="text-gray-600">August 15, 2025</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-teal-100 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-teal-700" />
                </div>
                <div>
                  <h3 className="font-bold">Academic Session Begins</h3>
                  <p className="text-gray-600">September 1, 2025</p>
                </div>
              </div>
            </div>
          </div> */}

          {/* Return to Home */}
          <div className="text-center">
            <Link href="/" className="inline-flex items-center text-teal-700 font-medium hover:text-teal-800">
              <ArrowRight className="h-4 w-4 mr-2 rotate-180" /> Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
