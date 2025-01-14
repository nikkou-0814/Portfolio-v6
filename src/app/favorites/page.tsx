'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Favorites() {
  const music = {
    playlistUrl: "https://embed.music.apple.com/jp/playlist/topmusic/pl.u-KVXBkA6TLVvNr9K?l=en-US",
  };

  const games = [
    {
      title: 'Blue Archive',
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2z1g.png',
      description: "The BGM is amazing. But I haven't been able to play it lately.",
      url: 'https://bluearchive.jp'
    },
    {
      title: 'Cities: Skylines',
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1mx3.png',
      description: 'Back in the day, playing them on a super low-spec PC is also a fond memory.',
      url: 'https://www.paradoxinteractive.com/games/cities-skylines'
    },
    {
      title: 'Cities: Skylines II',
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co68lb.png',
      description: 'I wanted it so much that I went to buy it as soon as it was released.',
      url: 'https://www.paradoxinteractive.com/games/cities-skylines-ii'
    },
    {
      title: 'Minecraft',
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co49x5.png',
      description: "I've been playing it since the early days of smartphones. Probably the first game I ever played.",
      url: 'https://minecraft.net'
    },
    {
      title: 'Project Sekai',
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co6bw0.png',
      description: "Even though I can't do full combos, I'm still playing Master.",
      url: 'https://pjsekai.sega.jp'
    },
    {
      title: 'VALORANT',
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2mvt.png',
      description: "I haven't been playing it much lately, but it's quite fun.",
      url: 'https://playvalorant.com'
    }
  ];  

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4 text-center mt-16 mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent p-2">
            My Favorites
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            My favorite music and games that I enjoy.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Music
          </h2>
          <div className="flex justify-center">
            <div className="w-full max-w-3xl bg-gray-100 dark:bg-gray-950 rounded-xl overflow-hidden shadow-lg">
              <iframe
                allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                className="w-full h-[450px]"
                style={{ borderRadius: '15px' }}
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                src={music.playlistUrl}
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Games
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {games.map((game, index) => (
              <motion.div
                key={game.title}
                className="group relative flex bg-gray-100 dark:bg-gray-950 rounded-xl overflow-hidden border border-gray-300 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-1/4 h-full">
                  <Image
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="relative w-2/3 p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    <a
                      href={game.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 dark:text-purple-400 underline"
                    >
                      {game.title}
                    </a>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {game.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};