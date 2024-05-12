interface MatchFilter {
  type: 'match';
  filter: string;
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
type MovieFilter = MatchFilter | RangeFilter | ValueSearchFilter;

interface Movie {
  title: string;
  year: number;
  rating: number;
  awards: string[];
}

interface MovieCategory {
  name: string;
  movies: Movie[];
}

interface MovieCategoryList {
  list: MovieCategory[];
  filters:
    | Extract<MovieFilter, { type: 'match' }>[]
    | Extract<MovieFilter, { type: 'range' }>[]
    | Extract<MovieFilter, { type: 'valueSearch' }>[];
}
interface MovieList {
  list: Movie[];
  filters:
    | Extract<MovieFilter, { type: 'match' }>[]
    | Extract<MovieFilter, { type: 'range' }>[]
    | Extract<MovieFilter, { type: 'valueSearch' }>[];
}

type ApplySearchValue = (
  movieList: MovieList | MovieCategoryList,
  searchValue: string
) => MovieList | MovieCategoryList;

type ApplyFiltersValue = (
  movieList: MovieList | MovieCategoryList,
  filters: MovieFilter[]
) => MovieList | MovieCategoryList;
