import React, { useState } from "react";
import { Modal, Button } from "antd";
import { TbTopologyStar3 } from "react-icons/tb";

function AddFaqs({ getFaqs }) {
  const [postName, setPostName] = useState("");
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  // POST faqs
  const postFaqsToken = localStorage.getItem("token");

  const formdatafaqs = new FormData();
  formdatafaqs.append("text_uz", postName); // title_ru ni title_uz ga o'zgartirdim

  const FaqsPosts = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://api.dezinfeksiyatashkent.uz/api/faqs",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${postFaqsToken}`,
          },
          body: formdatafaqs,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setPostName("");
        hideModal();
        getFaqs();
      } else {
        const errorResult = await response.json();
        console.log("Tarmoq javobi noto'g'ri:", errorResult);
      }
    } catch (error) {
      console.error("Xato:", error);
      alert("catch ishladi xatolik bor!");
    }
  };

  return (
    <div>
      <button type="primary" onClick={showModal}>
        Faqs Add
      </button>
      <Modal title="Add" open={open} onCancel={hideModal} footer={null}>
        <form onSubmit={FaqsPosts}>
          <div className="my-6">
            <label htmlFor="name" className="flex items-center gap-[6px] my-2">
              <TbTopologyStar3 className="text-yellow-700" />
              <span className="font-medium">Name</span>
            </label>
            <input
              onChange={(e) => setPostName(e.target.value)}
              value={postName}
              required
              id="name"
              className="w-full border-[1px] outline-none hover: active:border-blue-600 border-gray-500 px-4 py-[6px] rounded-[8px]"
              type="text"
              placeholder="Title_uz... " // Text_uz o'rniga Title_uz yozildi
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

export default AddFaqs;
