import React, { useState, useEffect } from "react";
import axios from "axios";
import DoctorsCard from "../components/DoctorsCard";

function AllDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("/user/doctors/getall");
        const doctorsData = response.data.data;
        setDoctors(doctorsData);

        // Extract unique cities from doctors data
        const uniqueCities = [
          ...new Set(doctorsData.map((doctor) => doctor.city)),
        ];
        setCities(uniqueCities);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
    const department = doctor.department.name.toLowerCase();
    const city = doctor.city.toLowerCase();

    const matchesSearchQuery =
      fullName.includes(searchQuery) || department.includes(searchQuery);
    const matchesCity =
      selectedCity === "" || city === selectedCity.toLowerCase();

    return matchesSearchQuery && matchesCity;
  });

  return (
    <div className="w-full my-20">
      <section className="max-w-7xl mx-auto p-4">
        {/* Search and Filter components */}
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

        {/* Doctors components */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-4">
          {filteredDoctors.map((doctor) => (
            <DoctorsCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default AllDoctors;
