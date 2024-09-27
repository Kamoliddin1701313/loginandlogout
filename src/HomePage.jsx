import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import AddPost from "./AddPost";
import { toast } from "react-toastify";

const HomePage = () => {
  const [post, setPost] = useState(false);
  // get categoriya
  const [categoriya, setCategoriya] = useState([]);
  const deleteToken = localStorage.getItem("token");

  const getCategory = () => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
      .then((respons) => respons.json())
      .then((res) => setCategoriya(res.data));
  };

  // deletCategoriya
  const deletCategoriya = (id) => {
    console.log(id);
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`, {
      method: "Delete",
      headers: {
        Authorization: `Bearer ${deleteToken}`,
      },
    })
      .then((respons) => respons.json())
      .then((res) => {
        if (res?.success) {
          toast.success(res?.message);
          getCategory();
        } else {
          toast.error(res?.message);
        }
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className={`container`} style={{ position: "relative" }}>
      <button onClick={() => setPost(!post)}>ADD CATEGORY</button>
      {post && <AddPost getCategory={getCategory} setPost={setPost} />}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>name_en</th>
            <th>name_ru</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categoriya?.map((val) => (
            <tr key={val.id}>
              <td>{val?.name_en}</td>
              <td>{val?.name_ru}</td>
              <td>
                <img
                  style={{ width: "160px", height: "100px" }}
                  src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${val?.image_src}`}
                  alt={val.created_at}
                />
              </td>
              <td className="d-flex gap-2">
                <Button variant="success">Edit</Button>
                <Button
                  onClick={() => deletCategoriya(val?.id)}
                  variant="danger"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </Table>
    </div>
  );
};

export default HomePage;
