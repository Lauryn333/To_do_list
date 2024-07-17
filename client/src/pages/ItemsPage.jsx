import { useLoaderData, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/items_pages.css";

function ItemsPage() {
  const items = useLoaderData();

  const { listId } = useParams();

  const [prep, setPrep] = useState("");

  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    const itemsData = items.filter(
      (item) => item.list_id === parseInt(listId, 10)
    );
    if (itemsData) {
      setPrep(itemsData);
    }
  }, [listId, items]);

  const handleInputChange = (e) => {
    setNewItem(e.target.value);
  };
  // const handleAddItem = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const sendNewItem = await axios.post(
  //       `${import.meta.env.VITE_API_URL}/api/items/${listId}`
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }

  return (
    <>
      <p>{prep[0]?.todo}</p>
      <p>{newItem}</p>
      <input
        className="add_item"
        type="text"
        placeholder="Ajoute une tâche"
        onChange={handleInputChange}
      />
      {/* <button onClick={handleAddItem}>Créer</button> */}
    </>
  );
}
// }

export default ItemsPage;
