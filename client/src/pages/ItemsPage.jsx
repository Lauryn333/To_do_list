import { useLoaderData, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/items_pages.css";
import flecheRetour from "../assets/images/fleche-retour.png";
import addList from "../assets/images/add-list.png";
import bin from "../assets/images/bin.png";

// Pb a régler : lors du add d'un nouvel item on doit raffraichir la page pour voir l'effet produit --> faire en sorte qu'il n'y ai plus à raffraichir la page pour voir l'ajout d'un élémént

function ItemsPage() {
  const items = useLoaderData();

  const { listId } = useParams();

  const [prep, setPrep] = useState([]);

  const [newItem, setNewItem] = useState("");
  const [itemEdited, setItemEdited] = useState("");

  const [ItemChecked, setItemChecked] = useState("");

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

  const handleInputChangeToEdit = (event) => {
    setItemEdited(event.target.value);
  };

  const handleAddItem = async () => {
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
      setPrep((prepAddNewItem) => [...prepAddNewItem, newItemAdd.item]);
      console.info("Item added successfully:", newItemAdd);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    // Reçoit l'id de l'item qu'on souhaite delete et on le transmet à l'URL
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
      // Pour delete automatiquement et que ça se voit directement sans avoir à raffraichir la page
      setPrep((nouveauxItems) =>
        nouveauxItems.filter((item) => item.id !== id)
      );
      console.info("Item successfully deleted");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEditItem = async (id) => {
    // Reçoit l'id de l'item qu'on souhaite edit et on le transmet à l'URL
    try {
      const response = await fetch(`http://localhost:3310/api/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo: itemEdited,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const newItemEdited = await response.json();
      console.info("Item eddited successfully:", newItemEdited);
    } catch (error) {
      console.error("Error edditing item:", error);
    }
  };

  // Pour permettre le edit, il faut cocher la case pour savoir quel champ on veut modifier et ainsi pouvoir changer un seul champs à la fois
  const handleChangeCheckBox = (e, index, itemId) => {
    const activeItem = document.getElementById(index).checked;
    if (activeItem === true) {
      setItemChecked(itemId);
    }
  };

  return (
    <>
      <Link to="/">
        <img
          className="fleche-retour"
          src={flecheRetour}
          alt="Bouton de retour à la page d'accueil"
        />
      </Link>
      <section className="first-section">
        <h1>Titre de la liste</h1>
        <div className="add-bar">
          <input
            className="add-item"
            type="text"
            name="item"
            placeholder="Ajoute une tâche"
            value={newItem}
            onChange={handleInputChange}
          />
          {/* eslint-disable jsx-a11y/click-events-have-key-events,
          jsx-a11y/no-noninteractive-element-interactions */}
          <img src={addList} alt="Ajouter une tâche" onClick={handleAddItem} />
        </div>
      </section>

      {prep.map((item, index) => (
        <div key={item.id} className="div-item">
          <p>{item.id}</p>

          <input
            id={index}
            type="checkbox"
            value={item.todo}
            onChange={(e) => handleChangeCheckBox(e, index, item.id)}
          />
          {ItemChecked === item.id ? (
            <>
              <input
                className="edit_item"
                type="text"
                name="item"
                placeholder={item.todo}
                value={itemEdited}
                onChange={handleInputChangeToEdit}
              />
              <button
                type="button"
                onClick={() => {
                  // Transmet l'id de l'item qu'on souhaite modifier à la fonction handleEditItem
                  handleEditItem(item.id);
                }}
              >
                Modifier
              </button>
            </>
          ) : (
            <p>{item.todo}</p>
          )}

          <img
            src={bin}
            alt="Bouton pour supprimer une tâche"
            onClick={() => {
              // Transmet l'id de l'item qu'on souhaite delete à la fonction handleDeleteItem
              handleDeleteItem(item.id);
            }}
          />
        </div>
      ))}
    </>
  );
}

export default ItemsPage;
