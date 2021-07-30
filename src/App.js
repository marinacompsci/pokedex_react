import {
  getPokemonList,
  getPokemonDescription,
  getPokemonSpriteUrl
} from "../api/utils";
import "../styles/styles.css";
//import Prompt from "../components/Prompt";
import Card from "../components/Card";
import Select from "../components/Select";
import React from "react";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      names: null,
      selectedPokemonObject: null,
      prevIsDisabled: false,
      nextIsDisabled: false
    };
    this.getList = this.getList.bind(this);
    this.pokemonSelected = this.pokemonSelected.bind(this);
    this.getPokemonObject = this.getPokemonObject.bind(this);
    this.flipPage = this.flipPage.bind(this);
  }

  getList() {
    getPokemonList().then((data) => {
      const pokemonNames = data.map((pokemon) => pokemon.name);
      this.setState({ list: data, names: pokemonNames });
    });
  }

  getPokemonObject(index) {
    //return this.state.list.find((el) => el.name === name);
    return this.state.list[index];
  }

  pokemonSelected(id) {
    const index = id - 1;
    const infoObj = this.getPokemonObject(index);
    console.log(infoObj);
    getPokemonDescription(id).then((descr) => {
      const obj = {
        id: Number(id),
        name: infoObj.name,
        url: getPokemonSpriteUrl(id),
        description: descr
      };
      this.setState({ selectedPokemonObject: obj });
    });

    if (index === 0) {
      // first element
      if (this.state.nextIsDisabled) this.setState({ nextIsDisabled: false });
      this.setState({ prevIsDisabled: true });
    } else if (index === this.state.list.length - 1) {
      // last element
      if (this.state.prevIsDisabled) this.setState({ prevIsDisabled: false });
      this.setState({ nextIsDisabled: true });
    } else {
      // any in between
      if (this.state.prevIsDisabled) this.setState({ prevIsDisabled: false });
      if (this.state.nextIsDisabled) this.setState({ nextIsDisabled: false });
    }
  }

  flipPage(summand) {
    let id = this.state.selectedPokemonObject.id;
    const index = id - 1;
    console.log("id: " + id);
    console.log("flipage Index: " + index);

    if (summand === -1 && index === 0) {
      // clicking on 'Previous' while at first element
      this.setState({ prevIsDisabled: true });
      return;
    } else if (summand === 1 && index === this.state.list.length - 1) {
      // clicking on 'Next' while at last element
      this.setState({ nextIsDisabled: true });
      return;
    }

    id += summand;

    if (this.state.prevIsDisabled) this.setState({ prevIsDisabled: false });
    if (this.state.nextIsDisabled) this.setState({ nextIsDisabled: false });
    this.pokemonSelected(id);
  }

  componentDidMount() {
    this.getList();
  }

  render() {
    const prevIsDisabled = this.state.prevIsDisabled ? "disabled" : "";
    const nextIsDisabled = this.state.nextIsDisabled ? "disabled" : "";
    return (
      <>
        <Select
          list={this.state.names}
          pokemonSelected={this.pokemonSelected}
        />
        {this.state.selectedPokemonObject && (
          <Card
            pokemonSelected={this.pokemonSelected}
            picture={this.state.selectedPokemonObject.url}
            name={this.state.selectedPokemonObject.name}
            description={this.state.selectedPokemonObject.description}
          />
        )}
        {this.state.selectedPokemonObject && (
          <div className="btnRow">
            <button
              className={prevIsDisabled}
              onClick={() => this.flipPage(-1)}
            >
              Previous
            </button>
            <button className={nextIsDisabled} onClick={() => this.flipPage(1)}>
              Next
            </button>
          </div>
        )}
      </>
    );
  }
}
