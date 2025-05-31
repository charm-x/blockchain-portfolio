import Link from "next/link";
import Button from "@/components/ui/Button";
import ProjectImage from "@/components/ui/ProjectImage";
import BlockConfirmation from "@/components/ui/BlockConfirmation";
import ContractSigningSection from "@/components/home/ContractSigningSection";
import Image from "next/image";
import { personalInfo, projectsData, skillsData } from '@/data';

export default function Home() {
  return (
    <div className="px-4 md:px-8">
      {/* Hero Section */}
      <section className="py-20 md:py-32 flex flex-col items-center text-center">
        <div className="max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="relative w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden border-4 border-[#00ff9d] glow-effect">
            <Image
              src={personalInfo.profileImage}
              alt={`${personalInfo.name} Profile`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#121212]/30 pointer-events-none" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">{personalInfo.title}</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium mb-8 text-gray-300">
            {personalInfo.subtitle}
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            {personalInfo.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/projects" variant="primary" size="lg" className="glow-effect">
              View My Work
            </Button>
            <Button href="/blocks" variant="outline" size="lg">
              Explore Blocks
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 border-t border-[#2d2d2d]">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Projects</h2>
            <Link href="/projects" className="text-[#00ff9d] hover:underline">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Projects - First 3 from data */}
            {projectsData.slice(0, 3).map((project, index) => (
              <div key={index} className="border border-[#2d2d2d] rounded-lg overflow-hidden bg-[#121212] hover:border-[#00ff9d] transition-all duration-300">
                <div className="relative h-48 w-full bg-[#1a1a1a] flex items-center justify-center">
                  <ProjectImage
                    src={project.imageSrc || "/projects/default.jpg"}
                    alt={project.title}
                    fallbackSrc={project.techStack[0]?.icon || "/icons/tech/solidity.svg"}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.techStack.slice(0, 3).map((tech, techIndex) => (
                      <div key={techIndex} className="bg-[#1a1a1a] px-2 py-1 rounded-md text-xs flex items-center">
                        <Image src={tech.icon} alt={tech.name} width={16} height={16} className="mr-1" />
                        {tech.name}
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    {project.description.length > 100 ? `${project.description.substring(0, 100)}...` : project.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-3">
                      {project.githubLink && (
                        <a href={project.githubLink} className="text-gray-400 hover:text-[#00ff9d] transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          </svg>
                        </a>
                      )}
                      {project.demoLink && (
                        <a href={project.demoLink} className="text-gray-400 hover:text-[#00ff9d] transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}


          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 border-t border-[#2d2d2d]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">Skills & Technologies</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Dynamic Skill Categories from data */}
            {skillsData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="border border-[#2d2d2d] rounded-lg p-6 bg-[#121212]">
                <h3 className="text-xl font-bold mb-4 text-[#00ff9d]">{category.name}</h3>
                <ul className="space-y-4 text-gray-300">
                  {category.skills.map((skill, skillIndex) => (
                    <li key={skillIndex}>
                      <div className="flex items-center mb-2">
                        <Image src={skill.icon} alt={skill.name} width={20} height={20} className="mr-2" />
                        <span>{skill.name}</span>
                      </div>
                      <BlockConfirmation level={skill.level} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}


          </div>
        </div>
      </section>

      {/* Contract Signing Section */}
      <ContractSigningSection />
    </div>
  );
}
