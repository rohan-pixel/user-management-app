
````markdown
User Management React App

A modern React application for managing users with CRUD operations, featuring TailwindCSS, FontAwesome icons, responsive design.
````
## Demo

![Screenshot](/public/demo.png)



Features

- User CRUD – Create, Read, Update, Delete users  
- Responsive Design – Mobile-first with hamburger menu and sidebar  
- Search & Pagination – Filter users by name, navigate large lists easily  
- Modern UI – TailwindCSS cards, buttons, and hover effects  
- FontAwesome Icons – Intuitive action icons (view, edit, delete)  


Tech Stack

- Frontend: React 18, React Router v6  
- Styling: TailwindCSS, Glassmorphism effects  
- Icons: FontAwesome  
- HTTP Client: Axios  
- Backend: REST API (mocked or live server on `http://localhost:9000`)  



Installation

1. Clone the repository:

```bash
git clone https://github.com/rohan-pixel/user-management-app.git
cd user-management-react
````

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open in browser: [http://localhost:3000](http://localhost:3000)



Usage

* Add User: Click Add User → Fill form → Submit
* View Users: Navigate to Users → Click eye icon
* Edit User: Click edit icon → Update details → Submit
* Delete User: Click trash icon → Confirm deletion
* Search Users: Use search bar to filter by name
* Pagination: Navigate through user list with prev/next buttons



Project Structure

```
src/
├── Components/
│   ├── Userform/
│   ├── Userlist/
│   ├── Userupdate/
│   └── Userview/
├── Navbar/
├── Services/
│   └── Userservice.js
├── App.js
├── index.js
└── index.css
```

* `Components/` – CRUD components and pages
* `Navbar/` – Responsive navbar with hamburger menu
* `Services/Userservice.js` – Axios API calls
* `index.css` – Tailwind + custom glassmorphism styles



Future Improvements

* Implement Toast Notifications for actions
* Add Dark Mode toggle switch
* Integrate with real backend (Node.js/Express, MongoDB)
* Add user authentication and roles
* Include skeleton loaders and animations



License

This project is licensed under the MIT License.

Made with ❤️ using React, TailwindCSS, and FontAwesome

