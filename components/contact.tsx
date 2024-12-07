import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Github, Mail, Linkedin } from 'lucide-react'
import Link from 'next/link'

export function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Hubungi Saya</h2>
        <p className="text-center text-muted-foreground mb-8">

        </p>
        <div className="flex justify-center space-x-6 mb-8">
          <Button variant="outline" size="icon" asChild>
            <Link href="https://github.com/raflisbk" target="_blank">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="mailto:raflisbk@gmail.com">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="https://linkedin.com/in/example" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </Button>
        </div>
        <p className="text-center text-muted-foreground">
          Kota Pasuruan, Indonesia
        </p>
      </div>
    </section>
  )
}

