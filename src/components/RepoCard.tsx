import "./components.css"
import { IRepo } from "../models";

function RepoCard({repo}:{repo:IRepo}) {
    return (
      <div className="repo_card">
        <p>{repo.full_name}</p>
        <p>{repo.stargazers_count}</p>
        <p>{repo.updated_at}</p>
        <p>{repo.html_url}</p>
      </div>
    );
  }
  
  export default RepoCard;
  