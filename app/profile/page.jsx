"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  //Get the data, rename the data to session
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      await setPosts(data);
      console.log(data);
    };
    //Fetch only if there is a loggedin user
    if (session?.user.id) fetchPosts();
  }, []);

  const handleEdit = () => {};

  const handleDelete = async () => {};

  return (
    <Profile
      name={session?.user.name}
      description="Welcome to your personalized profile page"
      data={posts}
      handleEdit={() => {}}
      handleDelete={() => {}}
    />
  );
};

export default MyProfile;
