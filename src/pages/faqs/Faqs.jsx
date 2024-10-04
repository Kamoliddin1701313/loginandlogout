import React, { useEffect, useState } from "react";
import AddFaqs from "./AddFaqs";
import EditFaqs from "./EditFaqs";
import { ToastContainer } from "react-toastify";

const Faqs = () => {
  const [data, setData] = useState();
  const deletetoken = localStorage.getItem("token");

  const getFaqs = () => {
    fetch("https://api.dezinfeksiyatashkent.uz/api/faqs")
      .then((respons) => respons.json())
      .then((val) => {
        setData(val.data);
      });
  };

  const deleteFaqs = (id) => {
    fetch(`https://api.dezinfeksiyatashkent.uz/api/faqs/${id}`, {
      method: "Delete",
      headers: {
        Authorization: `Bearer ${deletetoken}`,
      },
    })
      .then((natija) => natija.json())
      .then((nat) => {
        if (nat.success) {
          getFaqs();
          toast.success(nat.message);
        } else {
          toast.error(nat.message);
        }
      });
  };

  useEffect(() => {
    getFaqs();
  }, []);

  return (
    <div>
      <table className="bg-white w-full rounded-[12px] overflow-hidden">
        <thead className="h-[55px]">
          <tr className="bg-[#d4d1d191] text-left">
            <th className="w-[7%] text-center">№</th>
            <th className="w-[30%] text-center">Name</th>
            <th className="w-[25%]">Actions</th>
            <th className="w-[30%]">
              <button className="bg-blue-700 text-white my-8 rounded-[10px] px-4 h-[36px] mt-[9px] hover:bg-blue-500">
                <AddFaqs getFaqs={getFaqs} />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((val, index) => {
            return (
              <tr
                key={index}
                className="text-left hover:bg-[#d4d1d191] h-[55px]"
              >
                <td className="w-[7%] text-center">{index + 1}</td>
                <td className="w-[30%] text-center pr-5">{val.title_uz}</td>
                <td className="flex gap-[10px] text-white h-[55px]">
                  <button className="bg-blue-700 rounded-[10px] px-4 h-[36px] mt-[9px] hover:bg-blue-500">
                    <EditFaqs editId={val.id} getFaqs={getFaqs} data={data} />
                  </button>
                  <button
                    onClick={() => deleteFaqs(val.id)}
                    className="bg-red-700 rounded-[10px] px-4 h-[36px] mt-[9px] hover:bg-red-500"
                  >
                    Delete
                  </button>
                </td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default Faqs;
