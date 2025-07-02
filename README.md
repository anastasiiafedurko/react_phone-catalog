# 📱 React Phone Catalog

This is a fully functional responsive front-end e-commerce catalog built with **React + TypeScript**.  
The app includes dynamic routing, reusable components, global state with Context API, pagination, sorting, localStorage support, and smooth UI effects.

✅ **All required features have been implemented.**

### 🔗 Live Demo

[View on GitHub Pages](https://anastasiiafedurko.github.io/react_phone-catalog)

---

## ✅ Features Implemented

- **Project structure**

  - All components organized in folders inside `src/components` and `src/modules`
  - CSS Modules used for styling
  - Page-based module architecture (HomePage, CartPage, etc.)

- **General layout**

  - Sticky header with logo, navigation, cart, and favorites
  - Footer with GitHub link and "Back to top" button
  - Smooth scrolling and hover effects
  - All images scale by 10% on hover

- **Home Page** (`/`)

  - Hidden `<h1>` for accessibility
  - Auto-rotating PicturesSlider with navigation and dots
  - ProductsSlider for "Hot prices" and "Brand new" blocks
  - Shop by category section

- **Category Pages** (`/phones`, `/tablets`, `/accessories`)

  - Products are fetched based on category
  - Loader and error states implemented
  - Sorting by Newest, Alphabetically, Cheapest
  - Pagination and items-per-page selector
  - Parameters saved in URL (e.g. `?sort=age&page=2&perPage=8`)

- **Product Details Page** (`/:category/:productId`)

  - Loads product data and shows loading/404 states
  - Image selection, color, and capacity options
  - Breadcrumbs and back button
  - "You may also like" block with random suggestions

- **Shopping Cart** (`/cart`)

  - Items can be added, removed, and quantity updated
  - Total amount and quantity calculated dynamically

- **Favorites Page** (`/favorites`)
  - Products can be added/removed from favorites via heart icon
  - Favorites stored in Context

---

## 🛠 Stack

- **React + TypeScript**
- **Tailwind CSS**
- **React Router v6**
- **Context API**
- **Figma** (UI implementation)
- **GitHub Pages** for deployment

---

## 📁 Local Setup

```bash
git clone https://github.com/anastasiiafedurko/react_phone-catalog.git
cd react_phone-catalog
npm install
npm run dev

```
