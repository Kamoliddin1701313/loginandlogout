import React, { useState } from "react";
import { Modal, Button } from "antd";
import { TbTopologyStar3 } from "react-icons/tb";

const BlogsEdit = ({ blogsId, getBlogs, blogsdata }) => {
  const [newsImages, setNewsImages] = useState("");
  const [newsNameUz, setNewsNameUz] = useState("");
  const [newsTextUz, setNewsTextUz] = useState("");
  const [newsAuthor, setNewsAuthor] = useState("");

  const datafind = blogsdata.find((item) => item.id == blogsId);

  // modal
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };
  // modal

  // edit blogs
  const editBlogsToken = localStorage.getItem("token");

  const BlogsAdd = async (e) => {
    e.preventDefault();

    const formdatablogs = new FormData();
    formdatablogs.append("news_images", newsImages);
    formdatablogs.append("title_uz", newsNameUz);
    formdatablogs.append("text_uz", newsTextUz);
    formdatablogs.append("author", newsAuthor);

    try {
      const response = await fetch(
        `https://api.dezinfeksiyatashkent.uz/api/news/${blogsId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${editBlogsToken}`,
          },
          body: formdatablogs,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Ma'lumot muvaffaqiyatli yuborildi:", result);

        setNewsImages("");
        setNewsNameUz("");
        setNewsTextUz("");
        setNewsAuthor("");

        hideModal();
        getBlogs();
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
      <Modal title="Add" open={open} onCancel={hideModal} footer={null}>
        <form onSubmit={BlogsAdd}>
          <div className="my-6">
            <label htmlFor="name" className="flex items-center gap-[6px] my-2">
              <TbTopologyStar3 className="text-yellow-700" />
              <span className="font-medium">Name Uz</span>
            </label>
            <input
              onChange={(e) => setNewsNameUz(e.target.value)}
              //   value={newsNameUz}
              defaultValue={datafind?.title_uz}
              required
              id="name"
              className="w-full border-[1px] outline-none hover: active:border-blue-600 border-gray-500 px-4 py-[6px] rounded-[8px]"
              type="text"
              placeholder="Name... "
            />
          </div>

          <div className="my-6">
            <label
              htmlFor="textUz"
              className="flex items-center gap-[6px] my-2"
            >
              <TbTopologyStar3 className="text-yellow-700" />
              <span className="font-medium">Text Uz</span>
            </label>
            <input
              onChange={(e) => setNewsTextUz(e.target.value)}
              //   value={newsTextUz}
              defaultValue={datafind?.text_uz}
              required
              id="textUz"
              className="w-full border-[1px] outline-none hover: active:border-blue-600 border-gray-500 px-4 py-[6px] rounded-[8px]"
              type="text"
              placeholder="Name... "
            />
          </div>

          <div className="my-6">
            <label
              htmlFor="author"
              className="flex items-center gap-[6px] my-2"
            >
              <TbTopologyStar3 className="text-yellow-700" />
              <span className="font-medium">Author</span>
            </label>
            <input
              onChange={(e) => setNewsAuthor(e.target.value)}
              //   value={newsAuthor}
              defaultValue={datafind?.author}
              required
              id="author"
              className="w-full border-[1px] outline-none hover: active:border-blue-600 border-gray-500 px-4 py-[6px] rounded-[8px]"
              type="text"
              placeholder="Name... "
            />
          </div>

          <div className="my-6">
            <label
              htmlFor="images"
              className="flex items-center gap-[6px] my-2"
            >
              <TbTopologyStar3 className="text-yellow-700" />
              <span className="font-medium">Images</span>
            </label>
            <input
              onChange={(e) => setNewsImages(e.target.files[0])}
              required
              multiple
              id="images"
              className="py-[6px]"
              type="file"
            />
          </div>

          <Button
            className="bg-blue-700 text-white hover:bg-blue-600"
            type="submit"
          >
            Blogs Edit
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default BlogsEdit;
