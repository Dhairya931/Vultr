import React, { useState } from 'react';
import axios from 'axios';
import { Card } from '@/components/ui/card';

const JobRecommendationForm = () => {
  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState('');
  const [recommendedJobs, setRecommendedJobs] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Split input by commas and trim whitespace
    const skillsArray = input.split(',').map((skill) => skill.trim());

    try {
      const response = await axios.post('http://139.84.174.127:5000/recommend_jobs', { skills: skillsArray });
      setRecommendedJobs(response.data); // Set recommended jobs to display as cards
    } catch (error) {
      console.error('Error fetching recommended jobs:', error);
    }
  };

  return (
    <div>
      <h2>Job Recommendation Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Skills (comma-separated):
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="e.g., Python, React, Node.js"
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      <div>
        <h3>Recommended Jobs:</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {recommendedJobs.map((job, index) => (
            // <div
            //   key={index}
            //   style={{
            //     border: '1px solid #ddd',
            //     padding: '1rem',
            //     borderRadius: '5px',
            //     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            //     width: '200px',
            //   }}
            // >
            //   <h4>{job.job_title}</h4>
            //   <p>{job.job_description}</p>
            //   <p><strong>Location:</strong> {job.location}</p>
            //   <p><strong>Company:</strong> {job.company}</p>
            //   <p><strong>Matching Score:</strong> {(job.similarity_score * 100).toFixed(2)}%</p>

            // </div>
            <Card className-
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobRecommendationForm;
