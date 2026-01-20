import React from 'react';
import './Card.css';

export interface CardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, description, children }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
      {children && <div className="card-content">{children}</div>}
    </div>
  );
};
