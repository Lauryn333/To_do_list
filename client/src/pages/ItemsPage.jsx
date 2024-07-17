import { useLoaderData, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/items_pages.css";

function ItemsPage() {
  const items = useLoaderData();

  const { listId } = useParams();

  const [prep, setPrep] = useState([]);

  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    const itemsData = items.filter(
      (item) => item.list_id === parseInt(listId, 10)
    );
    if (itemsData) {
      setPrep(itemsData);
    }
  }, [listId, items]);

  const handleInputChange = (event) => {
    setNewItem(event.target.value);
  };

  const handleAddItem = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3310/api/items/${listId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            todo: newItem,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.info("Item added successfully:", data);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  return (
    <>
      {prep?.map((item) => (
        <p key={item?.id}>{item?.todo}</p>
      ))}

      <input
        className="add_item"
        type="text"
        name="item"
        placeholder="Ajoute une tâche"
        onChange={handleInputChange}
      />
      <button type="button" onClick={handleAddItem}>
        Créer
      </button>
    </>
  );
}

export default ItemsPage;
