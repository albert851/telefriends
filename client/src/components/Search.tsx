import React, {FC} from 'react'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SearchProps{
  setSearchValue:any
}

const Search: FC <SearchProps> = ({setSearchValue}) => {
  const handleSearch = (ev:any) => {

    setSearchValue(ev.target.value)
  }
  return (
    <input onInput={handleSearch} className='search' type={"text"} placeholder={`🔍 Search`} />
  )
}

export default Search