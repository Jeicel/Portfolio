import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ProjectEntryProps {
  entryNumber: string;
  title: string;
  description: string;
  imageSrc?: string;
  projectLink?: string;
}

const ProjectEntry: React.FC<ProjectEntryProps> = ({
  entryNumber,
  title,
  description,
  imageSrc,
  projectLink,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start w-full border-b border-white/[.15] py-6 md:py-10 last:border-b-0">
      {/* Project Number */}
      <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mr-0 md:mr-8 mb-4 md:mb-0 flex-shrink-0 w-full md:w-auto text-center md:text-left">
        {entryNumber}
      </div>

      {/* Project Content */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Project Image */}
        <div className="w-full md:w-1/3 aspect-video flex items-center justify-center rounded-lg overflow-hidden mb-6 md:mb-0 md:mr-8 flex-shrink-0 bg-gray-900/40">
          {imageSrc ? (
            projectLink ? (
              <Link
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full h-full items-center justify-center"
              >
                <Image
                  src={imageSrc}
                  alt={title}
                  className="object-contain w-full h-full rounded-md"
                  width={400}
                  height={300}
                />
              </Link>
            ) : (
              <Image
                src={imageSrc}
                alt={title}
                className="object-contain w-full h-full rounded-md"
                width={400}
                height={300}
              />
            )
          ) : (
            <span className="text-gray-500 text-sm sm:text-base">
              Project Image
            </span>
          )}
        </div>

        {/* Project Info */}
        <div className="flex flex-col justify-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectEntry;
