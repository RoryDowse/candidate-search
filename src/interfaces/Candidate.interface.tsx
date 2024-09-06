// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    name: string | null;
    login: string | null; // GitHub username
    location: string | null;
    avatar_url: string | null;
    email: string | null;
    html_url: string | null;
    company: string | null;
}

export default Candidate