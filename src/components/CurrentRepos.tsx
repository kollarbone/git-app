import { useEffect } from "react";
import { useLazyGetUserReposQuery } from "../store/github.api";
import RepoCard from "./RepoCard";
import {AiOutlineLoading3Quarters} from "react-icons/ai"

function CurrentRepos() {
    const [fetchRepos, {isLoading: areCurrentReposLoading, data: repos}] = useLazyGetUserReposQuery()
    
    useEffect(() => {
        const username = "kollarbone"
        fetchRepos({username: username})
    }, [ fetchRepos])

    return (
      <div>
        {areCurrentReposLoading && <p className="loading"><AiOutlineLoading3Quarters/></p>}
        { repos?.map(repo => 
            <RepoCard repo ={repo} key={repo.id}/>
        )}
      </div>
    );
  }

export default CurrentRepos;