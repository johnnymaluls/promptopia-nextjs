"use client";

import { useState, useEffect } from "react";
import PromptCard from "@components/PromptCard";
import Loading from "@components/Loading";
import { getServerSideProps } from "@server/pages/api/prompt";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [allPrompts, setAllPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPrompts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const result = filterPrompts(searchText);
        setSearchResult(result);
      }, 500)
    );
  };

  const fetchPosts = async () => {
    setIsLoading(true);
    const response = await fetch("/api/prompt", {
      next: { revalidate: false },
    });
    const data = await response.json();
    console.log(data);
    setIsLoading(false);
    setAllPrompts(data);
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    setSearchResult(filterPrompts(tagName));
  };

  const getServerData = async () => {
    setIsLoading(true);
    const data = await getServerSideProps();
    console.log(data);
    setIsLoading(false);
    setAllPrompts(data);
  };

  useEffect(() => {
    fetchPosts();
    //getServerData();
    console.log("useEffect gumana");
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {/* Render Prompts */}
          {searchText ? (
            <PromptCardList
              data={searchResult}
              handleTagClick={handleTagClick}
            />
          ) : (
            <PromptCardList data={allPrompts} handleTagClick={handleTagClick} />
          )}
        </div>
      )}
    </section>
  );
};

export default Feed;
