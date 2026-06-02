import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import emailjs from "@emailjs/browser";

import hero from "./assets/hero.jpg";
import logo from "./assets/logo.png";
import madhan from "./assets/madhan.png";

import project1 from "./assets/projects/project1.jpg";
import project2 from "./assets/projects/project2.jpg";
import project3 from "./assets/projects/project3.jpg";
import project4 from "./assets/projects/project4.jpg";

export default function App() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [location, setLocation] = useState("");
  const [workType, setWorkType] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "leads"), {
        name,
        mobile,
        customerEmail,
        location,
        workType,
        message,
        status: "New Lead",
        createdAt: new Date(),
      });

      await emailjs.send(
        "service_jt549ne",
        "template_g5mi1sb",
        {
          name,
          mobile,
          customer_email: customerEmail,
          location,
          workType,
          message,
        },
        "OqhH0yDj7b3H3bhj0"
      );

      alert("Enquiry Submitted Successfully!");

      setName("");
      setMobile("");
      setCustomerEmail("");
      setLocation("");
      setWorkType("");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Error submitting enquiry");
    }
  };

  return (
    <div style={pageStyle}>
      <nav style={navStyle}>
        <img src={logo} alt="Mahaan Interiors" style={logoStyle} />

        <div style={navLinksWrapper}>
          <a href="#home" style={navLink}>Home</a>
          <a href="#about" style={navLink}>About</a>
          <a href="#services" style={navLink}>Services</a>
          <a href="#projects" style={navLink}>Projects</a>
          <a href="#contact" style={navLink}>Contact</a>
          <a href="#reviews" style={navLink}>Reviews</a>
        </div>
      </nav>

      <section id="home" style={heroStyle}>
        <div style={heroContent}>
          <h1 style={heroTitle}>
            Designing Dreams
            <br />
            Into <span style={{ color: "#D4AF37" }}>Reality</span>
          </h1>

          <p style={heroText}>
            Luxury Interior Design for Apartments, Villas and Premium Homes in Hyderabad.
          </p>

          <div style={buttonWrapper}>
            <a href="#contact" style={goldButton}>Book Free Consultation</a>
            <a href="#projects" style={outlineButton}>View Projects</a>
          </div>
        </div>
      </section>

      <section style={statsSection}>
        <div><h2 style={statNumber}>80+</h2><p>Projects Completed</p></div>
        <div><h2 style={statNumber}>8+</h2><p>Years Experience</p></div>
        <div><h2 style={statNumber}>100%</h2><p>Client Satisfaction</p></div>
      </section>

      <section id="about" style={sectionStyle}>
        <h2 style={sectionTitle}>About Mahaan Interiors</h2>

        <p style={centerText}>
          Mahaan Interiors specializes in premium home interiors, modular kitchens,
          wardrobes, false ceilings and complete turnkey interior solutions across Hyderabad.
        </p>

        <div style={founderWrapper}>
          <img src={madhan} alt="Mahaan Madhan" style={founderImage} />

          <div style={founderText}>
            <h3 style={goldHeading}>Meet Mahaan Madhan</h3>
            <p style={paragraphStyle}>
              Founder of Mahaan Interiors with 18+ years of experience in sales,
              client management and interior design execution. Having completed around
              80 interior projects across Hyderabad, Mahaan Interiors focuses on premium
              living spaces, modular kitchens, wardrobes and turnkey home interiors.
            </p>
          </div>
        </div>
      </section>

      <section id="services" style={sectionStyle}>
        <h2 style={sectionTitle}>Our Services</h2>

        <div style={cardsGrid}>
          {[
            "Turnkey Full Home",
            "Modular Kitchens",
            "Only Wood Work",
            "Wardrobes",
            "False Ceilings",
            "Remodeling Work",
          ].map((item) => (
            <div key={item} style={serviceCard}>
              <h3>{item}</h3>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" style={sectionStyle}>
        <h2 style={sectionTitle}>Featured Projects</h2>

        <div style={galleryGrid}>
          {[project1, project2, project3, project4].map((img, index) => (
            <div key={index} style={galleryCard}>
              <img src={img} alt={`Project ${index + 1}`} style={galleryImage} />
            </div>
          ))}
        </div>
      </section>

      <section id="reviews" style={sectionStyle}>
        <h2 style={sectionTitle}>Customer Reviews</h2>

        <div style={reviewsGrid}>
          {[
            {
              name: "Mr. Srinivas Reddy",
              location: "Miyapur",
              review:
                "Mahaan Interiors completed our home interiors with very good finishing. The design suggestions and execution quality were excellent.",
            },
            {
              name: "Mrs. Sirisha",
              location: "Ameenpur",
              review:
                "We are very happy with the modular kitchen and wardrobes. The team explained everything clearly and delivered as promised.",
            },
            {
              name: "Mr. Avinash",
              location: "Ramky Harmony Hyderabad",
              review:
                "Professional team, good material quality and neat work. Mahaan Interiors gave our flat a premium look.",
            },
          ].map((item, index) => (
            <div key={index} style={reviewCard}>
              <h3 style={{ color: "#D4AF37" }}>{item.name}</h3>
              <p style={{ color: "#aaa" }}>{item.location}</p>
              <p style={paragraphStyle}>“{item.review}”</p>
              <div style={{ color: "#D4AF37", fontSize: "22px" }}>★★★★★</div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" style={sectionStyle}>
        <h2 style={sectionTitle}>Request Free Design Consultation</h2>

        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            style={inputStyle}
            required
          />

          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Mobile Number"
            style={inputStyle}
            required
          />

          <input
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            placeholder="Email Address"
            type="email"
            style={inputStyle}
          />

          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Project Location"
            style={inputStyle}
          />

          <select
            value={workType}
            onChange={(e) => setWorkType(e.target.value)}
            style={inputStyle}
            required
          >
            <option value="">Select Work Type</option>
            <option value="Turnkey Full Home">Turnkey Full Home</option>
            <option value="Small Box Work">Small Box Work</option>
            <option value="Only Wood Work">Only Wood Work</option>
            <option value="Remodeling Work">Remodeling Work</option>
            <option value="Partial Work">Partial Work</option>
            <option value="Kitchen Only">Kitchen Only</option>
            <option value="Wardrobe Only">Wardrobe Only</option>
          </select>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Project Details"
            rows="5"
            style={inputStyle}
          />

          <button type="submit" style={goldButton}>Submit Enquiry</button>
        </form>

        <p style={{ color: "#ccc", marginTop: "30px" }}>
          Call: +91 88018 61086
        </p>
      </section>

      <a
        href="https://wa.me/918801861086"
        target="_blank"
        rel="noreferrer"
        style={whatsappButton}
      >
        WhatsApp
      </a>
    </div>
  );
}

const pageStyle = {
  backgroundColor: "#0B0B0B",
  color: "white",
  minHeight: "100vh",
  fontFamily: "Arial, sans-serif",
};

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "18px 60px",
  position: "fixed",
  width: "100%",
  top: 0,
  background: "rgba(0,0,0,0.82)",
  backdropFilter: "blur(10px)",
  zIndex: 1000,
  boxSizing: "border-box",
};

const logoStyle = {
  height: "90px",
  objectFit: "contain",
};

const navLinksWrapper = {
  display: "flex",
  gap: "26px",
  flexWrap: "wrap",
};

const navLink = {
  color: "white",
  textDecoration: "none",
  fontSize: "15px",
};

const heroStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  textAlign: "left",
  padding: "120px 8% 60px",
  backgroundImage: `
    linear-gradient(
      rgba(0,0,0,0.55),
      rgba(0,0,0,0.75)
    ),
    url(${hero})
  `,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

const heroContent = {
  maxWidth: "850px",
  marginLeft: "70px",
};

const heroTitle = {
  fontFamily: "Playfair Display, serif",
  fontSize: "clamp(56px, 6vw, 95px)",
  lineHeight: "1.02",
  fontWeight: "700",
  color: "#ffffff",
  marginBottom: "28px",
  textShadow: "0 6px 30px rgba(0,0,0,0.7)",
};

const heroText = {
  fontSize: "clamp(24px, 3vw, 42px)",
  color: "#f5f5f5",
  lineHeight: "1.45",
  maxWidth: "800px",
  marginBottom: "30px",
};

const buttonWrapper = {
  marginTop: "30px",
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
};

const goldButton = {
  background: "#D4AF37",
  color: "#000",
  border: "none",
  padding: "15px 30px",
  borderRadius: "30px",
  fontWeight: "bold",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
};

const outlineButton = {
  background: "transparent",
  color: "#D4AF37",
  border: "1px solid #D4AF37",
  padding: "15px 30px",
  borderRadius: "30px",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
};

const statsSection = {
  display: "flex",
  justifyContent: "center",
  gap: "70px",
  flexWrap: "wrap",
  padding: "80px 20px",
  textAlign: "center",
  background: "#101010",
};

const statNumber = {
  color: "#D4AF37",
  fontSize: "48px",
  margin: 0,
};

const sectionStyle = {
  padding: "90px 10%",
  textAlign: "center",
};

const sectionTitle = {
  color: "#D4AF37",
  fontSize: "40px",
  marginBottom: "30px",
};

const centerText = {
  color: "#cccccc",
  lineHeight: "1.8",
  maxWidth: "900px",
  margin: "0 auto 60px",
};

const founderWrapper = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "50px",
  flexWrap: "wrap",
  textAlign: "left",
};

const founderImage = {
  width: "300px",
  height: "300px",
  objectFit: "cover",
  borderRadius: "20px",
  border: "3px solid #D4AF37",
};

const founderText = {
  maxWidth: "600px",
};

const goldHeading = {
  color: "#D4AF37",
  fontSize: "30px",
};

const paragraphStyle = {
  color: "#cccccc",
  lineHeight: "1.8",
};

const cardsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "25px",
};

const serviceCard = {
  background: "#151515",
  padding: "30px",
  borderRadius: "16px",
  border: "1px solid #222",
};

const galleryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "25px",
};

const galleryCard = {
  borderRadius: "18px",
  overflow: "hidden",
  border: "1px solid #333",
  background: "#151515",
};

const galleryImage = {
  width: "100%",
  height: "280px",
  objectFit: "cover",
  display: "block",
};

const formStyle = {
  maxWidth: "600px",
  margin: "30px auto 0",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const inputStyle = {
  padding: "15px",
  borderRadius: "10px",
  border: "1px solid #333",
  background: "#151515",
  color: "white",
  fontSize: "16px",
};

const whatsappButton = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  background: "#25D366",
  color: "white",
  padding: "15px 20px",
  borderRadius: "50px",
  textDecoration: "none",
  fontWeight: "bold",
  zIndex: 2000,
};

const reviewsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "25px",
};

const reviewCard = {
  background: "#151515",
  padding: "30px",
  borderRadius: "18px",
  border: "1px solid #333",
  textAlign: "left",
};