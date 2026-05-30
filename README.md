# About ASDV Resources

Welcome to ASDV Resources — a community-driven platform built to support students, alumni, and anyone interested in
software development.

ASDV Resources was originally created as a companion site for
the [Application Software Development (ASDV)](https://www.solacc.edu/academics/programs-offered/application-software-development/index)
program
at [South Louisiana Community College](https://www.solacc.edu/). The ASDV program offers an Associate of Applied Science
degree designed to
prepare students for careers in software development and related technology fields. Students who wish to continue
their education can also benefit from the 2+2 transfer agreement
with [University of Louisiana at Lafayette](https://louisiana.edu/),
allowing them to continue into the [Informatics](https://louisiana.edu/majors-minors/informatics) program after
completing the ASDV degree.

## What You'll Find Here

ASDV Resources provides a growing collection of tools and information related to software development and the ASDV
curriculum, including:

- Lists of textbooks commonly used in ASDV courses
- Descriptions and purchase links for required and recommended books
- Collections of useful development resources and reference materials
- Tutorials focused on course-specific topics and general software development concepts
- Download links and explanations for software required in ASDV courses
- Community discussion through Discord channels dedicated to courses, tutoring, study groups, and collaboration

As the platform grows, additional content will expand beyond the immediate curriculum to include broader software
development topics, professional tools, and career-oriented resources.

## Community and Collaboration

ASDV Resources is not intended to be a static website maintained by a single person. One of the primary goals of the
project is to encourage participation and collaboration from students and alumni.

Planned community features include:

- User-submitted tutorials
- Blog posts written by students and contributors
- Comment systems for tutorials and blog posts
- Project showcases to highlight work created by members of the community
- Open-source contributions through pull requests, bug fixes, and feature development

Students are encouraged to contribute content, improve the platform, and use their work here as part of their
professional portfolios and resumes. Real-world collaboration, documentation, communication, and software maintenance
are all valuable development skills, and this platform is intended to provide opportunities to practice them in a
meaningful environment.

## Why This Project Exists

ASDV Resources was also created as a practical software development project — something larger and more realistic than a classroom assignment or isolated tutorial project.

The site serves as:
- A learning resource
- A collaborative development environment
- A portfolio project
- A community hub for current students and alumni

By building and maintaining a platform used by real students, contributors gain experience working on an evolving application with actual users and practical requirements. Contributors can point to their work on this project as evidence of real-world development experience.

## Looking Forward

This project is still growing, and many planned features are actively in development. The long-term vision is to create a sustainable resource that continues helping students long after they complete the ASDV program.

Whether you are a current student, graduate, hobbyist, or aspiring developer, you are welcome here.

We hope ASDV Resources becomes a place where people can learn, collaborate, build experience, and help others succeed in software development.

## Contact
If you have any questions, feedback, or suggestions, please reach out to us on our Discord server https://discord.com/invite/E6dn2kt2cg.

## Tech Stack
- Next.js
- Tailwind CSS
- TypeScript
- Drizzle ORM
- Zod
- PostgreSQL
- Better Auth
- Resend
- Cloudinary

## Getting Started

### Prerequisites
- Node.js
- npm
- PostgreSQL


### Installation
1. Clone the repository:
```bash 
git clone https://github.com/michaelcherrera84/asdv-resources.git 
```
2. Navigate to the project directory:
```bash 
cd asdv-resources
```
3. Add your environment variables:
```bash
cat << EOF > .env.local
DATABASE_URL=<Your PostgreSQL Database URL>

BETTER_AUTH_SECRET=<Your Better Auth Secret> # This is free.
BETTER_AUTH_URL=http://localhost:3000

RESEND_API_KEY=<Your Resend API Key> # Optional (for email verification and password reset)

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name>
NEXT_PUBLIC_CLOUDINARY_API_KEY=<Your Cloudinary API Key>
CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>
EOF
```
4. Generate and run migrations:
```bash
npm run db:generate && npm run db:migrate:local
```
5. Install:
```bash
npm install
```
6. Run the application:
```bash
npm run dev
```
