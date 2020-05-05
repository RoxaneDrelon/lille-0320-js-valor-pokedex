import React from "react";
import DescriptionPokemon from "./DescriptionPokemon";
import "./styles/FichePokemon.css";
import "./styles/mainInformation.css";
import "./styles/vulnerabilites.css";
import "./styles/description.css";
import "./styles/basicStats.css";
import "./styles/attacks.css";

//fonction FichePokemon extrait, via un props "pokemon" les données de l'API enregistré dans this.state.OnePokemon dans la class PokeCall
//va permettre de mettre en place via le css tous les éléments
//FichePokemon function extracts, via a "pokemon" accessory, the API data saved in this.state.OnePokemon in the PokeCall class
// will allow to set up via the css all the elements
function FichePokemon({ pokemon }) {
  const urlSprites = `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`;
  console.log("----------");
  console.log(pokemon.moves);
  console.log("----------");

  //permet de modifier la couleur selon le niveau de stats
  const color = (obj) => {
    if (obj.base_stat <= 50) {
      return "rouge";
    } else if (obj.base_stat <= 100 && obj.base_stat > 50) {
      return "orange";
    } else {
      return "vert";
    }
  };

  return (
    <section className="fiche">
      <article className="column">
        <div className="backgroundGeneral mainInformation">
          <div className="PokemonName">
            <p className="nomId">
              {pokemon.name} - N°{pokemon.id}
            </p>
          </div>
          <div className="Infos">
            <div>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.id}
                className="img"
              />
            </div>
            <div>
              <div className="sousTitre">Main information </div>
              <p>Number: {pokemon.id}</p>
              <p>types:</p>
              {pokemon.types.map((obj) => {
                return <p key={obj.type.name}>{obj.type.name}</p>;
              })}
              <p>height: {pokemon.height}</p>
              <p>weight: {pokemon.weight}</p>
            </div>
          </div>
        </div>
        <div className="backgroundGeneral vulnerabilites">
          <div className="sousTitre">vulnerabilites </div>
          <p>vulnerabilites</p>
        </div>
        <div className="backgroundGeneral description">
          <p className="sousTitre">Description </p>
          <DescriptionPokemon />
        </div>
      </article>
      <article className="backgroundGeneral column2">
        <div className="basicStats">
          <p className="sousTitre">Basic statistics</p>

          {pokemon.stats.map((obj) => {
            return (
              <div className="stat">
                <p key={obj.stat.name}>{obj.stat.name}</p>
                <p>{obj.base_stat}</p>
                <div className="status">
                  <span className={color(obj)}></span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="attacks">
          <p className="sousTitre">Attacks learned by level</p>
          <div className="titleBoard">
            <p>Attacks</p> <p> Ultra Sun-Ultra Moon</p>
          </div>
          {pokemon.moves.map((obj) => {
            const details = obj.version_group_details;
            return details //renvoies le tableau version_group_details
              .filter((array) => {
                //dans version_group_detail, prendre que ce qui contient USUM et level-up uniquement
                return (
                  array.version_group.name === "ultra-sun-ultra-moon" &&
                  array.move_learn_method.name === "level-up"
                );
              })
              .sort((ob1, ob2) => {
                return -1;
              })
              .map((array) => {
                //renvoi le level_lernead_at de chaque élément
                return (
                  <p>
                    {obj.move.name}: {array.level_learned_at}
                  </p>
                );
              });
          })}
        </div>
      </article>
    </section>
    //faire le css de la description dans DescriptionPokemonCard
  );
}

export default FichePokemon;
