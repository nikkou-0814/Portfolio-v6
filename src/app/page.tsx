'use client';

import { MoveRight, ExternalLink } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import { useTheme } from "next-themes";
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface Project {
  image: string;
  title: string;
  github: string;
  url?: string;
}

export default function Home() {
  const { resolvedTheme } = useTheme();
  const [imagePaths, setImagePaths] = useState<Project[]>([]);
  const t = useTranslations('HomePage');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data: Project[] = await res.json();
        const formattedData = data.map((project) => ({
          image: project.image,
          title: project.title,
          github: project.github,
          url: project.url,
        }));
        setImagePaths(formattedData);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen">
      <section className="flex flex-col items-center justify-center min-h-screen p-8 space-y-6 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent p-2">
            nikkou
          </h1>
          <h2 className="text-xl md:text-2xl dark:text-gray-300 text-gray-800">
            Frontend Developer
          </h2>
        </div>

        <p className="max-w-xl text-gray-700 dark:text-gray-400">
          {t('subtitle')}
        </p>

        <div className="flex gap-4 flex-wrap justify-center items-center">
          <Link
            href="/projects"
            className="flex items-center gap-2 px-6 py-3 text-white bg-purple-600 rounded-full hover:bg-purple-800 transition-colors"
          >
            {t('seeprojects')}
            <MoveRight className="w-4 h-4" />
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-2 px-6 py-3 text-purple-600 dark:text-purple-400 border border-purple-600 rounded-full hover:bg-purple-100 dark:hover:bg-purple-950 transition-colors"
          >
            {t('aboutme')}
          </Link>
        </div>
        <div className="relative w-4/5 hidden md:block top-5">
          <div
            className="absolute inset-y-0 left-0 w-60 z-10 pointer-events-none"
            style={{
              maskImage: "linear-gradient(to right, white, transparent)",
              WebkitMaskImage: "linear-gradient(to right, white, transparent)",
              backgroundColor:
                resolvedTheme === "dark" ? "#0a0a0a" : "white",
            }}
          ></div>

          <div
            className="absolute inset-y-0 right-0 w-60 z-10 pointer-events-none"
            style={{
              maskImage: "linear-gradient(to left, white, transparent)",
              WebkitMaskImage: "linear-gradient(to left, white, transparent)",
              backgroundColor:
                resolvedTheme === "dark" ? "#0a0a0a" : "white",
            }}
          ></div>
          <Marquee
            speed={40}
            gradient={false}
            pauseOnHover
          >
            {imagePaths.map((item, index) => (
              <div
                key={index}
                className="flex-none mx-4 relative group overflow-hidden rounded-lg border border-gray-300 dark:border-gray-800"
                style={{
                  aspectRatio: '16 / 9',
                  width: 'calc(100vw / 4)',
                  maxWidth: '300px',
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-700 transform group-hover:scale-110"
                  style={{
                    transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)',
                  }}
                  priority={index === 0}
                />

                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center text-sm p-2 rounded-b-lg">
                  {item.title}
                </div>

                <div
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 space-x-5"
                >
                  <a
                    href={item.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-600 text-white rounded-lg hover:bg-purple-700 px-4 py-2 font-medium shadow-md flex items-center justify-center"
                  >
                    <SiGithub className="w-6 h-6" />
                  </a>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white rounded-lg hover:bg-blue-700 px-4 py-2 font-medium shadow-md flex items-center justify-center"
                    >
                      <ExternalLink className="w-6 h-6" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </section>
    </main>
  );
}