import { NavLink } from "react-router-dom";
import "./components.css"
import {BsGithub} from "react-icons/bs"

function Navigation() {
    return (
      <nav className="navbar">
        <NavLink to="git-app/">
            <p>GitHub Repos Search</p>
        </NavLink>
        <BsGithub style={{color: "#ffffffd0", fontSize: "25px"}}/>
        <NavLink to="git-app/">
            <p>Home Page</p>
        </NavLink>
      </nav>
    );
  }
  
  export default Navigation;
  