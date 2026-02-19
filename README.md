# 🔐 Authentication Flow
The app uses a stateless authentication strategy:

- **Login**: User credentials are verified against MongoDB.  
- **Token Issue**: The server generates a JWT and sends it to the frontend.  
- **Storage**: The token is stored on the client side and attached to the `Authorization` header as a Bearer token for all subsequent API requests.  
- **Authorization**: Custom backend middleware validates the token and checks user roles (**Student** vs. **Recruiter**) before granting access to specific endpoints.  

---

# 🚀 Key Technical Features
- **Role-Based Dashboards**: Completely different user experiences for hiring managers and job seekers.  
- **State Management**: Utilized Redux for predictable state transitions, especially useful for the multi-step job application process.  
- **Image Hosting**: Offloaded heavy media assets to Cloudinary to maintain a lightweight database and fast load times.  
- **Responsive Styling**: Built with Tailwind CSS to ensure a professional look across desktops, tablets, and mobile devices.  
