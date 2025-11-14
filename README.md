# 🏫 HRA Inter College Website

A fully responsive and modern educational website for **HRA Inter College**, designed from scratch using **Next.js**, **Tailwind CSS**, and **Shadcn UI**. The site reflects the college’s identity while being lightweight, user-friendly, and mobile-optimized.

## 🚀 Live Demo

[🔗 View Website](https://hraintercollege.netlify.app)

---

## 📌 Features

- ✅ Clean and minimal homepage with dynamic college highlights
- ✅ Responsive layout for mobile, tablet, and desktop
- ✅ Interactive navbar and smooth scroll sections
- ✅ Student/Faculty-focused sections (Admissions, Contact, Gallery, Courses)
- ✅ SEO-friendly structure and fast-loading assets
- ✅ Built with modular components using **Shadcn UI** and **TailwindCSS**
- ✅ Contact form integrated for inquiries (configurable with email/api)
- ✅ Optimized for performance and accessibility

---

## 🧠 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Icons**: Lucide React
- **Deployment**: Netlify

---

## 📁 Project Structure

public/
    ├── images/
        ├── about/
            ├── hracampus.jpg
            ├── principal.png
            └── studentphoto.jpg
        ├── gallery/
            ├── awardfromdm.jpg
            ├── awareness.jpg
            ├── culturalevent.jpg
            ├── hostingflagatbuilding.jpg
            ├── independenceday.jpg
            ├── newscut.jpg
            ├── nss.jpg
            ├── studentassembly.jpg
            ├── studentfarewell.jpg
            └── topperceleberation.jpg
        ├── ansarkhan.jpg
        ├── campus1.jpg
        ├── campus2.jpg
        ├── campus3.jpg
        ├── campus4.jpg
        ├── campus5.jpg
        ├── director.jpg
        ├── faiz.jpg
        ├── hero.jpg
        ├── iqbal
        ├── iqbalphoto.png
        ├── logo.png
        ├── mainbanner.jpg
        ├── nadeem.jpg
        ├── topper1.jpg
        ├── topper2.jpg
        └── topper3.jpg
    ├── favicon.ico
    ├── file.svg
    ├── globe.svg
    ├── next.svg
    ├── vercel.svg
    └── window.svg
src/
    ├── app/
        ├── (app)/
            ├── dashboard/
                ├── student/
                    └── page.tsx
                └── teacher/
                    └── page.tsx
            ├── layout.tsx
            └── page.tsx
        ├── (auth)/
            ├── sign-in/
                └── page.tsx
            ├── studentRegister/
                └── page.tsx
            └── teacherRegister/
                └── page.tsx
        ├── about/
            └── page.tsx
        ├── academics/
            └── page.tsx
        ├── admissions/
            └── page.tsx
        ├── api/
            ├── attendance/
                ├── check/
                    └── route.ts
                ├── history/
                    └── route.ts
                ├── mark/
                    └── route.ts
                ├── student/
                    └── route.ts
                ├── update/
                    └── route.ts
                └── view/
                    └── route.ts
            ├── auth/
                └── [...nextauth]/
                    ├── option.ts
                    └── route.ts
            ├── dummyData/
                └── route.ts
            ├── signup/
                ├── studentRegister/
                    └── route.ts
                └── teacherRegister/
                    └── route.ts
            ├── teacher/
                └── studentDetails/
                    └── route.ts
            └── verifyCode/
                └── route.ts
        ├── contact/
            └── page.tsx
        ├── examination/
            └── page.tsx
        ├── gallery/
            ├── layout.tsx
            └── page.tsx
        ├── results/
            └── page.tsx
        ├── testing/
            ├── dummyData/
                └── page.tsx
            └── page.tsx
        ├── verify/
            └── [email]/
                └── page.tsx
        ├── favicon.ico
        ├── globals.css
        └── layout.tsx
    ├── components/
        ├── ui/
            ├── badge.tsx
            ├── button.tsx
            ├── calendar.tsx
            ├── card.tsx
            ├── checkbox.tsx
            ├── dialog.tsx
            ├── form.tsx
            ├── input-otp.tsx
            ├── input.tsx
            ├── label.tsx
            ├── scroll-area.tsx
            ├── select.tsx
            ├── sheet.tsx
            ├── sonner.tsx
            └── table.tsx
        ├── Footer.tsx
        ├── gallery-carousel.tsx
        ├── LayoutClient.tsx
        └── Navbar.tsx
    ├── context/
        └── AuthProvider.tsx
    ├── hooks/
        └── use-mobile.ts
    ├── lib/
        ├── authStore.ts
        ├── axios.ts
        ├── dbConnect.ts
        ├── loadingStore.ts
        └── utils.ts
    ├── model/
        ├── AttendanceModel.ts
        ├── Teacher.ts
        └── User.ts
    ├── schema/
        ├── studentsignInSchema.ts
        ├── studentsignUpSchema.ts
        ├── techersignUpSchema.ts
        └── verifySchema.ts
    ├── types/
        ├── ApiResponse.ts
        └── next-auth.d.ts
    └── middleware.ts
.gitignore
components.json
eslint.config.mjs
next.config.ts
package-lock.json
package.json
postcss.config.mjs
README.md
tsconfig.json


---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/hra-inter-college.git

# Navigate into the project
cd hra-inter-college

# Install dependencies
npm install

# Run the development server
npm run dev

Open http://localhost:3000 in your browser to see the result.

👨‍💻 Developer
MOhammad Iqbal
🔗 Portfolio
📧 ki925053@gmail.com
📍 Lucknow, Uttar Pradesh



📄 License
This project is licensed under the MIT License.
## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

# 🏫 HRA Inter College Website

A fully responsive and modern educational website for **HRA Inter College**, designed from scratch using **Next.js**, **Tailwind CSS**, and **Shadcn UI**. The site reflects the college’s identity while being lightweight, user-friendly, and mobile-optimized.

## 🚀 Live Demo

[🔗 View Website](https://hraintercollege.netlify.app)

---

## 📌 Features

- ✅ Clean and minimal homepage with dynamic college highlights
- ✅ Responsive layout for mobile, tablet, and desktop
- ✅ Interactive navbar and smooth scroll sections
- ✅ Student/Faculty-focused sections (Admissions, Contact, Gallery, Courses)
- ✅ SEO-friendly structure and fast-loading assets
- ✅ Built with modular components using **Shadcn UI** and **TailwindCSS**
- ✅ Contact form integrated for inquiries (configurable with email/api)
- ✅ Optimized for performance and accessibility

---

## 🧠 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Icons**: Lucide React
- **Deployment**: Netlify

---

## 📁 Project Structure

app/
├── layout.tsx # Root layout
├── page.tsx # Homepage
└── about, contact, etc # Routes
components/
├── Navbar.tsx
├── Footer.tsx
├── HeroSection.tsx
└── Card.tsx, Section.tsx, etc.
public/
└── college-logo.png, gallery images
styles/
└── globals.css


---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/hra-inter-college.git

# Navigate into the project
cd hra-inter-college

# Install dependencies
npm install

# Run the development server
npm run dev

Open http://localhost:3000 in your browser to see the result.

👨‍💻 Developer
MOhammad Iqbal
🔗 Portfolio
📧 ki925053@gmail.com
📍 Lucknow, Uttar Pradesh



📄 License
This project is licensed under the MIT License.
