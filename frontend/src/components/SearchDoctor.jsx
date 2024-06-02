import React from "react";

const SearchDoctor = ({
  searchQuery,
  handleSearchChange,
  selectedCity,
  handleCityChange,
  cities,
}) => {
  return (
    <div className="bg-main_theme p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-semibold text-light_theme mb-4">
        Find Your Doctor
      </h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name or specialty"
            className="w-full p-4 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-light_theme"
          />
          <svg
            className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <div className="relative w-full">
          <select
            value={selectedCity}
            onChange={handleCityChange}
            className="w-full p-4 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-light_theme"
          >
            <option value="">All Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <svg
            className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 9l4-4 4 4m0 6l-4 4-4-4"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchDoctor;
