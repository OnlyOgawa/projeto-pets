import styles from './Select.module.css'

function Select({text, name, options, handleOnChange, value}) {
    return (
        <div className={styles.form_control}>
            <labe htmlFor={name}>{text}:</labe>
            <select
            name={name}
            id={name}
            onChange={handleOnChange}
            value={value || ''}>
                <option>Selecione uma opcao</option>
                {options.map((option) => (
                    <option value={option} key={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Select