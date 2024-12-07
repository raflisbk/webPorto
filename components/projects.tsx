"use client"

import { ProjectCard } from '@/components/project-card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getGitHubProjects } from '@/lib/github'

type Project = {
  id: string
  title: string
  description: string
  link: string
  tags: string[]
  language?: string
  stars?: number
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setIsLoading(true);
        const githubProjects = await getGitHubProjects('raflisbk');
        setProjects(githubProjects);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Terjadi kesalahan saat mengambil proyek. Silakan coba lagi nanti.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, [])

  if (isLoading) {
    return <div className="text-center py-10">Memuat proyek...</div>
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>
  }

  if (projects.length === 0) {
    return <div className="text-center py-10">Tidak ada proyek yang ditemukan.</div>
  }

  return (
    <section id="projects" className="py-24 sm:py-32 futuristic-bg">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container"
      >
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 neon-text">Portofolio Project</h2>
          <p className="text-muted-foreground">
            Berikut ini adalah portofolio project yang pernah saya kerjakan.
          </p>
        </div>
        <Carousel 
          className="w-full max-w-5xl mx-auto"
          onSelect={(selectedIndex) => setCurrentSlide(selectedIndex)}
        >
          <CarouselContent>
            {projects.map((project, index) => (
              <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-1"
                >
                  <ProjectCard project={project} />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center gap-4 mt-8">
            <CarouselPrevious className="glow hover-glow" />
            <CarouselNext className="glow hover-glow" />
          </div>
        </Carousel>
      </motion.div>
    </section>
  )
}

