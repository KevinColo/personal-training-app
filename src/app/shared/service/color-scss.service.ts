import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorScssService {
  // For enabling Portfolio basic with title
  displyBlock = false;

  constructor() {}
  // Set Color
  setColorScheme(color) {
    const href = '/assets/css/' + color + '.css';
    const colorElement = document.getElementById('color');

    if (colorElement) {
      colorElement.innerHTML = '<link href=' + href + ' rel="stylesheet">';
    } else {
      console.warn('Element with ID "color" not found!');
    }
  }

  setFontScheme() {
    const fontElement = document.getElementById('font')
      if (fontElement)
        fontElement.innerHTML =
      '<link href="https://fonts.googleapis.com/css?family=Satisfy" rel="stylesheet">';
  }
}
