"use client";

import React, { useEffect, useState } from "react";

export default function CharacterDetails({ params: { characterId } }) {
  const [character, setCharacter] = useState({});
  const [loading, setLoading] = useState(true);

  function getSingleCharachters() {
    console.log("istek atildi..");
    fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then((resp) => resp.json())
      .then((resp) => {
        setCharacter(resp);
        setLoading(false);
      })
      .catch(console.error());
  }

  useEffect(() => {
    getSingleCharachters();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <>
      <div>
        <h3>Karakter Detay Sayfası - character id..: {characterId}</h3>
      </div>
      <img src={character.image} />
      <div>character name: {character.name}</div>
      <div>character gender: {character.gender}</div>
      <div>character origin: {character.origin.name}</div>
    </>
  );
}
