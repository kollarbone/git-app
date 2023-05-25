import "./components.css"
import { IRepo } from "../models";
import {BsStar} from "react-icons/bs"

function RepoCard({repo}:{repo:IRepo}) {
  let data = new Date(repo.updated_at).toLocaleString()
    return (
      <div className="repo_card">
        <div className="repo_inf">
          <div className="repo_name">
            <span className="name">{repo.full_name}</span>
            <span className="stars"><BsStar/>{repo.stargazers_count}</span>
          </div>
          <span className="repo_last_commit">Last commit: {data}</span>
          <a className="repo_url" href={repo.html_url}>{repo.html_url}</a>
        </div>
      </div>
    );
  }
  
  export default RepoCard;
  