import { useEffect, useState } from "react";
import Candidate from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [error, setError] = useState<string | null>(null);

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
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {candidates.map((candidate) => (
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
