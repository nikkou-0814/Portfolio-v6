'use client';

import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('About');
  return (
    <main className="min-h-screen">
      <section className="flex flex-col items-center justify-center min-h-screen p-8 space-y-8 max-w-4xl mx-auto">
        <div className="space-y-4 text-center mt-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent p-2">
            {t('title')}
          </h1>
        </div>

        <div className="space-y-8 text-gray-700 dark:text-gray-400 leading-relaxed max-w-2xl">
          <div className="space-y-4">
            <p>
              {t('subtitle')}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
              {t('programming.title')}
            </h3>
            <p>
              {t('programming.content1')}
              <a
                href="https://scratch.mit.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 underline"
              >
                Scratch
              </a>
              {t('programming.content2')}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
              {t('webdesign.title')}
            </h3>
            <p>
              {t('webdesign.content')}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
              {t('earthquake.title')}
            </h3>
            <p>
              {t('earthquake.content1')}
              <a
                href="https://jquake.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 underline"
              >
                JQuake
              </a>
              {t('earthquake.content2')}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
              {t('earthquaketool.title')}
            </h3>
            <p>
              {t('earthquaketool.content')}
            </p>
            <p className="text-sm text-gray-500">
              {t('earthquaketool.note1')}
              <a
                href="https://dmdata.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 underline"
              >
                DM-D.S.S
              </a>
              {t('earthquaketool.note2')}
            </p>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg italic border border-purple-300 dark:border-purple-800">
            <p>{t('last')}</p>
          </div>
        </div>
      </section>
    </main>
  );
}