'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Suitou() {
  const t = useTranslations('Suitou');
  return (
    <main className="min-h-screen">
      <section className="flex flex-col items-center justify-center p-8 space-y-8 max-w-4xl mx-auto">
        <div className="space-y-4 text-center mt-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent p-2">
            {t('title')}
          </h1>
          <div className="space-y-4">
            <p>
              {t('subtitle')}
            </p>
          </div>
        </div>
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            {t('activities.title')}
          </h2>
          <p className="text-gray-700 dark:text-gray-400 leading-relaxed max-w-2xl">
            {t('activities.subtitle')}
          </p>
        </div>

        <div className="w-full max-w-4xl space-y-14">
          <div className='flex flex-col items-center'>
            <a
              href="https://www.tunecore.co.jp/artists/suitou"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center space-y-4 transition-transform duration-300"
            >
              <div className="relative w-64 h-64 group flex flex-col rounded-full overflow-hidden bg-gray-100 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                <Image
                  src="/images/suitou_icon.png"
                  alt="Suitou Artist"
                  fill
                  className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <span className="text-purple-600 dark:text-purple-300 font-medium">
                {t('activities.suitou')}
              </span>
            </a>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
              {t('activities.latest_release')}
            </h3>
            <a
              href="https://linkco.re/UzpyPhE0"
              target="_blank"
              rel="noopener noreferrer"
              className="group block transition-transform duration-300"
            >
              <div className="relative w-64 h-64 group flex flex-col rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                <Image
                  src="/images/latest-release.png"
                  alt="Latest Release Artwork"
                  fill
                  className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </a>
            <div className="text-center space-y-2">
              <a
                href="https://linkco.re/UzpyPhE0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-purple-600 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-200 transition-colors duration-200 font-medium"
              >
                {t('activities.latest_release_title')}
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('activities.release_date')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="flex flex-col items-center justify-center p-8 max-w-4xl mx-auto">
        <div className="space-y-8 text-gray-700 dark:text-gray-400 leading-relaxed max-w-2xl">
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 text-center">
              {t('suitou.title')}
            </h2>
            <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
              {t('suitou.title1')}
            </h3>
            <p>
              {t.rich('suitou.content1', {
                b: (chunks) => <strong className="font-semibold text-purple-600 dark:text-purple-200">{chunks}</strong>,
              })}
            </p>
            <h4 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
              {t('suitou.title2')}
            </h4>
            <p>{t('suitou.content2')}</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>{t('suitou.content3')}</li>
              <li>{t('suitou.content4')}</li>
            </ul>
            <p>{t('suitou.content5')}</p>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="italic">
                {t('suitou.content6')}
              </p>
            </div>
            <h4 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
              {t('suitou.title3')}
            </h4>
            <p>
              {t.rich('suitou.content7', {
                b: (chunks) => <strong className="font-semibold text-purple-600 dark:text-purple-200">{chunks}</strong>,
              })}
            </p>
            <h4 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
              {t('suitou.title4')}
            </h4>
            <p>
              {t.rich('suitou.content8', {
                b: (chunks) => <strong className="font-semibold text-purple-600 dark:text-purple-200">{chunks}</strong>,
              })}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
