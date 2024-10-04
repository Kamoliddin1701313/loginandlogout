import React, { useEffect, useState } from "react";
import AddNews from "./AddNews";
import EditNews from "./EditNews";

const News = () => {
  const [data, setData] = useState([]);
  const deletetoken = localStorage.getItem("token");

  const getNews = () => {
    fetch("https://api.dezinfeksiyatashkent.uz/api/news")
      .then((respons) => respons.json())
      .then((val) => {
        setData(val.data);
        console.log(val?.data?.text_uz);
      });
  };

  const deleteNews = (id) => {
    fetch(`https://api.dezinfeksiyatashkent.uz/api/news/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${deletetoken}`,
      },
    })
      .then((natija) => natija.json())
      .then((nat) => {
        if (nat.success) {
          getNews();
        } else {
          alert("error");
        }
      });
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div>
      <button className="bg-blue-700 text-white my-8 rounded-[10px] px-4 h-[36px] mt-[9px] hover:bg-blue-500">
        <AddNews getNews={getNews} />
      </button>

      <table className="bg-white w-full rounded-[12px] overflow-hidden">
        <thead className="h-[55px]">
          <tr className="bg-[#d4d1d191] text-left">
            <th className="text-center w-[7%]">№</th>
            <th className="text-center w-[13%]">Images</th>
            <th className="text-center w-1/5">Name Uz</th>
            <th className="text-center w-1/5">Text Uz </th>
            <th className="text-center w-1/5">Author</th>
            <th className="w-1/5">Harakat</th>
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
                  salom
                  {/* <img
                    src={`https://api.dezinfeksiyatashkent.uz/api/uploads/images/${val.news_images[0].image.src}`}
                    alt={val.news_images[0].news_id}
                    style={{ width: "100px", height: "auto" }} // optional: adjust image size
                  /> */}
                </td>

                <td className="w-1/5 text-center">{val.title_uz}</td>

                <td className="w-1/5 text-center">{val.text_uz}</td>

                <td className="w-1/5 text-center">{val.author}</td>

                <td className="w-1/5 flex gap-[10px] text-white">
                  <button className="bg-blue-700 rounded-[10px] px-4 h-[36px] mt-[20px] hover:bg-blue-500">
                    <EditNews getNews={getNews} editId={val.id} data={data} />
                  </button>
                  <button
                    onClick={() => deleteNews(val.id)}
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

export default News;
