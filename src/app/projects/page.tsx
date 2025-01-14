'use client';

import React from 'react';
import Image from 'next/image';
import { SiGithub } from 'react-icons/si';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      title: 'Portfolio-v6',
      description: 'I created this portfolio as a step beyond HTML.',
      image: '/images/sc1.png',
      github: 'https://github.com/nikkou-0814/Portfolio-v6',
      url: 'https://nikkou.dev',
      tags: ['Next.js', 'TailwindCSS', 'Vercel']
    },
    {
      title: 'EarthSaid BOT',
      description: 'I made this because I wanted to create something related to earthquakes.',
      image: '/images/sc2.png',
      github: 'https://github.com/nikkou-0814/EarthSaid',
      tags: ['Discord.py']
    },
    {
      title: 'Kyoshin Report BOT',
      description: 'This utilizes the workflow of KyoshinEewViewer for ingen.',
      image: '/images/sc3.png',
      github: 'https://github.com/nikkou-0814/Kyoshin-Report-BOT',
      tags: ['Discord.js', 'Node.js']
    },
    {
      title: 'All in one PiP',
      description: 'I made it because I wanted it for myself.',
      image: '/images/sc4.png',
      github: 'https://github.com/nikkou-0814/All-in-one-PiP',
      tags: ['JavaScript']
    },
    {
      title: 'EewFabric',
      description: 'A mod for FabricServer to receive and display earthquake early warnings.',
      image: '/images/sc5.png',
      github: 'https://github.com/nikkou-0814/EewFabric',
      tags: ['Java', 'Minecraft']
    },
    {
      title: 'WherePlayer',
      description: 'A mod for FabricServer to display player locations.',
      image: '/images/sc6.png',
      github: 'https://github.com/nikkou-0814/WherePlayer',
      tags: ['Java', 'Minecraft']
    },
    {
      title: 'HelloPlayer',
      description: 'A plugin for Velocity servers to display player join and leave events.',
      image: '/images/sc7.png',
      github: 'https://github.com/nikkou-0814/HelloPlayer',
      tags: ['Java', 'Minecraft']
    },
    {
      title: 'SlackDown',
      description: 'An extension to scroll Slack threads to the very bottom.',
      image: '/images/sc8.png',
      github: 'https://github.com/nikkou-0814/SlackDown',
      tags: ['JavaScript']
    },
    {
      title: 'Pos',
      description: 'The Spigot version of WherePlayer.',
      image: '/images/sc9.png',
      github: 'https://github.com/nikkou-0814/Pos-SpigotMCPlugin',
      tags: ['Java', 'Minecraft']
    },
    {
      title: 'SyncLyrics',
      description: 'A web app that displays synchronized lyrics over a YouTube video background.',
      image: '/images/sc10.png',
      github: 'https://github.com/nikkou-0814/SyncLyrics',
      url: 'https://sync-musiclyrics.vercel.app',
      tags: ['Next.js', 'TailwindCSS', 'Vercel']
    },
  ];

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4 text-center mt-16 mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent p-2">
            My Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            These are my works and their associated GitHub repositories. I’ve learned a lot from each of these projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group relative flex flex-col rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6 flex-grow">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                  {project.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
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
                      View Site
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
};

export default Projects;