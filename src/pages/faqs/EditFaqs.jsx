import React, { useState } from "react";
import { Modal, Button } from "antd";
import { TbTopologyStar3 } from "react-icons/tb";

function EditFaqs({ getFaqs, editId, data }) {
  const [editName, setEditName] = useState("");
  const [open, setOpen] = useState(false);

  const dataxon = data?.find((item) => item?.id === editId);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  // Edit faqs
  const editFaqsToken = localStorage.getItem("token");

  const FaqsEdit = async (e) => {
    e.preventDefault();

    const formdataeditedit = new FormData();

    formdataeditedit.append("text_uz", editName || dataxon?.name);

    fetch(`https://api.dezinfeksiyatashkent.uz/api/faqs/${editId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${editFaqsToken}`,
      },
      body: formdataeditedit,
    })
      .then((respons) => respons.json())
      .then((respon) => {
        console.log(respon);

        if (respon?.success) {
          console.log("Ma'lumot muvaffaqiyatli yuborildi:", result);
          setEditName("");
          hideModal();
          getFaqs();
        } else {
          alert("errorku");
          console.log("Tarmoq javobi noto'g'ri");
        }
      });
  };

  return (
    <div>
      <button type="primary" onClick={showModal}>
        Edit
      </button>
      <Modal title="Edit" open={open} onCancel={hideModal} footer={null}>
        <form onSubmit={FaqsEdit}>
          <div className="my-6">
            <label htmlFor="name" className="flex items-center gap-[6px] my-2">
              <TbTopologyStar3 className="text-yellow-700" />
              <span className="font-medium">Name</span>
            </label>
            <input
              onChange={(e) => setEditName(e.target.value)}
              defaultValue={dataxon?.text_uz}
              id="name"
              className="w-full border-[1px] outline-none hover: active:border-blue-600 border-gray-500 px-4 py-[6px] rounded-[8px]"
              type="text_uz"
              placeholder="Name... "
            />
          </div>

          <Button type="primary" htmlType="submit">
            Faqs Edit
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default EditFaqs;
