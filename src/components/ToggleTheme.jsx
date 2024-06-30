import { Switch } from "@nextui-org/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const ToogleTheme = ({ theme, switchTheme }) => {
    return (
        <>
        <Switch
            defaultSelected
            size="md"
            color="success"
            startContent={<FontAwesomeIcon icon={faSun} />}
            endContent={<FontAwesomeIcon icon={faMoon} />}
            isSelected={theme === 'dark'}
            onChange={switchTheme}
        >    
        </Switch>
        </>
    )
};

export default ToogleTheme;