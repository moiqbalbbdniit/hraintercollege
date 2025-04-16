import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-800/60 to-teal-800/60 z-10" />
        <Image
          src="/images/hero.jpg"
          alt="Contact HRA Inter College"
          width={1600}
          height={400}
          className="w-full h-[400px] object-cover"
          priority
        />
        <div className="container relative z-20 mx-auto px-4 py-10 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-3xl">
            We&#39;re here to help. Reach out to us with any questions or inquiries.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-700 mb-8">
                Have questions about admissions, academics, or any other aspect
                of HRA Inter College? Our team is here to assist you. Feel free
                to reach out to us through any of the following channels.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-blue-600" />
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
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Phone</h3>
                    <p className="text-gray-600"><a href="tel:+911234567890">
                  +91 9918776564
                  </a></p>
                    {/* <p className="text-gray-600">Admissions: +91 9876543210</p> */}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Email</h3>
                    <p className="text-gray-600">
                    info@hraintercollegeutraula.com
                    </p>
                    {/* <p className="text-gray-600">
                      Admissions: admissions@hraicollege.edu
                    </p> */}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Office Hours</h3>
                    <p className="text-gray-600">
                      Monday to Friday: 8:00 AM - 4:00 PM
                    </p>
                    <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
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
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter your phone number"
                      />
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
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Send className="h-4 w-4 mr-2" /> Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Location</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find us easily with the map below. We&#39;re conveniently located in
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

      {/* Department Contacts */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Department Contacts</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Reach out directly to specific departments for specialized assistance.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Academic Departments</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold">Science Department</h4>
                      <p className="text-gray-600">Email: science@hraicollege.edu</p>
                      <p className="text-gray-600">Phone: +91 1234567891</p>
                    </div>
                    <div>
                      <h4 className="font-bold">Commerce Department</h4>
                      <p className="text-gray-600">Email: commerce@hraicollege.edu</p>
                      <p className="text-gray-600">Phone: +91 1234567892</p>
                    </div>
                    <div>
                      <h4 className="font-bold">Arts Department</h4>
                      <p className="text-gray-600">Email: arts@hraicollege.edu</p>
                      <p className="text-gray-600">Phone: +91 1234567893</p>
                    </div>
                    <div>
                      <h4 className="font-bold">Physical Education</h4>
                      <p className="text-gray-600">Email: sports@hraicollege.edu</p>
                      <p className="text-gray-600">Phone: +91 1234567894</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Administrative Offices</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold">Principal&#39;s Office</h4>
                      <p className="text-gray-600">Email: principal@hraicollege.edu</p>
                      <p className="text-gray-600">Phone: +91 1234567895</p>
                    </div>
                    <div>
                      <h4 className="font-bold">Admissions Office</h4>
                      <p className="text-gray-600">Email: admissions@hraicollege.edu</p>
                      <p className="text-gray-600">Phone: +91 1234567896</p>
                    </div>
                    <div>
                      <h4 className="font-bold">Accounts Department</h4>
                      <p className="text-gray-600">Email: accounts@hraicollege.edu</p>
                      <p className="text-gray-600">Phone: +91 1234567897</p>
                    </div>
                    <div>
                      <h4 className="font-bold">Examination Cell</h4>
                      <p className="text-gray-600">Email: exams@hraicollege.edu</p>
                      <p className="text-gray-600">Phone: +91 1234567898</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about contacting us.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">What are the best hours to visit the campus?</h3>
                <p className="text-gray-600">
                  The best time to visit our campus is during regular office hours (Monday to Friday, 8:00 AM - 4:00
                  PM). We recommend scheduling an appointment in advance for a guided tour.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">How can I schedule a meeting with a specific department?</h3>
                <p className="text-gray-600">
                  You can schedule a meeting by calling the department directly or sending an email with your preferred
                  date and time. Contact details for each department are provided above.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">Is there a helpline for emergency situations?</h3>
                <p className="text-gray-600">
                  Yes, for emergencies during college hours, you can contact our emergency helpline at +91 9876543211.
                  For after-hours emergencies, please contact the security office at +91 9876543212.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">
                  How long does it typically take to get a response to an email inquiry?
                </h3>
                <p className="text-gray-600">
                  We strive to respond to all email inquiries within 24-48 hours during working days. For urgent
                  matters, we recommend calling the relevant department directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">We&#39;d Love to Hear From You</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Whether you have questions about admissions, academics, or campus life, our team is here to help. Reach out
            to us today!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
              Contact Admissions
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Schedule a Visit
            </Button>
          </div>
        </div>
      </section> */}
    </div>
  );
}
