import React, { useState } from "react";
import { Modal, Button } from "antd";
import { TbTopologyStar3 } from "react-icons/tb";

function AddServices({ getServices }) {
  const [servicesImages, setServicesImages] = useState("");
  const [servicesNameUz, setServicesNameUz] = useState("");
  const [servicesTextUz, setServicesTextUz] = useState("");
  const [servicesAuthor, setServicesAuthor] = useState("");

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  // add news
  const addServicesToken = localStorage.getItem("token");

  const ServicesAdd = async (e) => {
    e.preventDefault();

    const formdataservices = new FormData();
    formdataservices.append("news_images", servicesImages);
    formdataservices.append("title_uz", servicesNameUz);
    formdataservices.append("text_uz", servicesTextUz);
    formdataservices.append("author", servicesAuthor);

    try {
      const response = await fetch(
        "https://api.dezinfeksiyatashkent.uz/api/services",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${addServicesToken}`,
          },
          body: formdataservices,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Ma'lumot muvaffaqiyatli yuborildi:", result);

        setServicesImages("");
        setServicesNameUz("");
        setServicesTextUz("");
        setServicesAuthor("");

        hideModal();
        getServices();
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
        Services Add
      </button>
      <Modal title="Add" open={open} onCancel={hideModal} footer={null}>
        <form onSubmit={ServicesAdd}>
          <div className="my-6">
            <label htmlFor="name" className="flex items-center gap-[6px] my-2">
              <TbTopologyStar3 className="text-yellow-700" />
              <span className="font-medium">Name Uz</span>
            </label>
            <input
              onChange={(e) => setServicesNameUz(e.target.value)}
              value={servicesNameUz}
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
              onChange={(e) => setServicesTextUz(e.target.value)}
              value={servicesTextUz}
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
              onChange={(e) => setServicesAuthor(e.target.value)}
              value={servicesAuthor}
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
              onChange={(e) => setServicesImages(e.target.files[0])}
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
            Save
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default AddServices;
