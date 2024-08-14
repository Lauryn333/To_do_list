import { useLoaderData, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/items_pages.css";

function ItemsPage() {
  const items = useLoaderData();

  const { listId } = useParams();

  const [prep, setPrep] = useState([]);

  const [newItem, setNewItem] = useState("");

  const [ItemChecked, setItemChecked] = useState([]);

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

      const newItemAdd = await response.json();
      setPrep((prepAddNewItem) => [...prepAddNewItem, newItemAdd]);
      setNewItem("");
      console.info("Item added successfully:", newItemAdd);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    // Transmet l'id de l'item qu'on souhaite delete à l'URL
    try {
      const response = await fetch(`http://localhost:3310/api/items/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.info("Item successfully deleted");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleChangeCheckBox = (e, index) => {
    // console.log(e.target.value);
    const activeItem = document.getElementById(index).checked;
    // console.log("Item coché: ", activeItem);
    if (activeItem === true) {
      setItemChecked((oldItems) => [...oldItems, e.target.value]);
    } else {
      setItemChecked(ItemChecked.filter((values) => values !== e.target.value));
    }
  };

  return (
    <>
      {prep?.map((item, index) => (
        <div key={item?.id} className="div-item">
          <input
            id={index}
            type="checkbox"
            value={item.todo}
            onChange={(e) => handleChangeCheckBox(e, index)}
          />
          <p>{item?.todo}</p>
          <button
            type="button"
            onClick={() => {
              handleDeleteItem(item.id);
            }}
          >
            Supprimer
          </button>
        </div>
      ))}

      <input
        className="add_item"
        type="text"
        name="item"
        placeholder="Ajoute une tâche"
        value={newItem}
        onChange={handleInputChange}
      />
      <button type="button" onClick={handleAddItem}>
        Créer
      </button>
    </>
  );
}

export default ItemsPage;
