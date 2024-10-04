import React, { useEffect, useState } from "react";
import AddServices from "./AddServices";

const Services = () => {
  const [data, setData] = useState([]);
  const deletetoken = localStorage.getItem("token");

  const getServices = () => {
    fetch("https://api.dezinfeksiyatashkent.uz/api/services")
      .then((respons) => respons.json())
      .then((val) => setData(val.data));
  };

  const deleteServices = (id) => {
    fetch(`https://api.dezinfeksiyatashkent.uz/api/services/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${deletetoken}`,
      },
    })
      .then((natija) => natija.json())
      .then((nat) => {
        if (nat.success) {
          getServices();
        } else {
          alert("error");
        }
      });
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <div>
      <table className="bg-white w-full rounded-[12px] overflow-hidden table-fixed">
        <thead>
          <tr className="bg-[#d4d1d191] text-left">
            <th className="text-center w-[7%]">№</th>
            <th className="text-center w-[13%]">Image</th>
            <th className="text-center w-[16%]">Title_eng</th>
            <th className="text-center w-[16%]">Title_uzb</th>
            <th className="text-center w-[16%]">Title_rus</th>
            <th className="text-center w-[16%]">Title_zh</th>

            <th className="w-[16%]">
              <button className="bg-blue-700 text-white my-5 rounded-[10px] px-4 py-[6px] hover:bg-blue-500">
                <AddServices getServices={getServices} />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((val, index) => {
            return (
              <tr
                key={index}
                className="text-left hover:bg-[#d4d1d191] h-[75px]"
              >
                <td className="w-[7%] text-center">{index + 1}</td>

                <td className="w-[13%] text-center">
                  {val.news_images &&
                  val.news_images[0] &&
                  val.news_images[0].image ? (
                    <img
                      src={`https://api.dezinfeksiyatashkent.uz/api/services/${val.image_src[0]}`}
                      alt={val.news_images[0].news_id}
                      style={{ width: "100px", height: "auto" }} // optional: adjust image size
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                </td>

                <td className="w-[16%] text-center">{val.text_en}</td>

                <td className="w-[16%] text-center">{val.text_uz}</td>

                <td className="w-[16%] text-center">{val.title_ru} </td>

                <td className="w-[16%] text-center">{val.title_zh} </td>

                <td className="w-[16%] flex gap-[10px] text-white">
                  <button className="bg-blue-700 rounded-[10px] px-4 h-[36px] mt-[20px] hover:bg-blue-500">
                    edit
                  </button>
                  <button
                    onClick={() => deleteServices(val.id)}
                    className="bg-red-700 rounded-[10px] px-4 h-[36px] mt-[20px] hover:bg-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Services;
