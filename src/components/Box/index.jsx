
import styles from './Box.module.scss';

const Box = ({ handleClick, value }) =>
{

    return (
        <div onClick={handleClick} className={styles.wrapper}>
            {value}
        </div>
    );
}

export default Box;