import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  // State to hold current candidate
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    name: '',
    login: '',
    location: '',
    avatar_url: '',
    email: '',
    html_url: '',
    company: '',
});

// State to hold the list of candidates
const [candidates, setCandidates] = useState<Candidate[]>([]);

// State to handle the search input
const [searchInput, setSearchInput] = useState<string>('');

// State for errors
const [error, setError] = useState<string | null>(null);

// Fetch candidates from GitHub API on component mount
useEffect(() => {
  const fetchCandidates = async () => {
    try {
      const data = await searchGithub();
      // Map data to Candidate interface
      const fetchedCandidates: Candidate[] = data.map((user: Candidate) => ({
        name: user.name || 'No name available',
        login: user.login,
        location: user.location || 'No location available',
        avatar_url: user.avatar_url || 'No avatar available',
        email: user.email || 'No email available',
        html_url: user.html_url || 'No address available',
        company: user.company || 'No company available',
      }));
      setCandidates(fetchedCandidates);
      console.log(candidates);
      if (fetchedCandidates.length > 0) {
        setCurrentCandidate(fetchedCandidates[0]);
      }
      setError(null); // Clear any previous error when successful
  } catch (error) {
    setError('Error fetching candidates');
  }
};

fetchCandidates();
}, []);

// Handle user search input
const handleSearch = async () => {
  try {
    const userData = await searchGithubUser(searchInput);

    // Check if user data is valid (not empty)
    if (Object.keys(userData).length === 0) {
      setError('User not found');
      setCurrentCandidate({
        name: '',
        login: '',
        location: '',
        avatar_url: '',
        email: '',
        html_url: '',
        company: '',
      });
    } else {
      // Map user data to Candidate interface
      const fetchedCandidates: Candidate = {
        name: userData.name || 'No name available',
        login: userData.login,
        location: userData.location || 'No location available',
        avatar_url: userData.avatar_url || 'No avatar available',
        email: userData.email || 'No email available',
        html_url: userData.html_url || 'No address available',
        company: userData.company || 'No company available',
      };
      setCurrentCandidate(fetchedCandidates);
      setError(null);
    }
    setSearchInput(''); // Clear search input after search
  } catch (err) {
    setError('An error occurred while fetching user data');
  }
};

// Save candidate to local storage
const saveCandidate = () => {
  let parsedCandidates: Candidate[] = [];
  const storedCandidates = localStorage.getItem('candidates');
  if (typeof storedCandidates === 'string') {
    parsedCandidates = JSON.parse(storedCandidates);
  }
  parsedCandidates.push(currentCandidate);
  localStorage.setItem('candidates', JSON.stringify(parsedCandidates));
};


return (
  <section>
    <h1> Candidate Search</h1>

    {/* Search Form */}
    <input
      type="text"
      placeholder="Search GitHub User"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {/* Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display Current Candidate */}
      {currentCandidate && (
        <div>
          <h2>{currentCandidate.name} {currentCandidate.login}</h2>
          <img src={currentCandidate.avatar_url as string} alt="Avatar" />
          <p>Location: {currentCandidate.location}</p>
          <p>Email: {currentCandidate.email}</p>
          <p>Company: {currentCandidate.company}</p>
          <p>GitHub URL: <a href={currentCandidate.html_url as string} target="_blank" rel="noopener noreferrer">{currentCandidate.html_url}</a></p>
        </div>
      )}

      {/* Save Button */}
      <button onClick={saveCandidate}>Save Candidate</button>
  </section>
);
}

export default CandidateSearch;
