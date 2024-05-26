### External Dependencies
- **chart.js && react-charjs-2:**
  - Used them for rendering out a pie chart and a bar chart inside **Chart Data** tab in Admin dashboard.
  - path in code: '/aap/components/chartData.tsx'
- **react-table:**
  - Used it for rendering out a DataTable in **Table Data** tab in Admin dashboard.
  - path in code: '/aap/components/tableData.tsx'
- **next-themes:**
  - Used it for Setting dark and light theme accross the website
  - path in code where used: '/aap/layout.tsx'
  - path in code where implemented:'/aap/components/header.tsx'
- **next-auth:**
  - Used it for user authentication e.e. Login and logout accross the website
  - path in code where used: '/aap/components/loginForm.tsx'
  - path in code where implemented: '/auth.ts'
  - path in code for sessionProvider:   '/app/component/client-sessionProvider.tsx'
- **axios:**
  - Used it fetch data from the API
  - path in code: '/services/products.ts'
### Requirements Fullfillment
- **Project Setup**
  - ✅ **Create a basic NextJS project.**
  - ✅ **Configure TypeScript support in the project.**
  - ✅ **Install and configure Tailwind CSS for styling.**

- **Authentication and authorization**
  - ✅ **Implement a user authentication system using a library like NextAuth.js or JWT (JSON Web Tokens).**

- **Routing and navigation**
  - ✅ **Set up a navigation system using Next.js routing.**
  - ✅ **Create a navigation menu or sidebar to navigate between different sections of the admin dashboard. Two sample pages should be enough:**
    - 💡 Implemented on '/' directory instead of admin.
  - ✅ **Highlight the active page or section in the navigation menu.**

- **State management with useState**
  - ✅ **Use the useState hook to manage local state within components.**
  - ✅ **Identify areas where state is needed, such as toggling a sidebar, managing form inputs, or controlling UI elements.**
  - ✅ **Implement state management using useContext hook or redux-toolkit:**
     - 💡 I used 'useContext' in the project.

- **Dashboard overview**
  - ✅ **Fetch and display relevant data from https://dummyjson.com/products.**
  - ✅ **Design a dashboard overview page that displays key metrics (Average Rating of all the products), charts (count of products by category), and a table (table with columns title, description, price, category, brand, stock, and thumbnail):**
    - 💡 I used Tabs instead of displaying them on one single page.
  - ✅ **Use data visualization libraries like Chart.js or React-Vis to present charts and graphs.**

- **Data management and CRUD operations**
  - ✅ **Communicate with the backend API using libraries like Axios or Fetch.**

- **UI components and styling**
  - ✅ **Build reusable UI components like tables, forms, modals, notifications, etc.**
    - 💡 I built a buch of reusable UI components and used them throughout my code, below are some examples:
      -  _toast message for success_ => displays a toast message after successful operation like update, delet, add,
      just call it and pass what you want it to display like so:
      `<ToastSuccess successMessage="updated record successfuly" />`
      '/aap/components/toastSuccess.tsx'
      -  _toast message for fail_ => displays a toast message after a failed operation like update, delet, add, failed Login,
      just call it and pass what you want it to display like so:
      `<ToastFail failMessage="Error deleting the record" />`
       '/aap/components/toastFail.tsx'
      -  _loading_ => A custom component with built in loading animation, just call it inside your button and pass the text you want to display with the loading animation like so:
      `<button><Loaing text="Login" /></button>`, '/app/components/loading.tsx'

  - ✅ **Apply responsive design principles to ensure a consistent experience across different devices.**
  - ✅ **Utilize Tailwind CSS utility classes and components for styling and layout.**

- **Data filtering and searching**
  - ✅ **Implement filtering and searching functionality for data lists or tables (filter by category and brand).**
  - ✅ **Allow users to apply filters based on specific criteria and search for specific records.**
  - ✅ **Update the displayed data dynamically based on the applied filters or search query.**

- **Deployment and optimization**
  - ✅ **Deploy the admin dashboard application to a hosting platform like Vercel.**
- **Expected Best Practices**
  - ✅ **Adhere to ES6/ES7 coding standards and best practices throughout the project.**
  - ✅ **Write clean and readable code, following proper indentation and formatting conventions.**
  - ✅ **Use meaningful variable and function names that accurately describe their purpose.**
  - ✅ **Follow a consistent and descriptive format for your Git commit messages.**
  - ✅ **Document any external dependencies, libraries, or APIs used in your project, including their purpose and usage.**

## Optional Tasks

- **Authentication and authorization**
  - ✅ **Define different user roles and permissions for accessing different parts of the admin dashboard:**
    - 💡 I defined: Admin, Editor, Viewer, there is a separate dashboards for Admin and Editor, and there is no dashboard for viewer ( to restrict base on user role ).
  - ✅ **Restrict access to certain routes or components based on user roles and permissions.**
    - 💡 I restricted **Signed out users** from accessing **filter** and **search** components.
    - 💡 I protected the routes of dashboards such that no role can access the other role's dashboard.
    - 💡 I also didn't allow **Editor** role to see **Table Data**, **Chart Data**, and **Matrix Data** tab.

- **State management with useState**
  - ✅ **Implement state variables and corresponding update functions using useState in the relevant components.**

- **Data management and CRUD operations**
  - ✅ **Create data management pages for entities such as sample users, products, orders, etc.**
    - 💡 I didn't understand this point, but my '/' route displays all the data fetched from the API, with dynamic routing implemented, you can actually visit separate products on separate pages.
  - ✅ **Implement CRUD (Create, Read, Update, Delete) functionality for these entities.**
    - 💡 I suppose it's known that the chosen API does not support full-fledged CRUD Operations, the data will not be persistent, but after adding you can go to the other tabs like **Chart Data** tab to see the added product.
  - ✅ **Use forms and input validation to ensure data integrity.**

- **Theme functionality**
  - ✅ **Implement a theme switcher that allows users to switch between light and dark themes.**
  - ✅ **Use the useState hook to manage the current theme state.**
  - ✅ **Apply different CSS classes or styles based on the selected theme.**
  - ✅ **Persist the theme preference in local storage or cookies for a consistent theme across sessions.**
    - 💡 Used **localStorage** to save the chosen theme.
    - 💡 Detection of **System theme** to apply as first-time-visit theme.

- **Deployment and optimization**
  - ✅ **Optimize the application for performance, including code splitting, lazy loading, and caching.**
    - 💡 I used Next.js' **Image** tag for lazy loading, for caching I edited next.config.js file to add caching header, and for code splitting Next.js handles it automatically, moreover, Next.js handles prefetching of the linked pages in the background.
  - ❌ **Implement server-side rendering (SSR) or static site generation (SSG) for improved initial loading speed.**

