# 🚀 Micro-Task & Earning Platform - Client Side 🌐

## Live Demo:
[https://microjob-website.netlify.app]

## GitHub Repository (Client-Side):
[https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-mdtanvirislamrakib]

## Admin & Test User Credentials:
* **Admin Email:** [tanvirislamrakib93@gmail.com]
* **Admin Password:** [A@a123456]
* **Sample Buyer Email:** [rakib7@gmail.com]
* **Sample Buyer Password:** [A@Aa123456]
* **Sample Worker Email:** [tahsin@gmail.com]
* **Sample Worker Password:** [A@a123456]

---

## 🌟 Project Overview
This repository hosts the dynamic and fully responsive client-side of the **Micro-Task & Earning Platform**. Designed to bridge the gap between those who need small tasks done and those looking to earn by completing them, this application features intuitive interfaces for Workers, Buyers, and Admins. Built with modern React and a strong emphasis on user experience, this platform demonstrates robust authentication, real-time data handling, and a seamless payment system.

## ✨ Key Features & Functionalities

This platform offers a comprehensive suite of features, showcasing advanced front-end development skills:

* **Adaptive Responsive Design:** Crafted with Tailwind CSS and `react-responsive`, ensuring a flawless and consistent user experience across all devices – mobile, tablet, and desktop, including a fully adaptive dashboard layout.
* **Immersive Homepage Experience:** Features engaging animations powered by `lottie-react` and `motion`, a dynamic hero section with `react-responsive-carousel` or `swiper` for captivating banners, a curated "Best Workers" display, and a testimonials section to build trust.
* **Secure & Flexible Authentication:** Implements a robust user authentication system using `firebase` for streamlined Google Sign-In and traditional email/password login. `react-hook-form` ensures efficient form handling and input validation for secure registration (with role selection and default coin assignment) and login. Post-authentication, users are seamlessly redirected to their role-specific dashboards, maintaining state across page reloads.
* **Intelligent Role-Based Dashboards:** Each user role (Worker, Buyer, Admin) is presented with a unique, feature-rich dashboard. Navigation and available functionalities are dynamically rendered based on the authenticated user's role, ensuring a tailored and secure experience.
* **Comprehensive Buyer Management Suite:** Buyers have dedicated tools to:
    * **Add New Tasks:** Create detailed micro-tasks with input validation, including image uploads via `imgBB` integration.
    * **Manage My Tasks:** View, update, and delete their posted tasks with real-time coin refunds for uncompleted tasks.
    * **Review Submissions:** Efficiently review pending worker submissions, with options to approve (rewarding workers) or reject (re-listing tasks) via interactive modals.
    * **Seamless Coin Purchase:** Integrate with Stripe (`@stripe/react-stripe-js`) for secure coin purchases, enhancing user capabilities on the platform.
    * **Transparent Payment History:** A clear overview of all past payment transactions.
* **Empowering Worker Tools:** Workers are equipped with features to:
    * **Discover Tasks:** Browse a dynamic list of available tasks, with comprehensive details and calls to action.
    * **Task Submission:** Submit completed tasks with required proof/details through a dedicated form.
    * **Track Submissions:** Monitor the status of all their submitted tasks (pending, approved, rejected) with clear visual indicators.
    * **Efficient Withdrawals:** Request coin withdrawals based on a transparent business logic (20 coins = $1, min 200 coins). The withdrawal form dynamically updates and validates based on available coins.
* **Powerful Admin Control Panel:** Administrators gain full oversight with functionalities to:
    * **User Management:** View all users, update their roles (Admin, Buyer, Worker), and remove accounts, ensuring platform integrity.
    * **Task Oversight:** Monitor and delete any task on the platform.
    * **Withdrawal Processing:** Review and approve pending withdrawal requests, managing coin deductions.
* **Real-time Notifications (Architected):** A notification bell powered by `react-icons` provides unread counts and a floating pop-up for messages. Notifications are designed to inform users about critical events (e.g., submission approvals/rejections, withdrawal status, new submissions). *Note: While the client-side UI and fetching mechanism are integrated, the real-time event pushing for instant updates is an area for future enhancement.*
* **Optimized Data Fetching:** Utilizes `@tanstack/react-query` for efficient data fetching, caching, and synchronization, providing a smooth and responsive user interface even with frequent data updates.
* **Enhanced User Feedback:** Integrates `react-hot-toast` for subtle, non-intrusive notifications and `sweetalert2` for more prominent, interactive alerts and confirmations, enhancing user interaction and feedback loops.
* **Scalable List Management:** Implements `react-paginate` on critical lists (e.g., Worker's My Submission page) to ensure efficient loading and navigation for large datasets.

## 🛠️ Technologies Used (Client-Side)

* **React.js (v19.1.0):** Core JavaScript library for building the UI.
* **React Router (v7.6.3):** For declarative routing within the single-page application.
* **TanStack Query (v5.83.0):** Powerful data fetching and state management library.
* **Axios (v1.10.0):** Promise-based HTTP client for API requests.
* **Firebase (v11.10.0):** For authentication (Google Sign-In) and potentially other services.
* **Tailwind CSS (v4.1.11) & @tailwindcss/vite (v4.1.11):** Utility-first CSS framework for rapid styling.
* **Lottie React (v2.4.1) & Motion (v12.23.3):** For smooth and engaging animations.
* **Lucide React (v0.525.0):** A beautiful, open-source icon library.
* **React Hook Form (v7.60.0):** Flexible and performant form validation.
* **React Hot Toast (v2.5.2):** Lightweight and easy-to-use toast notifications.
* **React Icons (v5.5.0):** Popular icon library for UI elements.
* **React Paginate (v8.3.0):** Component for pagination.
* **React Responsive (v10.0.1):** Media query components for responsive design.
* **React Responsive Carousel (v3.2.23):** For image/content sliders.
* **React Spinners (v0.17.0):** Collection of loading spinner components.
* **SweetAlert2 (v11.22.2) & SweetAlert2 React Content (v5.1.0):** Customizable JavaScript alerts and pop-ups.
* **Swiper (v11.2.10):** Modern touch slider.
* **Stripe React.js (v3.7.0):** Official Stripe React components for payment integration.

## 🚀 Getting Started

To get the client-side application running locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-mdtanvirislamrakib
    cd b11a12-client-side-mdtanvirislamrakib
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Create a `.env` file:**
    In the root of the client-side directory, create a `.env` file and add your environment variables.
    ```
    VITE_API_URL=http://localhost:3000 # Or your deployed backend URL
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_firebase_app_id
    VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
    VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will typically be accessible at `http://localhost:5173`.

## 🤝 Contributing
Contributions are highly encouraged! If you'd like to contribute, please fork the repository, create a new branch, and submit a pull request with your enhancements.

## 🔮 Future Enhancements
* **Real-time Notifications:** Implement WebSockets (e.g., Socket.IO) for instant, real-time notification delivery without polling.
* **Automated Email Notifications:** Integrate services like SendGrid or AWS SES for automated email alerts (e.g., task approval, payment confirmation).
* **Advanced Task Filtering & Search:** Enhance task discovery with comprehensive search and filtering options based on criteria like task type, deadline, and reward amount.
* **Reporting System:** Develop a robust reporting mechanism for invalid submissions or user misconduct for admin review.

## 📧 Contact
For any inquiries or collaborations, please feel free to reach out by opening an issue on this repository.