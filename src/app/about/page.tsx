import { Suspense } from "react";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import ProfileImage from "../_components/profile-image";

export default function About() {
  return (
    <main>
      <Container>
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        <section className="max-w-7xl mx-auto mt-10 mb-10 p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Fuma Suga</h1>
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <ProfileImage />
            <ul className="w-full md:max-w-2xl">
              <div className="mb-4 flex flex-col md:flex-row items-start">
                <dt className="w-full md:w-20 font-bold text-gray-600 shrink-0 mb-2 md:mb-0">Bio:</dt>
                <p>
                  I worked as a web engineer in front-end and back-end development at an SES company, mainly working on projects using C# (ASP.NET).
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-start">
                <dt className="w-full md:w-20 font-bold text-gray-600 shrink-0 mb-2 md:mb-0">Skills:</dt>
                  <ul className="list-disc ml-6 md:ml-4">
                    <li>C#</li>
                    <li>TypeScript / JavaScript</li>
                    <li>HTML / CSS</li>
                    <li>Git / GitHub</li>
                    <li>REST API design & development</li>
                  </ul>
              </div>
            </ul>
          </div>
        </section>
      </Container>
    </main>
  );
}