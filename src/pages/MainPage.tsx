import { useEffect, useState } from "react";
import { useSearchReposQuery } from "../store/github.api";
import { useDebounce } from "../hooks/debounce";
import RepoCard from "../components/RepoCard";
import "./pages.css"
import CurrentRepos from "../components/CurrentRepos";
import {AiOutlineLoading3Quarters} from "react-icons/ai"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

function MainPage() {
    const [search, setSearch] = useState("")
    const [dropdown, setdropdown] = useState(false)
    const debounced = useDebounce(search)
    const [page, setPage] = useState(1);
    const pageNumber = [];
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const {isLoading, isError, data} = useSearchReposQuery({search: debounced, page: page}, { 
        skip: debounced.length < 3, 
        refetchOnFocus: true 
    })
    
    for (let i = 1; i <= Math.ceil(data?.total_count! / 10); i++) {
        pageNumber.push(i);
    }

    useEffect(() => {
        setdropdown(debounced.length > 3)
    }, [debounced, page])

    const paginate = (number: number) => {
        setPage(number)
        setMaxPageNumberLimit(number+10)
        setMinPageNumberLimit(number-1)
    };

    const renderPageNumbers = pageNumber.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <button className={page === number? "active": "un_active"}
                key={number} disabled={page === number} 
                onClick={() => paginate(number)}
                >
                    {number}
            </button>
          );
        } else {
          return null;
        }
      });
  
    return (
      <div className="main_page">
        {isError && <p className="error">Something went wrong...</p>}
        <div className="search">
            <input type="text" className="search_repos" 
                placeholder="Search for Github repos.."
                value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        {!dropdown ?
            <CurrentRepos/>
            :<div className="repos_block">
                {isLoading && 
                    <div className="loading_block">
                        <AiOutlineLoading3Quarters className="loading"/>
                    </div>}
                {data?.items.map(repo => (
                    <RepoCard repo ={repo} key={repo.id}/>
                ))}
                <div className="pagination">
                    <button
                        onClick={ () => paginate(page - 1)}
                        className={page === 1 ? "active": "un_active"}
                        disabled={page === 1}
                    >
                        <BsChevronLeft
                        />
                    </button>
                        {renderPageNumbers}
                    <button
                        onClick={ () => paginate(page + 1)}
                        className={page === data?.total_count ? "active": "un_active"}
                        disabled={page === data?.total_count}
                    >
                        <BsChevronRight/>
                    </button>
                </div> 
            </div>} 
      </div>
    );
  }
  
  export default MainPage;
  