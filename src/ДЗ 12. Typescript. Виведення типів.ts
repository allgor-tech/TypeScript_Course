interface Movie {
  name: string;
  year: number;
  rating: number;
  awards: string[];
}

interface MovieCategory {
  name: string;
  movies: Movie[] | Movie[][];
}

// Define an array of movies
const movies: Movie[] = [
  {
    name: 'Movie1',
    year: 2021,
    rating: 5,
    awards: ['award1'],
  },
  {
    name: 'Movie2',
    year: 2022,
    rating: 4,
    awards: ['award2'],
  },
  {
    name: 'Movie3',
    year: 2023,
    rating: 3,
    awards: ['award3'],
  },
];

// Define the MovieList class
class MovieList implements IMovieList {
  readonly movies: Movie[];

  constructor(movies: Movie[]) {
    this.movies = movies;
  }

  // Filter movies by year
  filterByYear(year: number): Movie[] {
    return this.movies.filter(movie => movie.year === year);
  }

  // Filter movies by rating range
  filterByRating(ratingFrom: number, ratingTo: number): Movie[] {
    return this.movies.filter(movie => movie.rating >= ratingFrom && movie.rating <= ratingTo);
  }

  // Filter movies by awards
  filterByAwards(awards: string[]): Movie[] {
    return this.movies.filter(movie => movie.awards.some(award => awards.includes(award)));
  }

  // Search movies by name
  searchByName(name: string): Movie[] {
    return this.movies.filter(movie => movie.name === name);
  }
}

// Define the MovieCategoryList class
class MovieCategoryList implements IMovieCategoryList {
  private readonly movieCategories: MovieCategory[];

  constructor(movieCategories: MovieCategory[]) {
    this.movieCategories = movieCategories;
  }

  // Search movie categories by name
  searchByName(name: string): MovieCategory[] {
    return this.movieCategories.filter(category => category.name === name);
  }
}

// Create an instance of MovieList
const movieList = new MovieList(movies);

// Define an array of movie categories
const movieCategories: MovieCategory[] = [
  {
    name: 'Category1',
    movies: [movieList.searchByName('Movie1'), movieList.searchByName('Movie2')],
  },
  {
    name: 'Category2',
    movies: movieList.searchByName('Movie3'),
  },
];

// Define the BaseList interface
interface BaseList<T> {
  searchByName: (name: string) => T[];
}

// Define the IMovieList interface
interface IMovieList extends BaseList<Movie> {
  filterByYear: (year: Movie['year']) => Movie[];
  filterByRating: (ratingFrom: Movie['rating'], ratingTo: Movie['rating']) => Movie[];
  filterByAwards: (awards: Movie['awards']) => Movie[];
}

type IMovieCategoryList = BaseList<MovieCategory>;

// Create an instance of MovieCategoryList
const movieCategoryList = new MovieCategoryList(movieCategories);

interface MatchFilter {
  type: 'match';
  filter: string | number;
}

interface RangeFilter {
  type: 'range';
  filter: number;
  filterTo: number;
}

interface ValueSearchFilter {
  type: 'valueSearch';
  values: string[];
}

// Define the MovieFilter type
type MovieFilter = MatchFilter | RangeFilter | ValueSearchFilter;

// Define the MovieFilterManager class
class MovieFilterManager {
  private movieList: MovieList;
  private movieCategoryList: MovieCategoryList;
  private filteredMovies!: (MovieCategory | Movie)[];

  constructor(movieList: MovieList, movieCategoryList: MovieCategoryList) {
    this.movieCategoryList = movieCategoryList;
    this.filteredMovies = movieList.movies;
    this.movieList = movieList;
  }

  // Apply search value to filter movies
  applySearchValue(name: string): (Movie | MovieCategory)[] {
    const movieResults = this.movieList.searchByName(name);
    const categoryResults = this.movieCategoryList.searchByName(name);
    if (movieResults.length !== 0) {
      this.filteredMovies = movieResults;
    } else {
      this.filteredMovies = categoryResults;
    }
    return this.filteredMovies;
  }

  // Apply filters to filter movies
  applyFiltersValue(filters: MovieFilter[]): Movie[] {
    this.movieList = new MovieList(this.filteredMovies as Movie[]);
    for (const filter of filters) {
      if (filter.type === 'range') {
        const rangeFilter = filter as RangeFilter;
        this.filteredMovies = this.movieList.filterByRating(rangeFilter.filter, rangeFilter.filterTo);
      } else if (filter.type === 'match') {
        const matchFilter = filter as MatchFilter;
        typeof matchFilter.filter === 'string'
          ? (this.filteredMovies = this.movieList.searchByName(matchFilter.filter as string))
          : (this.filteredMovies = this.movieList.filterByYear(matchFilter.filter as number));
      } else {
        const valueSearchFilter = filter as ValueSearchFilter;
        this.filteredMovies = this.movieList.filterByAwards(valueSearchFilter.values);
      }
    }
    if (this.filteredMovies.length === 0) {
      throw new Error('No movies found');
    }
    return this.filteredMovies as Movie[];
  }
}

const movieFilterManager = new MovieFilterManager(movieList, movieCategoryList);

console.log(movieFilterManager.applySearchValue('Category2'));
console.log(movieFilterManager.applyFiltersValue([{ type: 'range', filter: 4, filterTo: 5 }])); // No movies found

console.log(movieFilterManager.applySearchValue('Movie3')); // [{ name: 'Movie3', year: 2023, rating: 3, awards: ['award3'] }]
console.log(movieFilterManager.applyFiltersValue([{ type: 'range', filter: 4, filterTo: 5 }])); // No movies found

console.log(movieFilterManager.applySearchValue('Movie2')); // [{ name: 'Movie3', year: 2023, rating: 3, awards: ['award3'] }]
console.log(movieFilterManager.applyFiltersValue([{ type: 'range', filter: 4, filterTo: 5 }])); // [ { name: 'Movie2', year: 2022, rating: 4, awards: [ 'award2' ] } ]
