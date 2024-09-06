import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  // return <h1>CandidateSearch</h1>;
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

// Fetch candidates from GitHub API on component mount
useEffect(() => {
  const fetchCandidates = async () => {
    try {
      const data = await searchGithub();
      // Map data to Candidate interface
      const fetchedCandidates: Candidate[] = data.map((user: any) => ({
        name: user.name || 'No name available',
        login: user.login,
        location: user.location || 'No location available',
        avatar_url: user.avatar_url,
        email: user.email || 'No email available',
        html_url: user.html_url,
        company: user.company || 'No company available',
      }));
      setCandidates(fetchedCandidates);
      if (fetchedCandidates.length > 0) {
        setCurrentCandidate(fetchedCandidates[0]);
      }
  } catch (error) {
    console.error('Error fetching candidates:', error);
  }
};

fetchCandidates();
}, []);

// save candidate to local storage
const saveCandidate = () => {
  let parsedCandidates: Candidate[] = [];
  const storedCandidates = localStorage.getItem('candidates');
  if (typeof storedCandidates === 'string') {
    parsedCandidates = JSON.parse(storedCandidates);
  }
  parsedCandidates.push(currentCandidate);
  localStorage.setItem('candidates', JSON.stringify(parsedCandidates));
};

}

export default CandidateSearch;
