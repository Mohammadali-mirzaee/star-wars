import styles from '../styles/Header.module.scss'

const Header = ({ search, setSearch, setFilter, filter }) => {

    const onChange = (event) => {
        setSearch(event.target.value.toLowerCase())

    }

    const filterOnchange = (event) => {

        setFilter(event.target.value)
    }

    console.log(search)

    return (

        <header id={styles.header}>


            <div>
                <select value={filter} onChange={filterOnchange} >
                    <option value='Episode'>Episode</option>
                    <option value='Year'>Year</option>


                </select>
                <input type="text" onChange={onChange}
                    value={search} placeholder="Type to search" />

            </div>



        </header>
    )
}
export default Header;