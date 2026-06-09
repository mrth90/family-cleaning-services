import {
  ArrowRight,
  Building2,
  CalendarCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Home,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { Navigate, Route, Routes } from "react-router-dom";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import heroImage from "./assets/cleaning-hero.png";
import {
  type ContactRequest,
  submitContactRequest,
} from "./services/contactService";

const navItems = [
  ["Home", "#home"],
  ["Services", "#services"],
  ["About Us", "#about"],
  ["Why Choose Us", "#why-us"],
  ["Testimonials", "#testimonials"],
  ["Contact", "#contact"],
];

const services = [
  {
    icon: Home,
    title: "Residential Cleaning",
    description: "Reliable regular home cleaning services tailored to your space.",
  },
  {
    icon: Building2,
    title: "Commercial Cleaning",
    description: "Consistent office and business cleaning for productive workplaces.",
  },
  {
    icon: Sparkles,
    title: "Deep Cleaning",
    description: "Detailed intensive cleaning for kitchens, bathrooms, and beyond.",
  },
  {
    icon: Truck,
    title: "Move In / Move Out Cleaning",
    description: "Fresh, thorough cleaning before or after your next move.",
  },
];

const benefits = [
  {
    title: "Trusted Team",
    description: "Background checked professionals.",
    icon: ShieldCheck,
  },
  {
    title: "Quality Guaranteed",
    description: "100% customer satisfaction focus.",
    icon: Star,
  },
  {
    title: "Flexible Scheduling",
    description: "Weekly, bi-weekly, monthly.",
    icon: CalendarCheck,
  },
  {
    title: "Transparent Pricing",
    description: "No hidden fees.",
    icon: Check,
  },
  {
    title: "Eco-Friendly Products",
    description: "Safe for children and pets.",
    icon: Leaf,
  },
  {
    title: "Fully Insured",
    description: "Professional and protected.",
    icon: ShieldCheck,
  },
];

const steps = [
  "Contact Us",
  "Receive Your Quote",
  "Schedule Service",
  "Enjoy a Cleaner Space",
];

const testimonials = [
  {
    quote:
      "Excellent service and attention to detail. Our home has never looked better.",
    name: "Sarah M.",
  },
  {
    quote:
      "They are dependable, kind, and incredibly thorough. Our office feels fresh every week.",
    name: "Daniel R.",
  },
  {
    quote:
      "The team treated our home with care and made scheduling simple from start to finish.",
    name: "Marisol G.",
  },
];

function Logo() {
  return (
    <a href="#home" className="logo-mark" aria-label="Family Cleaning Services home">
      <span className="logo-icon" aria-hidden="true">
        <Sparkles size={22} />
      </span>
      <span>
        <strong>Family</strong>
        <small>Cleaning Services</small>
      </span>
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="section-heading">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactRequest>({
    defaultValues: {
      serviceType: "",
      propertySize: "",
    },
  });

  const onSubmit = async (data: ContactRequest) => {
    await submitContactRequest(data);
  };

  const fieldClass = (hasError: boolean) =>
    `form-field ${hasError ? "form-field-error" : ""}`;

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-grid">
        <label>
          Full Name
          <input
            className={fieldClass(Boolean(errors.name))}
            autoComplete="name"
            {...register("name", { required: "Full name is required." })}
          />
          {errors.name ? <small>{errors.name.message}</small> : null}
        </label>

        <label>
          Email
          <input
            className={fieldClass(Boolean(errors.email))}
            type="email"
            autoComplete="email"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email address.",
              },
            })}
          />
          {errors.email ? <small>{errors.email.message}</small> : null}
        </label>

        <label>
          Phone Number
          <input
            className={fieldClass(Boolean(errors.phone))}
            type="tel"
            autoComplete="tel"
            {...register("phone", { required: "Phone number is required." })}
          />
          {errors.phone ? <small>{errors.phone.message}</small> : null}
        </label>

        <label>
          Service Type
          <select
            className={fieldClass(Boolean(errors.serviceType))}
            {...register("serviceType", { required: "Select a service type." })}
          >
            <option value="">Select service</option>
            <option>Residential Cleaning</option>
            <option>Commercial Cleaning</option>
            <option>Deep Cleaning</option>
            <option>Move In / Move Out Cleaning</option>
          </select>
          {errors.serviceType ? <small>{errors.serviceType.message}</small> : null}
        </label>

        <label>
          Property Size
          <input
            className={fieldClass(Boolean(errors.propertySize))}
            placeholder="Example: 3 bedrooms, 2 baths"
            {...register("propertySize", {
              required: "Property size is required.",
            })}
          />
          {errors.propertySize ? <small>{errors.propertySize.message}</small> : null}
        </label>

        <label>
          Preferred Date
          <input
            className={fieldClass(Boolean(errors.preferredDate))}
            type="date"
            {...register("preferredDate", {
              required: "Preferred date is required.",
            })}
          />
          {errors.preferredDate ? (
            <small>{errors.preferredDate.message}</small>
          ) : null}
        </label>
      </div>

      <label>
        Message
        <textarea
          className={fieldClass(Boolean(errors.message))}
          rows={5}
          {...register("message", { required: "Message is required." })}
        />
        {errors.message ? <small>{errors.message.message}</small> : null}
      </label>

      <button className="button button-primary form-submit" disabled={isSubmitting}>
        Request Your Free Quote
        <ArrowRight size={18} />
      </button>
    </form>
  );
}

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonial = testimonials[activeTestimonial];
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const nextTestimonial = () =>
    setActiveTestimonial((current) => (current + 1) % testimonials.length);
  const previousTestimonial = () =>
    setActiveTestimonial(
      (current) => (current - 1 + testimonials.length) % testimonials.length,
    );

  return (
    <div className="site-shell">
      <header className="navbar">
        <nav className="nav-inner" aria-label="Main navigation">
          <Logo />
          <button
            className="mobile-menu-button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          <div className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
            {navItems.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
            <a className="button button-primary nav-cta" href="#contact">
              Request a Free Quote
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-media">
            <img
              src={heroImage}
              alt="Professional cleaners making a bright home fresh and tidy"
            />
          </div>
          <div className="hero-overlay" />
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="hero-badge">Family-owned. Fully insured.</span>
            <h1>Your Clean Space Starts Here</h1>
            <p>
              We are a family-owned cleaning company committed to delivering
              reliable, affordable, and professional cleaning services.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">
                Request a Free Quote
                <ArrowRight size={18} />
              </a>
              <a className="button button-secondary" href="#services">
                View Services
              </a>
            </div>
          </motion.div>
        </section>

        <section className="trust-strip" aria-label="Service highlights">
          {[
            "Trusted Professionals",
            "Eco-Friendly Products",
            "Flexible Scheduling",
            "Satisfaction Guaranteed",
          ].map((item) => (
            <div key={item}>
              <Check size={18} />
              <span>{item}</span>
            </div>
          ))}
        </section>

        <section id="services" className="section">
          <SectionHeading
            eyebrow="Our Services"
            title="Cleaning Solutions For Every Space"
            copy="Choose dependable service for your home, office, move, or seasonal deep clean."
          />
          <div className="service-grid">
            {services.map(({ icon: Icon, title, description }) => (
              <motion.article
                className="service-card"
                key={title}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Icon className="card-icon" size={30} />
                <h3>{title}</h3>
                <p>{description}</p>
                <a href="#contact">
                  Learn More
                  <ArrowRight size={16} />
                </a>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="about-image" aria-hidden="true">
            <img src={heroImage} alt="" />
          </div>
          <div className="about-copy">
            <SectionHeading
              eyebrow="About Us"
              title="We Treat Your Home Like Our Own"
            />
            <p>
              Family Cleaning Services is a family-owned company built on trust,
              honesty, and attention to detail. We take pride in helping
              families and businesses maintain clean, healthy environments.
            </p>
            <a className="button button-secondary button-on-light" href="#why-us">
              Learn More
            </a>
          </div>
        </section>

        <section id="why-us" className="section section-tinted">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="The Care You Expect, The Consistency You Need"
          />
          <div className="benefit-grid">
            {benefits.map(({ title, description, icon: Icon }) => (
              <article className="benefit-item" key={title}>
                <Icon size={24} />
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section process-section">
          <SectionHeading eyebrow="How It Works" title="Simple From First Call" />
          <div className="process-grid">
            {steps.map((step, index) => (
              <article className="process-card" key={step}>
                <span>{index + 1}</span>
                <h3>{step}</h3>
                <p>
                  {index === 0 && "Tell us about your space and cleaning goals."}
                  {index === 1 && "Get clear pricing for the service you need."}
                  {index === 2 && "Choose a day and time that works for you."}
                  {index === 3 && "Relax in a cleaner, healthier environment."}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="testimonials" className="section testimonial-section">
          <SectionHeading
            eyebrow="Testimonials"
            title="What Our Customers Say"
          />
          <div className="testimonial-card" aria-live="polite">
            <div className="stars" aria-label="Five star rating">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={20} fill="currentColor" />
              ))}
            </div>
            <blockquote>"{testimonial.quote}"</blockquote>
            <p>- {testimonial.name}</p>
            <div className="carousel-controls">
              <button aria-label="Previous testimonial" onClick={previousTestimonial}>
                <ChevronLeft />
              </button>
              <div>
                {testimonials.map((item, index) => (
                  <button
                    key={item.name}
                    className={index === activeTestimonial ? "dot-active" : ""}
                    aria-label={`Show testimonial ${index + 1}`}
                    onClick={() => setActiveTestimonial(index)}
                  />
                ))}
              </div>
              <button aria-label="Next testimonial" onClick={nextTestimonial}>
                <ChevronRight />
              </button>
            </div>
          </div>
        </section>

        <section className="cta-banner">
          <div>
            <span>Fresh spaces start with one message.</span>
            <h2>Ready For A Cleaner Home?</h2>
          </div>
          <a className="button button-primary" href="#contact">
            Request Your Free Quote
            <ArrowRight size={18} />
          </a>
        </section>

        <section id="contact" className="section contact-section">
          <div className="contact-copy">
            <SectionHeading
              eyebrow="Contact"
              title="Request Your Free Quote"
              copy="Tell us what you need cleaned, and we will prepare a personalized service estimate."
            />
            <div className="contact-details">
              <p>
                <Phone size={18} />
                (555) 012-4588
              </p>
              <p>
                <Mail size={18} />
                info@familycleaningservices.com
              </p>
              <p>
                <MapPin size={18} />
                Residential and commercial service areas
              </p>
              <p>
                <Clock size={18} />
                Monday - Saturday
              </p>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer className="footer">
        <Logo />
        <p>© {currentYear} Family Cleaning Services. All rights reserved.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
