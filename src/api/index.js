import axios from './axios';



// Pokemon
const fetchPokemons = async (offset = 9, limit = 9, type = 'normal') => {
    try {
      if(type === 'all'){
        const {data} = await axios.get(`/pokemon?limit=${limit}&offset=${offset}`)
        return data
      }else{
        console.log('type: ',type)
        const {data} = await axios.get(`/type/${type}/`)
        const start = offset
        const end = offset + limit

        const filteredArr = data.pokemon.filter((_, idx) => start <= idx && idx < end)
        const results = filteredArr.map(({pokemon}) => ({name: pokemon.name})) 
        console.log(data)
        return {results, count: data.pokemon.length}       
      }
        
    } catch (error) {
        console.error("Failed to fetch pokemons:" , error)
    }
};

const fetchPokemon = async (name) => {
    try {
      const { data } = await axios(`/pokemon/${name}`);
      const imgUrl = data.sprites.other.dream_world.front_default;
      return { ...data, imgUrl }
    } catch (error) {
      console.log(error + "Failed to fetch pokemon:", error);
    }
  };

export default { fetchPokemons, fetchPokemon };
