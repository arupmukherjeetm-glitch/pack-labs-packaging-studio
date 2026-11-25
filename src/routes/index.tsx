import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { packageTiers, type PackageTier } from "@/lib/pack-labs-packages";

type PackageId = PackageTier["id"];

type FitQuestion = {
  prompt: string;
  choices: { label: string; packageId: PackageId }[];
};

const fitQuestions: FitQuestion[] = [
  {
    prompt: "Where are you with your product today?",
    choices: [
      { label: "Building a first brand identity", packageId: "start" },
      { label: "Getting a product ready to launch", packageId: "launch" },
      { label: "Bringing a growing range together", packageId: "grow" },
      { label: "Taking the brand into new markets", packageId: "scale" },
    ],
  },
  {
    prompt: "What needs the most attention?",
    choices: [
      { label: "A clear identity and visual system", packageId: "start" },
      { label: "Packaging architecture for launch", packageId: "launch" },
      { label: "Consistency across multiple SKUs", packageId: "grow" },
      { label: "A system for retail and e-commerce", packageId: "scale" },
    ],
  },
  {
    prompt: "How wide is the range you’re planning for?",
    choices: [
      { label: "Still shaping the first idea", packageId: "start" },
      { label: "One product, ready for market", packageId: "launch" },
      { label: "A portfolio of up to five SKUs", packageId: "grow" },
      { label: "A larger range across new channels", packageId: "scale" },
    ],
  },
  {
    prompt: "What does the next stage look like?",
    choices: [
      { label: "Make the brand unmistakably mine", packageId: "start" },
      { label: "Launch with a market-ready package", packageId: "launch" },
      { label: "Bring the full portfolio into sync", packageId: "grow" },
      { label: "Build for retailers and distributors", packageId: "scale" },
    ],
  },
  {
    prompt: "What kind of support would help most?",
    choices: [
      { label: "A strong foundation", packageId: "start" },
      { label: "A confident product launch", packageId: "launch" },
      { label: "A clear brand across every SKU", packageId: "grow" },
      { label: "Guidance through a wider roll-out", packageId: "scale" },
    ],
  },
];

