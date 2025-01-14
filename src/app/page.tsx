'use client';

import { MoveRight } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import { useTheme } from "next-themes";

export default function Home() {
  const { resolvedTheme } = useTheme();
  const imagePaths = [
    { src: '/images/sc1.png', caption: 'Portfolio-v6', GitHub: 'https://github.com/nikkou-0814/Portfolio-v6' },
    { src: '/images/sc2.png', caption: 'EarthSaid BOT', GitHub: 'https://github.com/nikkou-0814/EarthSaid' },
    { src: '/images/sc3.png', caption: 'Kyoshin Report BOT', GitHub: 'https://github.com/nikkou-0814/Kyoshin-Report-BOT' },
    { src: '/images/sc4.png', caption: 'All in one PiP', GitHub: 'https://github.com/nikkou-0814/All-in-one-PiP' },
    { src: '/images/sc5.png', caption: 'EewFabric', GitHub: 'https://github.com/nikkou-0814/EewFabric' },
    { src: '/images/sc6.png', caption: 'WherePlayer', GitHub: 'https://github.com/nikkou-0814/WherePlayer' },
    { src: '/images/sc7.png', caption: 'HelloPlayer', GitHub: 'https://github.com/nikkou-0814/HelloPlayer' },
    { src: '/images/sc8.png', caption: 'SlackDown', GitHub: 'https://github.com/nikkou-0814/SlackDown' },
    { src: '/images/sc9.png', caption: 'Pos', GitHub: 'https://github.com/nikkou-0814/Pos-SpigotMCPlugin' },
    { src: '/images/sc10.png', caption: 'SyncLyrics', GitHub: 'https://github.com/nikkou-0814/SyncLyrics' },
  ];

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
          Hi! I&apos;m a Japanese student who recently started studying backend development. I enjoy creating projects about earthquakes and music.
        </p>

        <div className="flex gap-4 flex-wrap justify-center items-center">
          <Link
            href="/projects"
            className="flex items-center gap-2 px-6 py-3 text-white bg-purple-600 rounded-full hover:bg-purple-800 transition-colors"
          >
            See My Projects
            <MoveRight className="w-4 h-4" />
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-2 px-6 py-3 text-purple-600 dark:text-purple-400 border border-purple-600 rounded-full hover:bg-purple-100 dark:hover:bg-purple-950 transition-colors"
          >
            About Me
          </Link>
        </div>
        <div className="absolute bottom-20 w-4/5 hidden md:block">
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
                  src={item.src}
                  alt={item.caption}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-700 transform group-hover:scale-110"
                  style={{
                    transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)',
                  }}
                  priority={index === 0}
                />

                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center text-sm p-2 rounded-b-lg">
                  {item.caption}
                </div>

                <div
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <button
                    className="bg-purple-600 text-white rounded-lg hover:bg-purple-700 px-4 py-2 font-medium shadow-md"
                    onClick={() => window.open(item.GitHub, '_blank')}
                  >
                    <SiGithub className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </section>
    </main>
  );
}