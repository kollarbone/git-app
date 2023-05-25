import { useEffect, useState } from "react";
import { useLazyGetUserReposQuery } from "../store/github.api";
import RepoCard from "./RepoCard";

function CurrentRepos() {
    const [fetchRepos, {isLoading: areCurrentReposLoading, data: repos}] = useLazyGetUserReposQuery()
    const [page, setPage] = useState(1);
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(repos?.length! / 10); i++) {
        pageNumber.push(i);
    }
    useEffect(() => {
        const username = "vladilenm"
        fetchRepos({username: username, page: page})
    }, [ fetchRepos, page])

    const paginate = (number: number) => setPage(number);
    console.log(repos)
    return (
      <div>
        {areCurrentReposLoading && <p>Current repos are loading...</p>}
        { repos?.map(repo => 
            <RepoCard repo ={repo} key={repo.id}/>
        )}
        <div className="pagination">
            {repos?.length! > 10 &&
                pageNumber.map((number) => (
                    <button className={page === number? "active": "un_active"}
                        key={number}
                        onClick={() => paginate(number)}
                        >
                            {number}
                    </button>
            ))}
        </div>
      </div>
    );
  }

export default CurrentRepos;