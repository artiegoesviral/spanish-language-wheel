# Spanish Verb Wheel

An interactive Spanish verb conjugation wheel built with React + Vite.

### Live App
https://artiegoesviral.github.io/spanish-language-wheel/

Users can:

* Spin a draggable verb wheel
* View conjugations in multiple tenses
* Switch between pages of verbs
* Use the app on desktop and mobile
* See English translations in the center panel

---

# Features

## Interactive Verb Wheel
* Smooth drag-based wheel rotation
* Snap-to-selection behavior
* Arrow pointer showing the selected verb
* Upright text labels while rotating

## Conjugation Display
Displays:
* Present tense
* Future tense
* Perfect form
* Indefinite tense

## Pagination
* Supports multiple pages of verbs
* Prevents overcrowding on the wheel

## Mobile Support
* Touch dragging enabled
* Responsive wheel scaling
* Mobile-friendly layout

---

# Tech Stack
* React
* TypeScript
* Vite
* CSS
* GitHub Pages
* GitHub Actions

---

# Installation
Clone the repository:

```bash
git clone https://github.com/artiegoesviral/spanish-language-wheel.git
```

Move into the project:

```bash
cd spanish-language-wheel
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

# Build
Create a production build:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

---

# Deployment
The project is deployed automatically using GitHub Actions.

Pushes to the `main` branch trigger deployment to GitHub Pages.

Deployment workflow file:

```txt
.github/workflows/deploy.yml
```

---

# Project Structure

```txt
src/
├── App.tsx
├── styles.css
├── verbs.tsx
```

## Main Files

### `App.tsx`
Contains:

* Wheel logic
* Rotation handling
* Touch/mouse controls
* Pagination
* Conjugation rendering

### `verbs.tsx`
Contains all Spanish verb data.

### `styles.css`
Contains all styling and responsive layout rules.

---

# Verb Data Structure
Example:

```ts
{
  infinitive: "hablar",
  english: "to speak",

  present: {
    yo: "hablo",
    tú: "hablas"
  },

  future: {
    yo: "hablaré"
  },

  perfect: "hablado",

  indefinite: {
    yo: "hablé"
  }
}
```

---

# Mobile Support
The wheel supports:

* Mouse dragging
* Touch dragging
* Responsive scaling

Mobile interactions use:

```ts
onTouchStart
onTouchMove
onTouchEnd
```

---

# Future Improvements
Potential future additions:

* More verb tenses
* Verb categories
* Search functionality
* Audio pronunciation
* Quiz mode
* User progress tracking
* Backend/database integration
* Dark mode

---

# Author

Qurat-ul-anne Sikander Akhter