function recommendPackage(answers: PackageId[]): PackageTier | null {
  const scores: Record<PackageId, number> = {
    start: 0,
    launch: 0,
    grow: 0,
    scale: 0,
  };

  for (const answer of answers) {
    scores[answer] += 1;
  }

  let winner: PackageId = answers[0] ?? "launch";
  for (const tier of packageTiers) {
    if (scores[tier.id] > scores[winner]) {
      winner = tier.id;
    }
  }

  return packageTiers.find(({ id }) => id === winner) ?? null;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pack Labs | Packaging built to grow with your product" },
      {
        name: "description",
        content:
          "From a first product launch to a national roll-out, Pack Labs builds packaging systems for every stage of brand growth.",
      },
      {
        property: "og:title",
        content: "Pack Labs | Packaging built to grow with your product",
      },
      {
        property: "og:description",
        content:
          "From a first product launch to a national roll-out, Pack Labs builds packaging systems for every stage of brand growth.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fitStep, setFitStep] = useState(0);
  const [fitAnswers, setFitAnswers] = useState<PackageId[]>([]);
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  const currentQuestion = fitQuestions[fitStep];
  if (!currentQuestion) return null;

  const selectedPackage = fitAnswers[fitStep];
  const fitComplete = fitAnswers.length === fitQuestions.length;
  const recommendation = fitComplete ? recommendPackage(fitAnswers) : null;

  function choosePackage(packageId: PackageId) {
    setFitAnswers((answers) => {
      const nextAnswers = [...answers];
      nextAnswers[fitStep] = packageId;
      return nextAnswers;
    });
  }

  function handleFitNext() {
    if (selectedPackage === undefined) return;
    setFitStep((step) => Math.min(step + 1, fitQuestions.length - 1));
  }

  function resetFitCheck() {
    setFitAnswers([]);
    setFitStep(0);
  }

  function handleEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const company = String(formData.get("company") ?? "");
    const details = String(formData.get("details") ?? "");
    const subject = encodeURIComponent(`Pack Labs enquiry — ${company || name}`);
    const body = encodeURIComponent(
      [`Name: ${name}`, `Email: ${email}`, `Company: ${company}`, `Project details: ${details}`].join(
        "\n\n",
      ),
    );

    window.location.href = `mailto:hello@currynation.in?subject=${subject}&body=${body}`;
    setFormStatus("Your email app should open with a draft enquiry.");
  }

  return (
    <div className="pack-labs-page">
      <header className="site-header">
        <div className="site-header-inner">
          <a className="brand-lockup" href="#top" aria-label="Pack Labs by Curry Nation, home">
            <span className="brand-name">Pack Labs</span>
            <span className="brand-byline">BY CURRY NATION</span>
          </a>

          <Button
            className="mobile-menu-toggle"
            variant="ghost"
            size="sm"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            {menuOpen ? "Close" : "Menu"}
          </Button>

          <nav
            className={`primary-navigation${menuOpen ? " is-open" : ""}`}
            id="primary-navigation"
            aria-label="Main navigation"
          >
            <a href="#packages" onClick={() => setMenuOpen(false)}>
              Packaging
            </a>
            <a href="#approach" onClick={() => setMenuOpen(false)}>
              The approach
            </a>
            <a href="#fit-check" onClick={() => setMenuOpen(false)}>
              Find your fit
            </a>
          </nav>

          <Button asChild className="header-cta" size="sm">
            <a href="#contact">Start a project</a>
          </Button>
        </div>
      </header>

      <main>
        <section className="hero-section" id="top">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-rule" />Packaging for what’s next</p>
            <h1>
              Packaging that moves your product <span>forward.</span>
            </h1>
            <p className="hero-description">
              From a first product launch to a national roll-out, build a packaging system that
              grows with your brand.
            </p>
            <div className="hero-actions">
              <Button asChild size="lg">
                <a href="#packages">Explore the stages</a>
              </Button>
              <a className="text-link" href="#fit-check">
                Find your fit <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="hero-footnote">
              <span>One brand</span>
              <span>Every SKU</span>
              <span>Every channel</span>
            </div>
          </div>
          <div className="hero-visual">
            <img
              className="hero-image"
              src="/pack-labs/packaging-stages.jpg"
              alt="Three packaging stages: a first identity, product launch and national roll-out"
              fetchPriority="high"
            />
            <span className="hero-image-caption">A system designed to scale</span>
          </div>
        </section>

        <section className="signal-band" id="approach" data-reveal>
          <div className="signal-heading">
            <p className="eyebrow eyebrow-light"><span className="eyebrow-rule" />The right stage matters</p>
            <h2>Not every brand needs the same thing.</h2>
          </div>
          <p className="signal-copy">
            A first identity, a product launch and a national roll-out are different jobs. We bring
            the brand and its packaging together around the stage your business is in today.
          </p>
          <div className="signal-steps" aria-label="Pack Labs works across three connected stages">
            <div><span>01</span><p>Build the identity</p></div>
            <div><span>02</span><p>Design for launch</p></div>
            <div><span>03</span><p>Grow the system</p></div>
          </div>
        </section>

        <section className="packages-section" id="packages">
          <div className="section-intro" data-reveal>
            <p className="eyebrow"><span className="eyebrow-rule" />Four ways forward</p>
            <h2>Choose the stage that fits your business today.</h2>
            <p>Every package starts with what you need now—and leaves room for what comes next.</p>
          </div>

          <div className="package-list">
            {packageTiers.map((tier) => (
              <article className={`package-row package-row-${tier.id}`} key={tier.id} data-reveal>
                <div className="package-copy">
                  <div className="package-meta">
                    <span>{tier.number} / {tier.name}</span>
                    <span>{tier.timeline}</span>
                  </div>
                  <h3>{tier.title}</h3>
                  <p className="package-summary">{tier.summary}</p>
                  <div className="deliverables-heading">{tier.scopeNote}</div>
                  <ul className="deliverables-list">
                    {tier.deliverables.map((deliverable) => (
                      <li key={deliverable}>{deliverable}</li>
                    ))}
                  </ul>
                  <a className="text-link package-link" href="#contact">
                    Talk about {tier.name} <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <div className="package-art">
                  <img src={tier.image} alt={tier.imageAlt} loading="lazy" />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="process-section" data-reveal>
          <div className="process-visual">
            <img
              src="/pack-labs/packaging-concept.jpg"
              alt="Packaging forms explored as a connected product family"
              loading="lazy"
            />
          </div>
          <div className="process-copy">
            <p className="eyebrow"><span className="eyebrow-rule" />Built as a system</p>
            <h2>From first pack to a portfolio that holds together.</h2>
            <p>
              More products shouldn’t mean more visual noise. A clear packaging architecture helps
              every product feel like part of the same story—on shelf, online and in new markets.
            </p>
            <a className="text-link" href="#fit-check">
              Find the right starting point <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section className="fit-section" id="fit-check" data-reveal>
          <div className="fit-intro">
            <p className="eyebrow eyebrow-light"><span className="eyebrow-rule" />A better place to start</p>
            <h2>Not sure which stage you’re at?</h2>
            <p>Answer five quick questions and we’ll recommend the package that fits.</p>
            <a className="fit-email-link" href="mailto:hello@currynation.in?subject=20-minute%20brand%20review">
              Prefer to talk it through? Email us about a 20-minute review.
            </a>
          </div>

          <div className="fit-check-panel" aria-live="polite">
            <div className="fit-check-topline">
              <span>{fitComplete ? "Your recommendation" : `Question ${fitStep + 1} of ${fitQuestions.length}`}</span>
              <div className="fit-progress" aria-hidden="true">
                {fitQuestions.map((question, index) => (
                  <span
                    className={index <= fitStep ? "is-active" : ""}
                    key={question.prompt}
                  />
                ))}
              </div>
            </div>

            {fitComplete && recommendation ? (
              <div className="fit-result">
                <p className="fit-result-label">A strong place to begin</p>
                <h3>{recommendation.name}</h3>
                <p>{recommendation.summary}</p>
                <div className="fit-result-actions">
                  <Button asChild>
                    <a href={`#package-${recommendation.id}`}>See this package</a>
                  </Button>
                  <Button variant="outline" type="button" onClick={resetFitCheck}>
                    Start again
                  </Button>
                </div>
              </div>
            ) : (
              <div className="fit-question">
                <h3>{currentQuestion.prompt}</h3>
                <div className="fit-choices">
                  {currentQuestion.choices.map((choice) => (
                    <Button
                      className={`fit-choice${selectedPackage === choice.packageId ? " is-selected" : ""}`}
                      variant="outline"
                      type="button"
                      aria-pressed={selectedPackage === choice.packageId}
                      key={choice.label}
                      onClick={() => choosePackage(choice.packageId)}
                    >
                      {choice.label}
                    </Button>
                  ))}
                </div>
                <div className="fit-navigation">
                  <Button
                    variant="ghost"
                    type="button"
                    disabled={fitStep === 0}
                    onClick={() => setFitStep((step) => Math.max(step - 1, 0))}
                  >
                    Back
                  </Button>
                  <Button type="button" disabled={selectedPackage === undefined} onClick={handleFitNext}>
                    {fitStep === fitQuestions.length - 1 ? "See my recommendation" : "Next"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="contact-section" id="contact" data-reveal>
          <div className="contact-intro">
            <p className="eyebrow eyebrow-light"><span className="eyebrow-rule" />Let’s make something matter</p>
            <h2>Have a product in mind?</h2>
            <p>
              Tell us where you’re headed. We’ll help you find the right packaging stage for your
              brand.
            </p>
            <a className="contact-email" href="mailto:hello@currynation.in">
              hello@currynation.in
            </a>
          </div>

          <form className="enquiry-form" onSubmit={handleEnquiry}>
            <label>
              Your name
              <input autoComplete="name" name="name" required />
            </label>
            <label>
              Email address
              <input autoComplete="email" name="email" type="email" required />
            </label>
            <label>
              Company name
              <input autoComplete="organization" name="company" required />
            </label>
            <label className="form-details">
              Project details
              <textarea name="details" rows={3} required />
            </label>
            <div className="form-submit-row">
              <Button type="submit" size="lg">Send an enquiry</Button>
              <p className="form-status" role="status">{formStatus}</p>
            </div>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand-lockup footer-brand" href="#top">
          <span className="brand-name">Pack Labs</span>
          <span className="brand-byline">BY CURRY NATION</span>
        </a>
        <p>Brand-led packaging for what’s next.</p>
        <a href="mailto:hello@currynation.in">hello@currynation.in</a>
        <span>© {new Date().getFullYear()} Curry Nation</span>
      </footer>
    </div>
  );
}