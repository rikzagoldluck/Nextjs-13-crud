"use client";

import { useState } from "react";
import toast from "react-hot-toast";
type Category = {
  id: number;
  name: string;
};

export default function DeleteCategory({
  category,
  onDeleted,
}: {
  category: Category;
  onDeleted: Function;
}) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  async function handleDelete(categoryId: number) {
    setIsMutating(true);

    const res = await fetch(`http://localhost:3001/categories/${categoryId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      setIsMutating(false);
      const resBody = await res.json();
      toast.error("Something went wrong" + resBody.message, { duration: 1000 });
      return;
    }
    toast.success("Category deleted", { duration: 1000 });

    setIsMutating(false);

    onDeleted();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <>
      <button className="btn btn-error btn-sm" onClick={handleChange}>
        Delete
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are sure to delete {category.name} ?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Close
            </button>
            {!isMutating ? (
              <button
                type="button"
                onClick={() => handleDelete(category.id)}
                className="btn btn-primary"
              >
                Delete
              </button>
            ) : (
              <button type="button" className="btn loading">
                Deleting...
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
