import './style.scss'
import './projects.scss'

import Typed from 'typed.js';

document.addEventListener('DOMContentLoaded', () => {
    new Typed('#element', {
        strings: ['web^50site ^150 under ^200 co^20nstru^50ction'],
        typeSpeed: 50,
        startDelay: 1500,
    });
});
