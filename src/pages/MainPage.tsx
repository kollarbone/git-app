import { useEffect, useState } from "react";
import { useLazyGetUserReposQuery, useSearchReposQuery } from "../store/github.api";
import { useDebounce } from "../hooks/debounce";

function MainPage() {
    const [search, setSearch] = useState("to-do")
    const [dropdown, setdropdown] = useState(false)
    const debounced = useDebounce(search)
    const {isLoading, isError, data} = useSearchReposQuery(debounced, {
        skip:debounced.length < 3,
        refetchOnFocus: true
    })
    const [fetchRepos, {isLoading: areReposLoading, data: repos}] = useLazyGetUserReposQuery()

    useEffect(()=> {
        setdropdown(debounced.length > 3)
    }, [debounced, data])

    const clickHandler = (username: string) => {
        fetchRepos(username)
    }
console.log(data)
    return (
      <div className="">
        {isError && <p>Something went wrong...</p>}
        <div>
            <input type="text" className="search_repos" 
            placeholder="Search for Github repos.."
            value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        {dropdown && 
            <div>
                {isLoading && <p>Loading...</p>}
                {data?.items.map(user => (
                    <p key={user.id} onClick={() => clickHandler(user.full_name)}>{user.name}</p>
                ))}
            </div>}
            {areReposLoading && <p>Repos are loading...</p>}
            {repos?.map(repo => 
                <p>
                    {repo.url}
                </p>)}
      </div>
    );
  }
  
  export default MainPage;
  