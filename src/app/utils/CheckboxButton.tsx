import React, { useState } from "react";
import "../styles/_button.scss";

const getUniqueId = (() => {
    const now = Date.now();
    let seed = 0;
    return () => `checkbox-button-${now}-${seed++}`;
})();

const CheckboxButton = ({ value, labelUnselect, labelSelect, id, typeId, action }) => {
    
    const uid = getUniqueId();

    const [checked, setChecked] = useState(value);

    function handleChange(e) {
        debugger;
        setChecked(e.target.checked);
        action(e, id, typeId);
    }

    const cls = `checkbox-button ${checked ? "checkbox-button-checked bg-success" : "bg-primary"}`;

    return (
        <div className="checkbox-button-wrapper">
        <input
            type="checkbox"
    checked={value}
    id={id}
    className="checkbox-button-hidden"
    onChange={handleChange}
    />
    <label htmlFor={id} className={cls}>
        {checked ? labelSelect : labelUnselect}
        </label>
        </div>
);
};

export default CheckboxButton;
