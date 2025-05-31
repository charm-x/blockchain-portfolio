'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectFilter from './ProjectFilter';
import { Project, ProjectFilter as ProjectFilterType } from '@/types';

type ProjectsContainerProps = {
  projects: Project[];
};

export default function ProjectsContainer({ projects }: ProjectsContainerProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterType>('All');

  // Filter projects based on the active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects;
    }

    return projects.filter(project => {
      // Check if project title or category contains the filter keyword
      return (
        project.category === activeFilter ||
        project.title.includes(activeFilter)
      );
    });
  }, [projects, activeFilter]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      <ProjectFilter
        onFilterChange={setActiveFilter}
        activeFilter={activeFilter}
      />

      {/* Projects Grid with Animation */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title + index}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              className="flex"
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                imageSrc={project.imageSrc}
                techStack={project.techStack}
                githubLink={project.githubLink}
                demoLink={project.demoLink}
                contractAddress={project.contractAddress}
                tokenId={project.tokenId}
                chain={project.chain}
                rarity={project.rarity}
                category={project.category}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
