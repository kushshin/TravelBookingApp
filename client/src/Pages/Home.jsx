import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [experiences, setExperiences] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios
      .get("https://travelbookingapp.onrender.com/api/experiences")
      .then((res) => {
        setExperiences(res.data);
        setFiltered(res.data); 
      })
      .catch((err) => console.error("Error fetching experiences:", err));
  }, []);

  const filterExp = () => {
    const result = experiences.filter((exp) =>
      exp.title.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  };

 
  useEffect(() => {
    if (search.trim() === "") setFiltered(experiences);
    else filterExp();
  }, [search]);

  return (
    <div className="min-h-screen bg-white">
      <nav className="flex items-center justify-between px-6 py-4 shadow-sm border-b border-gray-200">
        <div className="flex items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3448/3448599.png"
            alt="logo"
            className="w-8 h-8"
          />
          <span className="font-bold text-lg text-gray-800">
            highway delite
          </span>
        </div>

        <div className="flex items-center gap-2 border border-green-600 rounded-lg overflow-hidden w-72">
          <input
            type="text"
            placeholder="Search experiences"
            className="flex-1 px-3 py-2 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-xl font-semibold mb-6 text-gray-700">
          Top Experiences
        </h2>

        {filtered.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            No experiences found matching "{search}"
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((exp) => (
              <div
                key={exp._id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden"
              >
               
                <div className="relative">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-48 object-cover"
                  />
                </div>

              
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Curated small-group experience. Certified guide. Safety
                    first with gear included.
                  </p>

                  <div className="flex items-center justify-between">
                    <p className="text-gray-800 text-sm">
                      From{" "}
                      <span className="font-semibold text-black">
                        ₹{exp.price}
                      </span>
                    </p>

                    <Link
                      to={`/details/${exp._id}`}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-medium px-4 py-1.5 rounded transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
