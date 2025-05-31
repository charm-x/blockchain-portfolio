import ProjectsContainer from "@/components/projects/ProjectsContainer";
import { projectsData } from '@/data';

export default function ProjectsPage() {


  return (
    <div className="px-4 md:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">
            <span className="gradient-text">Blockchain Projects</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A showcase of my decentralized applications, smart contracts, and blockchain solutions.
            Each project demonstrates different aspects of blockchain development.
          </p>
        </div>

        {/* Projects Container with filtering functionality */}
        <ProjectsContainer projects={projectsData} />
      </div>
    </div>
  );
}
