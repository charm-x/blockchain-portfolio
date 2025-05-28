"use client";

type FilterCategory = "All" | "DeFi" | "NFT" | "DAO" | "Infrastructure";

type ProjectFilterProps = {
  onFilterChange: (category: FilterCategory) => void;
  activeFilter: FilterCategory;
};

export default function ProjectFilter({
  onFilterChange,
  activeFilter,
}: ProjectFilterProps) {
  const filters: FilterCategory[] = [
    "All",
    "DeFi",
    "NFT",
    "DAO",
    "Infrastructure",
  ];

  console.log("Filter==>", activeFilter);

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-md cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out ${
            activeFilter === filter
              ? "bg-[#1a1a1a]  border-[#00ff9d] border-2 text-white"
              : "bg-[#121212] text-gray-400 hover:bg-[#2a2a2a]"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
