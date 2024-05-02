import React from 'react';
import './LoadingSpinner.css'; // Importa el archivo CSS para los estilos

export default function LoadingSpinner() {
    return (
        <div className="loading-spinner">
            {/* Círculo giratorio */}
            <div className="spinner-circle"></div>
        </div>
    );
}
