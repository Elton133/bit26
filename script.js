document.addEventListener("DOMContentLoaded", () => {
  // Loading animation
  const loader = document.querySelector(".loader");

  // Progress bar
  const progressBar = document.querySelector(".progress-bar");

  // Hide loader after page loads
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 500);
  });

  const landingPage = document.querySelector(".landing-page");
  const content = document.querySelector(".content");
  const scrollIndicator = document.querySelector(".scroll-indicator");

  // Update progress bar as user scrolls
  window.addEventListener("scroll", () => {
    // Calculate how far down the page the user has scrolled
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;

    // Update the width of the progress bar
    progressBar.style.width = scrollPercentage + "%";
  });

  // Only set up key press event if we're on the home page
  if (landingPage) {
    // Function to hide landing page and show content
    function revealContent() {
      // If Vanta effect is active, destroy it before hiding the landing page
      if (window.VANTA && window.vantaEffect) {
        window.vantaEffect.destroy();
      }

      landingPage.classList.add("hidden");

      // Wait for landing page animation to complete before showing content
      setTimeout(() => {
        content.classList.add("visible");
        // Enable scrolling
        document.body.style.overflow = "auto";
        // Show scroll indicator
        scrollIndicator.classList.add("visible");

        // Hide scroll indicator after 5 seconds
        setTimeout(() => {
          scrollIndicator.classList.remove("visible");
        }, 5000);
      }, 800);

      // Remove event listeners after they've been used
      document.removeEventListener("keydown", revealContent);
      document.removeEventListener("click", revealContent);
      document.removeEventListener("touchstart", revealContent);
    }

    // Initially disable scrolling until user interaction
    document.body.style.overflow = "hidden";

    // Add event listeners for key press, click, and touch
    document.addEventListener("keydown", revealContent);
    document.addEventListener("click", revealContent);
    document.addEventListener("touchstart", revealContent);
  } else {
    // If we're not on the home page (e.g., about page), enable scrolling
    document.body.style.overflow = "auto";
  }

  // Add floating effect to elements with class 'floating-text'
  const floatingElements = document.querySelectorAll(".floating-text");

  floatingElements.forEach((element, index) => {
    // Stagger the animation for each element
    element.style.animationDelay = `${index * 0.2}s`;
  });

  // Parallax effect
  const parallaxSections = document.querySelectorAll(".parallax-section");

  function handleParallax() {
    parallaxSections.forEach((section) => {
      const bg = section.querySelector(".parallax-bg");
      const scrollPosition = window.pageYOffset;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      // Check if section is in viewport
      if (
        scrollPosition + window.innerHeight > sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        const yPos = (scrollPosition - sectionTop) * 0.3;
        bg.style.transform = `translateY(${yPos}px)`;
      }
    });
  }

  window.addEventListener("scroll", handleParallax);

  // Popup functionality
  const popupOverlay = document.querySelector(".popup-overlay");
  const popupContent = document.querySelector(".popup-content");
  const popupClose = document.querySelector(".popup-close");
  const popupButton = document.querySelector(".popup-button");
  const popupTitle = document.querySelector(".popup-title");
  const popupSubtitle = document.querySelector(".popup-subtitle");
  const popupBody = document.querySelector(".popup-body");

  // Card data for popups
  const cardData = {
    "what-we-learn": {
      title: "What We Learn",
      subtitle: "Comprehensive Curriculum",
      content: `
          <p>At BIT26, we provide a comprehensive curriculum that covers all aspects of modern web development. Our program is designed to give you both theoretical knowledge and practical skills that are in high demand in the industry.</p>
          
          <p>Our curriculum includes:</p>
          <ul>
            <li><strong>HTML5 & CSS3:</strong> Learn to create structured, semantic markup and modern styling techniques including Flexbox and Grid.</li>
            <li><strong>JavaScript:</strong> Master the fundamentals and advanced concepts of JavaScript, including ES6+ features, DOM manipulation, and asynchronous programming.</li>
            <li><strong>React:</strong> Build dynamic user interfaces with the most popular front-end library in the industry.</li>
            <li><strong>Node.js:</strong> Develop server-side applications using JavaScript.</li>
            <li><strong>Databases:</strong> Work with both SQL and NoSQL databases to store and retrieve data efficiently.</li>
            <li><strong>Version Control:</strong> Learn Git and GitHub for collaborative development and code management.</li>
            <li><strong>Responsive Design:</strong> Create websites that work beautifully across all devices and screen sizes.</li>
            <li><strong>Web Performance:</strong> Optimize your applications for speed and efficiency.</li>
            <li><strong>Testing:</strong> Write unit tests and integration tests to ensure your code works as expected.</li>
          </ul>
          
          <p>Our teaching methodology combines lectures, hands-on workshops, pair programming, and project-based learning to ensure you not only understand concepts but can apply them in real-world scenarios.</p>
          
          <img src="/placeholder.svg?height=300&width=600" alt="Students learning web development" class="popup-image">
          
          <p>By the end of the program, you'll have a solid foundation in web development and the ability to continue learning and adapting to new technologies as they emerge.</p>
        `,
    },
    "our-projects": {
      title: "Our Projects",
      subtitle: "Real-world Applications",
      content: `
          <p>At BIT26, we believe in learning by doing. That's why projects are at the core of our curriculum. Throughout the course, you'll work on a variety of projects that increase in complexity as you build your skills.</p>
          
          <p>Some of the projects our students have built include:</p>
          
          <ul>
            <li><strong>Personal Portfolio Websites:</strong> Showcase your skills and projects with a professionally designed portfolio.</li>
            <li><strong>E-commerce Platforms:</strong> Build fully functional online stores with product listings, shopping carts, and checkout processes.</li>
            <li><strong>Social Media Applications:</strong> Create interactive platforms with user authentication, profiles, and real-time features.</li>
            <li><strong>Data Visualization Dashboards:</strong> Develop interactive dashboards that present complex data in intuitive ways.</li>
            <li><strong>Mobile-First Web Applications:</strong> Design and build applications optimized for mobile devices.</li>
          </ul>
          
          <img src="/placeholder.svg?height=300&width=600" alt="Student project showcase" class="popup-image">
          
          <p>All projects are designed to solve real problems and include features that employers are looking for in new hires. You'll also have the opportunity to work on a capstone project of your choice, allowing you to explore your interests and create something truly unique.</p>
          
          <p>By the time you graduate, you'll have a robust portfolio of projects that demonstrates your abilities to potential employers or clients.</p>
        `,
    },
    community: {
      title: "Our Community",
      subtitle: "Learn, Share, Grow Together",
      content: `
          <p>The BIT26 community is one of our greatest strengths. When you join our program, you become part of a supportive network of learners, alumni, and industry professionals who are passionate about technology and education.</p>
          
          <p>Our community offers:</p>
          
          <ul>
            <li><strong>Peer Learning:</strong> Collaborate with classmates on projects and study groups to deepen your understanding.</li>
            <li><strong>Mentorship:</strong> Connect with experienced developers who can provide guidance and advice.</li>
            <li><strong>Networking Events:</strong> Attend meetups, hackathons, and industry events to build your professional network.</li>
            <li><strong>Alumni Network:</strong> Join our growing alumni community for continued support and opportunities after graduation.</li>
            <li><strong>Online Forums:</strong> Access private discussion boards where you can ask questions, share resources, and engage with the community.</li>
          </ul>
          
          <img src="/placeholder.svg?height=300&width=600" alt="Community meetup" class="popup-image">
          
          <p>We foster an inclusive environment where everyone feels welcome and valued. Our diverse community brings together people from different backgrounds, experiences, and perspectives, creating a rich learning environment for all.</p>
          
          <p>The connections you make at BIT26 often last well beyond the program, providing ongoing support and opportunities throughout your career.</p>
        `,
    },
    "career-paths": {
      title: "Career Paths",
      subtitle: "Your Future in Tech",
      content: `
          <p>A BIT26 education opens doors to a wide range of career opportunities in the tech industry. Our graduates have gone on to work at startups, established tech companies, agencies, and as freelancers.</p>
          
          <p>Common career paths for our graduates include:</p>
          
          <ul>
            <li><strong>Front-End Developer:</strong> Build user interfaces and create engaging user experiences.</li>
            <li><strong>Full-Stack Developer:</strong> Work across the entire web development stack, from databases to user interfaces.</li>
            <li><strong>UX/UI Designer:</strong> Combine technical skills with design principles to create intuitive, user-friendly applications.</li>
            <li><strong>Software Engineer:</strong> Develop complex applications and systems using web technologies.</li>
            <li><strong>Technical Product Manager:</strong> Use your technical knowledge to lead product development teams.</li>
            <li><strong>Freelance Developer:</strong> Work independently with clients on a project basis.</li>
          </ul>
          
          <img src="/placeholder.svg?height=300&width=600" alt="Graduate working in tech" class="popup-image">
          
          <p>Our career services team works with you to prepare for your job search, including resume reviews, interview preparation, and connections to employers in our network. We also provide guidance on freelancing, starting your own business, or continuing your education.</p>
          
          <p>The skills you learn at BIT26 are highly transferable and in-demand, giving you the flexibility to pursue the career path that aligns with your interests and goals.</p>
        `,
    },
    "girl-in-tech": {
      title: "Breaking Barriers in Tech",
      subtitle: "Diversity in BIT26",
      content: `
          <p>In our current BIT26 cohort, we have only one female student who is breaking barriers and challenging stereotypes in the tech industry. This reflects a broader challenge in the tech world, where women remain underrepresented.</p>
          
          <p>Despite being the only girl in the class, she has shown exceptional skills and determination, often outperforming her peers in various projects and challenges. Her presence reminds us of the importance of diversity in tech and the unique perspectives that different individuals bring to problem-solving and innovation.</p>
          
          <img src="/placeholder.svg?height=300&width=600" alt="Women in tech event" class="popup-image">
          
          <p>Some interesting statistics about women in technology:</p>
          
          <ul>
            <li>Women make up only about 25% of the tech workforce globally.</li>
            <li>Female-founded tech startups receive less than 3% of venture capital funding.</li>
            <li>Studies show that diverse teams produce more innovative solutions and better financial results.</li>
            <li>The gender gap in tech begins early, with fewer girls pursuing STEM subjects in school.</li>
          </ul>
          
          <p>At BIT26, we're committed to creating an inclusive environment where everyone can thrive, regardless of gender, background, or identity. We actively work to recruit more women and underrepresented groups into our program and provide support systems to ensure their success.</p>
          
          <p>Our lone female student serves as an inspiration and a reminder that talent knows no gender. We celebrate her courage and look forward to seeing more diversity in future cohorts.</p>
        `,
    },
    "students-collaborating": {
      title: "Collaborative Learning",
      subtitle: "Working Together to Solve Problems",
      content: `
          <p>Collaboration is a cornerstone of the BIT26 learning experience. In the real world, developers rarely work in isolation, and we prepare our students for this reality through collaborative projects and pair programming sessions.</p>
          
          <p>This image captures students working together on a complex web application, combining their skills and knowledge to overcome challenges. Through collaboration, students learn not only technical skills but also important soft skills like communication, teamwork, and giving/receiving feedback.</p>
          
          <img src="/placeholder.svg?height=400&width=700" alt="Students collaborating on a project" class="popup-image">
          
          <p>Benefits of collaborative learning at BIT26:</p>
          
          <ul>
            <li>Exposure to different problem-solving approaches and coding styles</li>
            <li>Development of communication and teamwork skills essential in the workplace</li>
            <li>Deeper understanding of concepts through explaining them to others</li>
            <li>Experience with industry tools and workflows for collaborative development</li>
            <li>Building relationships that often lead to professional opportunities</li>
          </ul>
          
          <p>Our collaborative projects simulate real-world development environments, using tools like Git for version control, project management systems, and code reviews. These experiences prepare students for seamless integration into development teams after graduation.</p>
        `,
    },
    "coding-session": {
      title: "Intensive Coding Sessions",
      subtitle: "Where Theory Meets Practice",
      content: `
          <p>At BIT26, we believe in hands-on learning. Our intensive coding sessions are where concepts come to life and students transform from passive learners to active builders.</p>
          
          <p>During these sessions, instructors guide students through complex coding challenges, helping them apply theoretical knowledge to practical problems. These sessions are designed to push students beyond their comfort zones and build confidence in their abilities.</p>
          
          <img src="/placeholder.svg?height=400&width=700" alt="Students during an intensive coding session" class="popup-image">
          
          <p>Our coding sessions include:</p>
          
          <ul>
            <li><strong>Live Coding:</strong> Instructors demonstrate techniques and best practices in real-time.</li>
            <li><strong>Code Challenges:</strong> Timed exercises that test understanding and problem-solving abilities.</li>
            <li><strong>Debugging Workshops:</strong> Learning to identify and fix common and complex bugs.</li>
            <li><strong>Code Reviews:</strong> Giving and receiving constructive feedback on code quality and structure.</li>
            <li><strong>Hackathons:</strong> Intensive coding events where students build complete projects in a short timeframe.</li>
          </ul>
          
          <p>These sessions create a dynamic learning environment where questions are encouraged, mistakes are viewed as learning opportunities, and breakthroughs are celebrated. The skills developed during these sessions—focus, persistence, and creative problem-solving—are as valuable as the technical knowledge gained.</p>
        `,
    },
    "project-presentation": {
      title: "Project Presentations",
      subtitle: "Showcasing Your Work",
      content: `
          <p>The culmination of each major project at BIT26 is a formal presentation where students demonstrate their work to peers, instructors, and sometimes industry professionals. These presentations are a crucial part of the learning experience, helping students develop communication skills and confidence in presenting technical concepts.</p>
          
          <p>During project presentations, students:</p>
          
          <ul>
            <li>Explain the problem their project solves and why it matters</li>
            <li>Demonstrate key features and functionality</li>
            <li>Discuss technical challenges and how they were overcome</li>
            <li>Share lessons learned and areas for future improvement</li>
            <li>Answer questions and receive feedback</li>
          </ul>
          
          <img src="/placeholder.svg?height=400&width=700" alt="Student presenting their project" class="popup-image">
          
          <p>These presentations simulate the types of demonstrations developers often give in professional settings, whether pitching to clients, updating stakeholders, or sharing work with team members. The ability to clearly communicate technical concepts to both technical and non-technical audiences is a valuable skill that sets our graduates apart.</p>
          
          <p>Project presentations also serve as milestones that help students recognize their progress and growth throughout the program. Each presentation builds confidence and prepares students for technical interviews and professional presentations in their future careers.</p>
        `,
    },
  };

  // Function to open popup with specific content
  function openPopup(cardId) {
    const cardInfo = cardData[cardId];

    if (cardInfo) {
      popupTitle.textContent = cardInfo.title;
      popupSubtitle.textContent = cardInfo.subtitle;
      popupBody.innerHTML = cardInfo.content;

      popupOverlay.classList.add("active");

      // Prevent scrolling of the background
      document.body.style.overflow = "hidden";
    }
  }

  // Function to close popup
  function closePopup() {
    popupOverlay.classList.remove("active");

    // Re-enable scrolling
    document.body.style.overflow = "auto";
  }

  // Add click event listeners to all cards
  const cards = document.querySelectorAll(
    ".info-card, .funfact-card, .gallery-item"
  );
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const cardId = card.getAttribute("data-card");
      openPopup(cardId);
    });
  });

  // Close popup when close button is clicked
  if (popupClose) {
    popupClose.addEventListener("click", closePopup);
  }

  // Close popup when button in footer is clicked
  if (popupButton) {
    popupButton.addEventListener("click", closePopup);
  }

  // Close popup when clicking outside the content
  if (popupOverlay) {
    popupOverlay.addEventListener("click", (e) => {
      if (e.target === popupOverlay) {
        closePopup();
      }
    });
  }

  // Close popup when ESC key is pressed
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popupOverlay.classList.contains("active")) {
      closePopup();
    }
  });
});
