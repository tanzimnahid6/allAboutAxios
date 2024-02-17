import api from "../api/api";
import { useEffect } from "react";
import { useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [post, setPost] = useState({
    title: "New title",
    views: 0,
  });

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };
  //create data
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform actions with the form data, e.g., send it to a server.
    try {
      const { data } = await api.post("/posts", post);
      setPosts([...posts, data]);
      console.log(data);
    } catch (error) {
      console.error("Error sending data:", error.message);
    }
  };

  //delete data
  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/posts/${id}`);
      console.log(response);
      if (response.statusText == "OK") {
        const leastArr = posts.filter((post) => post.id !== id);
        setPosts(leastArr);
      }
    } catch (error) {
      console.log("Error from delete", error.message);
      alert(error.message);
    }
  };

  //update data
  const handleEdit = (updatePost) => {
    setIsEdit(true);
    setPost({
      title: updatePost.title,
      views: updatePost.views,
      id: updatePost.id,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.patch(`/posts/${post.id}`, post);
      if (response.statusText == "OK") {
        const newPosts = posts.map((post) => {
          if (post.id === response.data.id) {
            return response.data;
          }
          return post;
        });
        setPosts(newPosts);
      }
      console.log(response);
    } catch (error) {
      console.log("Error when update", error.message);
    }
  };

  //load data
  useEffect(() => {
    let ignore = true;
    const fetchPosts = async () => {
      const response = await api.get("/posts");

      if (ignore) setPosts(response.data);
    };
    fetchPosts();

    return () => {
      ignore = false;
    };
  }, []);

  return (
    <div>
      <p>All post here</p>
      <div>
        {posts.map((post, i) => (
          <div key={post.id} style={{ padding: "5px" }}>
            <span>
              {i + 1} : Title:{post.title} - Views : {post.views}
            </span>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
            <button onClick={() => handleEdit(post)}>Edit</button>
          </div>
        ))}
      </div>

      {/* Form post */}
      <hr />
      <p>Enter a new post here</p>
      <form onSubmit={!isEdit ? handleSubmit : handleUpdate}>
        <input
          value={post.title}
          type="text"
          name="title"
          onChange={handleChange}
        />
        <br /> <br />
        <input
          type="number"
          onChange={handleChange}
          name="views"
          value={post.views}
        />
        {isEdit ? (
          <button type="submit">Update</button>
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>
    </div>
  );
};

export default Posts;
