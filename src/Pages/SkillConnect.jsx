import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { MapPinIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const JobRecommendationForm = () => {
  const [input, setInput] = useState("");
  const [recommendedJobs, setRecommendedJobs] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const skillsArray = input.split(",").map((skill) => skill.trim());

    try {
      const response = await axios.post(
        "http://139.84.174.127:5000/recommend_jobs",
        { skills: skillsArray }
      );
  
      setRecommendedJobs(response.data);
    } catch (error) {
      console.error("Error fetching recommended jobs:", error);
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <div className="mt-5">
      <h1 className="mb-5 text-center text-3xl">Welcome to SkillConnect 🤓</h1>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
        <Input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter Top Skills (comma-separated)"
          className="h-full flex-1 px-4 text-md"
        />
        <Button type="submit" className="h-full sm:w-28" variant="destructive">
          Search
        </Button>
      </form>

      <div>
        {recommendedJobs.length === 0 ? (
          <div className="mt-12 text-center text-3xl">
            <p>Recommendation by skills</p>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              marginTop: "3rem",
            }}
          >
            {recommendedJobs.map((job, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex justify-between font bold">
                    {job.job_title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 flex-1">
                  <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                      <MapPinIcon size={15} /> {job.location}
                    </div>
                  </div>
                  <hr />
                  <p>Experience: {job.experience_required} Yr</p>
                  {job.job_description}
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Link to={`/job/${job.job_id}`} className="flex-1">
                    <Button variant="secondary" className="w-full">
                      More Details
                    </Button>
                  </Link>
                  <p>
                    <strong>Matching Score:</strong>{" "}
                    {(job.similarity_score * 100).toFixed(2)}%
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobRecommendationForm;
