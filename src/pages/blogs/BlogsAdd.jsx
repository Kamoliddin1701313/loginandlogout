import React, { useState } from "react";
import { Modal, Button } from "antd";
import { TbTopologyStar3 } from "react-icons/tb";

function BlogsAdd({ getBlogs }) {
  const [blogsName, setBlogsName] = useState("");
  const [blogsText, setBlogsText] = useState("");
  const [blogsAuthor, setBlogsAuthor] = useState("");
  const [blogsImg, setBlogsImg] = useState(null);

  const blogsToken = localStorage.getItem("token");

  // modal
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };

  // add blogs
  const addBlogs = (e) => {
    e.preventDefault(); // Sahifani qayta yuklashni oldini olish

    const blogsdataform = new FormData();
    blogsdataform.append("title_uz", blogsName);
    blogsdataform.append("text_uz", blogsText);
    blogsdataform.append("author", blogsAuthor);
    blogsdataform.append("images", blogsImg);

    fetch("https://api.dezinfeksiyatashkent.uz/api/blogs", {
      // Yangi blog qo'shishda id kerak emas
      method: "POST",
      headers: {
        Authorization: `Bearer ${blogsToken}`,
      },
      body: blogsdataform,
    })
      .then((blogs) => blogs.json())
      .then((resp) => {
        getBlogs(); // Malumotni yangilash uchun chaqirilmoqda
        console.log(resp);
        setOpen(false); // Modalni yopish
      });
  };

  return (
    <div>
      <button type="primary" onClick={showModal}>
        Add Blogs
      </button>
      <Modal title="Add Blogs" open={open} onCancel={hideModal} footer={null}>
        <form onSubmit={addBlogs}>
          <div className="my-6">
            <label htmlFor="name" className="flex items-center gap-[6px] my-2">
              <TbTopologyStar3 className="text-yellow-700" />
              <span className="font-medium">Text Uz</span>
            </label>
            <input
              onChange={(e) => setBlogsText(e.target.value)}
              id="name"
              className="w-full border-[1px] outline-none hover: active:border-blue-600 border-gray-500 px-4 py-[6px] rounded-[8px]"
              type="text"
              placeholder="Text Uz... "
            />
          </div>

          <div className="my-6">
            <label htmlFor="name" className="flex items-center gap-[6px] my-2">
              <TbTopologyStar3 className="text-yellow-700" />
              <span className="font-medium">Name Uz</span>
            </label>
            <input
              onChange={(e) => setBlogsName(e.target.value)}
              id="name"
              className="w-full border-[1px] outline-none hover: active:border-blue-600 border-gray-500 px-4 py-[6px] rounded-[8px]"
              type="text"
              placeholder="Name uz... "
            />
          </div>

          <div className="my-6">
            <label htmlFor="name" className="flex items-center gap-[6px] my-2">
              <TbTopologyStar3 className="text-yellow-700" />
              <span className="font-medium">Author</span>
            </label>
            <input
              onChange={(e) => setBlogsAuthor(e.target.value)}
              id="name"
              className="w-full border-[1px] outline-none hover: active:border-blue-600 border-gray-500 px-4 py-[6px] rounded-[8px]"
              type="text"
              placeholder="Author... "
            />
          </div>

          <div className="my-6">
            <label htmlFor="name" className="flex items-center gap-[6px] my-2">
              <TbTopologyStar3 className="text-yellow-700" />
              <span className="font-medium">Images</span>
            </label>
            <input
              onChange={(e) => setBlogsImg(e.target.files[0])}
              id="name"
              className="py-[6px]"
              type="file"
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

export default BlogsAdd;
