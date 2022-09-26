import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";

const Home: NextPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const dataObj = Object.fromEntries(data);
    setLoading(true);

    const response = await fetch("api/pokemon", {
      method: "POST",
      body: JSON.stringify({ slug: dataObj.slug }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setData(json);
    setLoading(false);
  };
  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="pokemon api made easy" />
      </Head>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          className="md:text-xl text-base resize rounded-md mt-5 px-2 md:px-20 md:py-5 py-3 "
          name="slug"
          placeholder="Enter a topic"
        />
        <button type="submit">Submit</button>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            data.map((item: any) => (
                <p>{item}</p>
            ))
          )}      
        </div>
      </form>
    </>
  );
};

export default Home;
