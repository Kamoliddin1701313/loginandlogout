import React, { useState } from "react";
import { Modal, Button } from "antd";
import { TbTopologyStar3 } from "react-icons/tb";

function EditNews({ getNews, editId, data }) {
  const [editImages, setEditImages] = useState("");
  const [editNameUz, setEditNameUz] = useState("");
  const [editTextUz, setEditTextUz] = useState("");
  const [editAuthor, setEditAuthor] = useState("");

  const [open, setOpen] = useState(false);
  const finddatanews = data?.find((item) => item?.id === editId);
  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  // Edit faqs
  const editFaqsToken = localStorage.getItem("token");

  const EditNews = async (e) => {
    e.preventDefault();
    const formdatanews = new FormData();
    formdatanews.append("images", editImages || finddatanews?.images);
    formdatanews.append("title_uz", editNameUz || finddatanews?.title_uz);
    formdatanews.append("text_uz", editTextUz || finddatanews?.text_uz);
    formdatanews.append("author", editAuthor || finddatanews?.author);

    try {
      const response = await fetch(
        `https://api.dezinfeksiyatashkent.uz/api/news/${editId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${editFaqsToken}`,
          },
          body: formdataeditedit,
        }
      );
      console.log(response);

      if (response.ok) {
        const result = await response.json();
        console.log("Ma'lumot muvaffaqiyatli yuborildi:", result);

        setEditImages("");
        setEditNameUz("");
        setEditTextUz("");
        setEditAuthor("");

        hideModal();
        getNews(); // Kategoriyalarni yangilash uchun
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
        <form onSubmit={EditNews}>
          <div className="my-6">
            <label htmlFor="name" className="flex items-center gap-[6px] my-2">
              <TbTopologyStar3 className="text-yellow-700" />
              <span className="font-medium">Images</span>
            </label>
            <input
              onChange={(e) => setEditImages(e.target.value)}
              defaultValue={finddatanews?.title_ru}
              id="name"
              className="w-full border-[1px] outline-none hover: active:border-blue-600 border-gray-500 px-4 py-[6px] rounded-[8px]"
              type="text"
              placeholder="Name... "
            />
          </div>

          <div className="my-6">
            <label htmlFor="name" className="flex items-center gap-[6px] my-2">
              <TbTopologyStar3 className="text-yellow-700" />
              <span className="font-medium">Name Uz</span>
            </label>
            <input
              onChange={(e) => setEditNameUz(e.target.value)}
              defaultValue={finddatanews?.title_ru}
              id="name"
              className="w-full border-[1px] outline-none hover: active:border-blue-600 border-gray-500 px-4 py-[6px] rounded-[8px]"
              type="text"
              placeholder="Name uz... "
            />
          </div>

          <div className="my-6">
            <label htmlFor="name" className="flex items-center gap-[6px] my-2">
              <TbTopologyStar3 className="text-yellow-700" />
              <span className="font-medium">Text Uz</span>
            </label>
            <input
              onChange={(e) => setEditTextUz(e.target.value)}
              defaultValue={finddatanews?.title_ru}
              id="name"
              className="w-full border-[1px] outline-none hover: active:border-blue-600 border-gray-500 px-4 py-[6px] rounded-[8px]"
              type="text"
              placeholder="Text uz... "
            />
          </div>

          <div className="my-6">
            <label htmlFor="name" className="flex items-center gap-[6px] my-2">
              <TbTopologyStar3 className="text-yellow-700" />
              <span className="font-medium">Author</span>
            </label>
            <input
              onChange={(e) => setEditAuthor(e.target.value)}
              defaultValue={finddatanews?.title_ru}
              id="name"
              className="w-full border-[1px] outline-none hover: active:border-blue-600 border-gray-500 px-4 py-[6px] rounded-[8px]"
              type="text"
              placeholder="Author... "
            />
          </div>

          <Button type="primary" htmlType="submit">
            News Edit
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default EditNews;
