import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FileCode, Star } from 'lucide-react'

interface ProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    tags: string[]
    language?: string
    stars?: number
  }
}

function getLanguageIcon(language: string | undefined) {
  return <FileCode className="h-6 w-6 text-primary" />
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="hover-glow bg-black/50 backdrop-blur-sm border-primary/20 h-full flex flex-col transition-all duration-300 hover:scale-105">
      <CardHeader className="flex flex-row items-center gap-4">
        {getLanguageIcon(project.language)}
        <div>
          <CardTitle className="text-xl neon-text">{project.title}</CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag) => (
              <span 
                key={tag} 
                className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <CardDescription className="mb-6 flex-1 text-muted-foreground">
          {project.description}
        </CardDescription>
        <div className="flex justify-between items-center mt-4">
          {project.language && (
            <span className="text-sm text-muted-foreground">{project.language}</span>
          )}
          {project.stars !== undefined && (
            <span className="text-sm text-muted-foreground flex items-center">
              <Star className="w-4 h-4 mr-1" /> {project.stars}
            </span>
          )}
        </div>
        <Button variant="outline" size="sm" className="w-full mt-4 border-primary/50 hover:border-primary glow hover-glow" asChild>
          <Link href={`/projects/${project.id}`}>
            Lihat Detail
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

