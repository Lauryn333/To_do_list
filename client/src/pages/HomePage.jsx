import { useLoaderData } from "react-router-dom";
import logoDailyPlanner from "../assets/images/logoDailyPlanner.png";

function HomePage() {
  console.info(useLoaderData());
  const dataLists = useLoaderData();

  return (
    <>
      <header>
        <img src={logoDailyPlanner} alt="Logo Daily Planner" />
        <h1>Daily Planner</h1>
      </header>
      <section className="lists">
        {dataLists.map((list) => (
          <div className="list_individuelle" key={list.name}>
            <h2>{list.name}</h2>
          </div>
        ))}
      </section>
    </>
  );
}

export default HomePage;
