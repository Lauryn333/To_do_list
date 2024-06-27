import { Link, useLoaderData } from "react-router-dom";
import logoDailyPlanner from "../assets/images/logoDailyPlanner.png";
import "../styles/home_pages.css";

function HomePage() {
  console.info(useLoaderData());
  const dataLists = useLoaderData();

  return (
    <section className="home-page">
      <header className="header-hp">
        <img src={logoDailyPlanner} alt="Logo Daily Planner" />
        <h1>Daily Planner</h1>
      </header>
      <section className="lists">
        {dataLists.map((list) => (
          <Link key={list.id} to={`/ItemsPage/${list.id}`}>
            <div className="list_individuelle" key={list.name}>
              <h2>{list.name}</h2>
            </div>
          </Link>
        ))}
      </section>
    </section>
  );
}

export default HomePage;
