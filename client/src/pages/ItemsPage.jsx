import { useLoaderData, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/items_pages.css";

function ItemsPage() {
  const items = useLoaderData();
  const { id } = useParams();
  const [prep, setPrep] = useState("");

  useEffect(() => {
    const itemsData = items.filter((item) => item.id === parseInt(id, 10));
    if (itemsData) {
      setPrep(itemsData);
    }
  }, [id, items]);

  return <p>{prep[0].todo}</p>;
}

export default ItemsPage;
