import React, { useEffect, useState } from "react";
import BlogsAdd from "./BlogsAdd";
import BlogsEdit from "./BlogsEdit";

const Blogs = () => {
  const blogsToken = localStorage.getItem("token");

  // get blogs
  const [blogsdata, setBlogsdata] = useState([]);

  const getBlogs = () => {
    fetch("https://api.dezinfeksiyatashkent.uz/api/blogs")
      .then((respons) => respons.json())
      .then((resp) => {
        setBlogsdata(resp.data);
        console.log(resp.data, "blogs");
      });
  };
  // get blogs

  // delete blogs
  const blogsDelete = (id) => {
    fetch(`https://api.dezinfeksiyatashkent.uz/api/blogs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${blogsToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          alert(data.message);
          console.log("Deleted:", data);
          getBlogs();
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.error("Error:", error));
    console.log(id);
  };
  // delete blogs

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div>
      <button className="bg-blue-700 px-5 py-[6px] rounded-[8px] text-white hover:bg-blue-600">
        <BlogsAdd getBlogs={getBlogs} />
      </button>
      <table className="w-full bg-white my-5 rounded-[12px] overflow-hidden table-fixed">
        <thead>
          <tr className="bg-[#d4d1d191] h-[55px]">
            <th className="text-center w-[7%]">№</th>
            <th className="text-center w-[13%]">Images</th>
            <th className="text-center w-[20%]">Name Uz</th>
            <th className="text-center w-[20%]">Text Uz</th>
            <th className="text-center w-[20%]">Author</th>
            <th className="text-center w-[20%]">Harakat</th>
          </tr>
        </thead>
        <tbody>
          {blogsdata?.map((value, index) => (
            <tr key={index} className="h-[75px] hover:bg-[#d4d1d191]">
              <td className="text-center w-[7%]">{index + 1}</td>
              <td className="text-center w-[13%]">Images</td>
              <td className="text-center w-[20%] truncate">{value.title_uz}</td>
              <td className="text-center w-[20%] truncate">{value.text_uz}</td>
              <td className="text-center w-[20%] truncate">{value.author}</td>
              <td className="text-center w-[20%]">
                <button className="bg-blue-600 mx-2 px-5 py-1 rounded-[10px] text-white">
                  <BlogsEdit
                    blogsId={value.id}
                    getBlogs={getBlogs}
                    blogsdata={blogsdata}
                  />
                </button>
                <button
                  onClick={() => blogsDelete(value.id)}
                  className="bg-red-600 mx-2 px-3 py-1 rounded-[10px] text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Blogs;
