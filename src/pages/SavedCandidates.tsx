import { useEffect, useState } from "react";
import Candidate from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  
  // State to hold the list of saved candidates
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  
  // State for errors
  const [error, setError] = useState<string | null>(null);
  
  // State to hold the sort criteria
  const [sortCriteria, setSortCriteria] = useState<string>('');
  
  // State to hold the filter text
  const [filterText, setFilterText] = useState<string>('');

useEffect(() => {
  // Retrieve saved candidates from localStorage when component mounts
  console.log('Stored candidates:', candidates);
  const storedCandidates = localStorage.getItem('candidates');
  if (typeof storedCandidates === 'string') {
    setCandidates(JSON.parse(storedCandidates));
  } else {
    setError('No potential candidates');
    console.log('No candidates found in localStorage', error);
  }
}, []);

  return (
    <>
      <h1>Potential Candidates</h1>
      <div>
        {/* Sorting dropdown menu */}
        <label>Sort by:</label>
        <select value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)}>
          <option value="">Select</option>
          <option value="name">Name</option>
          <option value="location">Location</option>
          <option value="company">Company</option>
        </select>

        {/* Filter input field */}
        <label>Filter by name or location:</label>
        <input 
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Enter name or location"
        />
      </div>

      {/* Error message or list of candidates */}
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {candidates
            .filter(candidate =>
            (candidate.name ?? '').toLowerCase().includes(filterText.toLowerCase()) ||
            (candidate.location ?? '').toLowerCase().includes(filterText.toLowerCase())
            )
            .sort((a, b) => {
              if (sortCriteria === 'name')
                return (a.name ?? '').localeCompare(b.name as string);
              if (sortCriteria === 'location')
                return (a.location ?? '').localeCompare(b.location as string);
              if (sortCriteria === 'company')
                return (a.company ?? '').localeCompare(b.company as string);
              return 0;
            })
          .map((candidate) => (
            <li>
              <img src={candidate.avatar_url as string} alt={candidate.name as string} />
              <h2>{`${candidate.name} (${candidate.login})`}</h2>
              <p>{candidate.location}</p>
              <p>{candidate.email}</p>
              <p>{candidate.company}</p>
              <p><a href={candidate.html_url as string} target="_blank" rel="noopener noreferrer">{candidate.html_url}</a></p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SavedCandidates;
