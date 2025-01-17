import React from 'react';
import { FaCheckCircle   } from 'react-icons/fa';
import { RxCrossCircled   } from 'react-icons/rx';


interface HealthCheckBoxProps {
    Title: string;
    isCheck: boolean;
}

const HealthCheckBox: React.FC<HealthCheckBoxProps> = ({ Title, isCheck }) => {
    const cardStyle = {
        border: "1px solid #ddd",
        padding: "20px",
        margin: "20px",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "50%" // Set the width to 50% of the containing container
    };

    return (
        <div style={cardStyle}>
            <span style={{ fontSize: "1.5rem", marginRight: "10px" }}>{Title}:</span>
            {isCheck ? <FaCheckCircle size={40} color='green' /> : <RxCrossCircled size={40} color='red' />}
        </div>
    );
};

export default HealthCheckBox;