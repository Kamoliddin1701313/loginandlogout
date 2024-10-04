import React, { useState } from "react";
import { Modal, Button } from "antd";
import { TbTopologyStar3 } from "react-icons/tb";

function AddCategories({ getCategories }) {
  const [postName, setPostName] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  // POST categoriya
  const postCategoriesToken = localStorage.getItem("token");

  const CategoriyaPosts = async () => {
    const formdatacategoriya = new FormData();
    formdatacategoriya.append("name", postName);
    formdatacategoriya.append("description", postDescription);
    try {
      const response = await fetch(
        "https://api.dezinfeksiyatashkent.uz/api/categories",
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${postCategoriesToken}`,
          },
          body: formdatacategoriya,
        }
      );
      console.log(response);

      if (response.ok) {
        const result = await response.json();
        console.log("Ma'lumot muvaffaqiyatli yuborildi:", result);

        // Input maydonlarini tozalash
        setPostName("");
        setPostDescription("");

        hideModal();
        getCategories();
      } else {
        console.log("Tarmoq javobi noto'g'ri");
      }
    } catch (error) {
      console.error("Xato:", error);
      alert("catch ishladi xatolik bor !");
    }
  };

  return (
    <div>
      <button type="primary" onClick={showModal}>
        Categories Add
      </button>
      <Modal title="Add" open={open} onCancel={hideModal} footer={null}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            CategoriyaPosts();
          }}
        >
          <div className="my-6">
            <label htmlFor="name" className="flex items-center gap-[6px] my-2">
              <TbTopologyStar3 className="text-yellow-700" />
              <span className="font-medium">Name</span>
            </label>
            <input
              onChange={(e) => setPostName(e.target.value)}
              value={postName} // inputni bo'shatish uchun value o'rnatildi
              required
              id="name"
              className="w-full border-[1px] outline-none hover: active:border-blue-600 border-gray-500 px-4 py-[6px] rounded-[8px]"
              type="text"
              placeholder="Name... "
            />
          </div>

          <div className="my-6">
            <label
              htmlFor="description"
              className="flex items-center gap-[6px] my-2"
            >
              <TbTopologyStar3 className="text-yellow-700" />
              <span className="font-medium">Description</span>
            </label>
            <input
              onChange={(e) => setPostDescription(e.target.value)}
              value={postDescription}
              required
              id="description"
              className="w-full border-[1px] outline-none hover:border-blue-600 border-gray-500 px-4 py-[6px] rounded-[8px]"
              type="text"
              placeholder="Description..."
            />
          </div>

          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default AddCategories;
