import React, { useState } from "react";
import { Modal, Button } from "antd";
import { TbTopologyStar3 } from "react-icons/tb";

function EditCategories({ getCategories, editId, data }) {
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [open, setOpen] = useState(false);
  const dataxon = data?.find((item) => item?.id === editId);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  // Edit categoriya
  const editCategoriesToken = localStorage.getItem("token");

  const CategoriyaEdit = async (e) => {
    e.preventDefault();
    const formdatacategoriyaedit = new FormData();
    formdatacategoriyaedit.append("name", editName || dataxon?.name);
    formdatacategoriyaedit.append(
      "description",
      editDescription || dataxon?.description
    );

    try {
      const response = await fetch(
        `https://api.dezinfeksiyatashkent.uz/api/categories/${editId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${editCategoriesToken}`,
          },
          body: formdatacategoriyaedit,
        }
      );
      console.log(response);

      if (response.ok) {
        const result = await response.json();
        console.log("Ma'lumot muvaffaqiyatli yuborildi:", result);

        setEditName("");
        setEditDescription("");
        hideModal();
        getCategories(); // Kategoriyalarni yangilash uchun
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
        Edit
      </button>
      <Modal title="Edit" open={open} onCancel={hideModal} footer={null}>
        <form onSubmit={CategoriyaEdit}>
          <div className="my-6">
            <label htmlFor="name" className="flex items-center gap-[6px] my-2">
              <TbTopologyStar3 className="text-yellow-700" />
              <span className="font-medium">Name</span>
            </label>
            <input
              onChange={(e) => setEditName(e.target.value)}
              defaultValue={dataxon?.name}
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
              onChange={(e) => setEditDescription(e.target.value)}
              defaultValue={dataxon?.description}
              id="description"
              className="w-full border-[1px] outline-none hover:border-blue-600 border-gray-500 px-4 py-[6px] rounded-[8px]"
              type="text"
              placeholder="Description..."
            />
          </div>

          <Button type="primary" htmlType="submit">
            Categories Edit
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default EditCategories;
