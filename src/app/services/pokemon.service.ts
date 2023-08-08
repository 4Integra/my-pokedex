import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

type Pokedex = {
  count: number;
  previous: string | null;
  next: string | null;
  results: Pokemon[];
}

type Pokemon = {
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})

export class PokemonService {
  pokedex!: Pokedex;
  pokemons!: Pokemon[];

  constructor(private httpClient: HttpClient) {
    this.loadPokemons();
  }

  async loadPokemons() {
    const pokedex$ = this.httpClient.get<Pokedex>('https://pokeapi.co/api/v2/pokemon?limit=151');
    this.pokedex = await lastValueFrom(pokedex$);

    this.pokemons = this.pokedex.results;
  }
}
