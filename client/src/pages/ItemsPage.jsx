import { useLoaderData, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/items_pages.css";

function ItemsPage() {
  const items = useLoaderData();

  const { listId } = useParams();

  const [prep, setPrep] = useState("");

  useEffect(() => {
    const itemsData = items.filter(
      (item) => item.list_id === parseInt(listId, 10)
    );
    if (itemsData) {
      setPrep(itemsData);
    }
  }, [listId, items]);

  return <p>{prep[0]?.todo}</p>;
}

export default ItemsPage;
