"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const urlApi = "https://rickandmortyapi.com/api/character";

export default function Home() {
  const [character, setCharacter] = useState([]);
  const [filter, setFilter] = useState({});

  function getCharachters() {
    console.log("istek atildi..");

    let endpoint = urlApi;

    let myFilter = filter;
    if (myFilter.gender === "all") {
      delete myFilter["gender"];
    }
    if (myFilter.status === "all") {
      delete myFilter["status"];
    }
    let filters = new URLSearchParams(myFilter).toString();

    if (filters) {
      endpoint += `?${filters}`;
    }
    fetch(`${endpoint}`)
      .then((resp) => resp.json())
      .then((resp) => {
        setCharacter(resp.results);
      })
      .catch(console.error());
  }

  useEffect(() => {
    getCharachters();
  }, [filter]);

  const characterList = character.map((char) => {
    return (
      <li key={char.id}>
        <Link href={`/character/${char.id}`}>
          {char.id} {char.name}
        </Link>
      </li>
    );
  });

  return (
    <div>
      <div>
        <h2>Rick and Morty</h2>
        <form>
          <select
            onChange={(e) => {
              setFilter({
                ...filter,
                gender: e.target.value,
              });
            }}
          >
            <option value="all">All Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unknown">Unknown</option>
          </select>
          <select
            onChange={(e) => {
              setFilter({
                ...filter,
                status: e.target.value,
              });
            }}
          >
            <option value="all">All</option>
            <option value="dead">Dead</option>
            <option value="alive">Alive</option>
            <option value="unknown">Unknown</option>
          </select>
        </form>
        <ul className={"characters"}>{characterList}</ul>
      </div>
    </div>
  );
}
