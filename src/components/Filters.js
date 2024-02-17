import { useGenres } from "../hooks/useGenres";

const Filters = (props) => {
    const { genres } = useGenres();

    const handleOnChange = (value) => {
        console.log(value)
    }

    return (
        <>
            <section>
                <ul>
                    <li> 
                        <select onChange={(e) => {handleOnChange(e.target.value)}}>
                        {genres.map((genero) => (
                            <option key={genero.id} value={genero.id}>{genero.name}</option> 
                        ))}
                        </select>
                    </li>    
                </ul>
            </section>
            {props.children}
        </>
    )
}

export default Filters