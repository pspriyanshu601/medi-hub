import React, { useState, useEffect } from "react";
import axios from "axios";
import DoctorsCard from "../components/DoctorsCard";
import SearchDoctor from "../components/SearchDoctor"; 

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
        <SearchDoctor
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          selectedCity={selectedCity}
          handleCityChange={handleCityChange}
          cities={cities}
        />

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
