'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { SiGithub } from 'react-icons/si';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Project } from '@/types';
import { useTranslations, useLocale } from 'next-intl';

export default function Projects() {
  const locale = useLocale();
  const [projects, setProjects] = useState<Project[]>([]);
  const t = useTranslations('Projects');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data: Project[] = await res.json();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchProjects();
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title[locale] || project.title['en']}
              className="group relative flex flex-col rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title[locale] || project.title['en']}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  className="transform group-hover:scale-110 transition-transform duration-500"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6 flex-grow">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                  {project.title[locale] || project.title['en']}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description[locale] || project.description['en']}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 pt-0 mt-auto">
                <div
                  className={`flex flex-wrap ${project.url ? "gap-4" : ""} ${
                    !project.url ? "justify-center" : ""
                  }`}
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300 text-nowrap ${
                      project.url ? "flex-grow" : "w-full"
                    }`}
                  >
                    GitHub
                    <SiGithub className="w-5 h-5" />
                  </a>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-nowrap flex-grow"
                    >
                      {t('viewsite')}
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}