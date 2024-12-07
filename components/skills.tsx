import { BarChart2, Database, LineChart, PieChart, TrendingUp, Zap } from 'lucide-react'

const skills = [
  {
    name: 'Data Science',
    icon: Zap,
    description: 'Python, Machine learning, & Pemodelan'
  },
  {
    name: 'Analisis Data',
    icon: TrendingUp,
    description: 'Analisis data, Tableu, Google Looker Studio & Membuat insight Data'
  },
  {
    name: 'Data Engineer',
    icon: Database,
    description: 'SQL, Menangani dan Menganalisis data'
  }
]

export function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Keahlian</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill) => (
            <div key={skill.name} className="flex flex-col items-center p-6 bg-background rounded-lg shadow-sm">
              <skill.icon className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
              <p className="text-sm text-muted-foreground text-center">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

