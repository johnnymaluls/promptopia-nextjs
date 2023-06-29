import { GetServerSideProps } from "next";

const fetchPosts = async () => {
  const response = await fetch("/api/prompt");
  const data = await response.json();

  return data;
};

export const getServerSideProps = async () => {
  const data = await fetchPosts();

  return data;
};

export async function getStaticProps() {
  const res = await fetch("/api/prompt");
  const data = await res.json();

  return {
    props: {
      data,
    },
    revalidate: 0,
  };
}
