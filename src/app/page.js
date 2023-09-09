"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const urlApi = "https://rickandmortyapi.com/api/character";

export default function Home() {
  const [character, setCharacter] = useState([]);

  function getCharachters() {
    console.log("istek atildi..");
    fetch(urlApi)
      .then((resp) => resp.json())
      .then((resp) => {
        setCharacter(resp.results);
      })
      .catch(console.error());
  }

  useEffect(() => {
    getCharachters();
  }, []);

  const characterList = character.map((char) => {
    return (
      <li key={char.id}>
        <Link href={`character/${char.id}`}>
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
          <select>
            <option value="all">All</option>
            <option value="dead">Dead</option>
            <option value="alive">Alive</option>
            <option value="unknown">Unknown</option>
          </select>
        </form>
        <ul>{characterList}</ul>
      </div>
    </div>
  );
}
