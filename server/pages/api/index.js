export const getServerSideProps = async () => {
  const res = await fetch("/api/prompt");
  const repo = await res.json();
  return { props: { repo } };
};

export default function Page({ repo }) {
  return repo.stargazers_count;
}
