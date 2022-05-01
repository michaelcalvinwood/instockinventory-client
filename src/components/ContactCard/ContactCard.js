import React from 'react';
import './ContactCard.scss';

function ContactCard({ title, line1, line2 }) {
  return (
    <div className='contact-card'>
      <p className='contact-card__title'>{title}</p>
      <p className='contact-card__line1'>{line1}</p>
      <p className='contact-card__line2'>{line2}</p>
    </div>
  )
}

export default ContactCard;