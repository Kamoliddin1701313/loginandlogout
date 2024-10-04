import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCategories from "./AddCategories";
import EditCategories from "./EditCategories";

const Categories = () => {
  const [data, setData] = useState([]);
  const deletetoken = localStorage.getItem("token");

  const getCategories = () => {
    fetch("https://api.dezinfeksiyatashkent.uz/api/categories")
      .then((respons) => respons.json())
      .then((val) => setData(val.data));
  };

  const deleteCategories = (id) => {
    fetch(`https://api.dezinfeksiyatashkent.uz/api/categories/${id}`, {
      method: "Delete",
      headers: {
        Authorization: `Bearer ${deletetoken}`,
      },
    })
      .then((natija) => natija.json())
      .then((nat) => {
        if (nat.success) {
          getCategories();
          toast.success(nat.message);
        } else {
          toast.error(nat.message);
        }
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <button className="bg-blue-700 text-white my-8 rounded-[10px] px-4 h-[36px] mt-[9px] hover:bg-blue-500">
        <AddCategories getCategories={getCategories} />
      </button>
      <table className="bg-white w-full rounded-[12px] overflow-hidden">
        <thead className="h-[55px]">
          <tr className="bg-[#d4d1d191] text-left">
            <th className="w-[7%] text-center">№</th>
            <th className="w-[8%] text-center">id</th>
            <th className="w-[30%] text-center">Name</th>
            <th className="w-[25%]">Description</th>
            <th className="w-[30%]">Harakat</th>
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
                <td className="w-[8%] text-center">{val.id}</td>
                <td className="w-[30%] text-center pr-5">{val.name}</td>
                <td className="w-[25%] pr-5">{val.description}</td>
                <td className="flex gap-[10px] text-white h-[55px]">
                  <button className="bg-blue-700 rounded-[10px] px-4 h-[36px] mt-[9px] hover:bg-blue-500">
                    <EditCategories
                      editId={val.id}
                      getCategories={getCategories}
                      data={data}
                    />
                  </button>
                  <button
                    onClick={() => deleteCategories(val.id)}
                    className="bg-red-700 rounded-[10px] px-4 h-[36px] mt-[9px] hover:bg-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default Categories;
