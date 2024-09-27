import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPost = ({ getCategory, setPost }) => {
  const [nameEn, setNameEn] = useState();
  const [nameRu, setNameRu] = useState();
  const [image, setImage] = useState();

  const addToken = localStorage.getItem("token");

  const categoryaPost = (event) => {
    const formdata = new FormData();
    formdata.append("name_en", nameEn);
    formdata.append("name_ru", nameRu);
    formdata.append("images", image);
    event.preventDefault();

    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories", {
      method: "Post",
      headers: {
        // "Content-type": "multipart/form-data",
        Authorization: `Bearer ${addToken}`,
      },
      body: formdata,
    })
      .then((respons) => respons.json())
      .then((elem) => {
        if (elem?.success) {
          getCategory();
          setPost(false);
          toast.success(elem?.message);
        } else {
          toast.error(elem?.message);
        }
      });
  };

  return (
    <div>
      <form className="d-flex" style={{ justifyContent: "space-between" }}>
        <input
          onChange={(e) => setNameEn(e?.target?.value)}
          type="text"
          style={{ width: "100%" }}
          required
          minLength={5}
        />
        <input
          onChange={(e) => setNameRu(e?.target?.value)}
          type="text"
          style={{ width: "100%" }}
          required
          minLength={5}
        />
        <input onChange={(e) => setImage(e?.target?.files[0])} type="file" />
        <button type="submit" style={{ width: "50%" }} onClick={categoryaPost}>
          ADD
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddPost;
