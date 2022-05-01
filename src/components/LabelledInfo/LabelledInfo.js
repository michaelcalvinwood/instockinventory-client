import React from 'react';
import './LabelledInfo.scss';
import { Link } from 'react-router-dom';
import chevron from '../../assets/images/icons/chevron_right-24px.svg';

function LabelledInfo({ label, line1, line1To, line2, fixed }) {
    let line1Val;

    if (line1To) {
        line1Val = <Link className="labelled-info__line1To" to={line1To}>
            <p className="labelled-info__line1 labelled-info__line1--link">{line1}</p>
            <img className="labelled-info__chevron" src={chevron} />
        </Link>
    }
    else line1Val = <p className="labelled-info__line1">{line1}</p>;

    if (line1.toString().toUpperCase() === "IN STOCK") {
        line1Val = <p className="labelled-info__line1 labelled-info__line1--in-stock">{line1}</p>;
    } else if (line1.toString().toUpperCase() === "OUT OF STOCK") {
        line1Val = <p className="labelled-info__line1 labelled-info__line1--out-of-stock">{line1}</p>;
    }

    let labelClassName = "labelled-info__label";

    if (!fixed) {
        labelClassName += " labelled-info__label--dynamic";
    }

    return (
        <div className="labelled-info">
            <p className={labelClassName}>{label}</p>
            {line1Val}
            <p className="labelled-info__line2">{line2}</p>
        </div>
    )
}

export default LabelledInfo