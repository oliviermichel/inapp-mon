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
        padding: "10px",
        margin: "10px",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    };

    return (
        <div style={cardStyle}>
            {Title}: {isCheck ? <FaCheckCircle  size={30} color='green' /> : <RxCrossCircled size={30} color='red' />}
        </div>
    );
};

export default HealthCheckBox;