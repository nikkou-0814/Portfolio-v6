'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Game } from '../../types/game';
import { useTranslations, useLocale } from 'next-intl';

export default function Favorites() {
  const locale = useLocale();
  const [Games, setGames] = useState<Game[]>([]);
  const t = useTranslations('Favorites');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch('/api/games');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data: Game[] = await res.json();
        setGames(data);
      } catch (error) {
        console.error('Failed to fetch games:', error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4 text-center mt-16 mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent p-2">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            {t('music')}
          </h2>
          <div className="flex justify-center">
            <div className="w-full max-w-3xl bg-gray-100 dark:bg-gray-950 rounded-xl overflow-hidden shadow-lg">
              <iframe
                allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                className="w-full h-[450px]"
                style={{ borderRadius: '15px' }}
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                src="https://embed.music.apple.com/jp/playlist/topmusic/pl.u-KVXBkA6TLVvNr9K?l=en-US"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            {t('game')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Games.map((game, index) => (
              <motion.div
                key={game.title[locale] || game.title['en']}
                className="group relative flex bg-gray-100 dark:bg-gray-950 rounded-xl overflow-hidden border border-gray-300 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-1/4 h-full">
                  <Image
                    src={game.image}
                    alt={game.title[locale] || game.title['en']}
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
                      {game.title[locale] || game.title['en']}
                    </a>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {game.description[locale] || game.description['en']}
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