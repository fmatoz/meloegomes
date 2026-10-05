import { useRef, useState, type FormEvent } from 'react';
import { ArrowDownRight, ArrowUpRight, Instagram, Menu, MessageCircle, X } from 'lucide-react';
import ProjectGallery from './components/ProjectGallery';

const waNumber = '5511947006453';
const waRoot = `https://wa.me/${waNumber}`;

const serviceItems = [
  {
    title: 'Marcenaria sob medida',
    description: 'Projetos personalizados de acordo com o espaço e a necessidade de cada ambiente.',
  },
  {
    title: 'Armários e guarda-roupas',
    description: 'Soluções para organização e melhor aproveitamento do espaço.',
  },
  {
    title: 'Móveis para banheiro',
    description: 'Marcenaria funcional e personalizada para o ambiente.',
  },
  {
    title: 'Projetos especiais',
    description: 'Soluções para nichos, áreas sob escada, adegas e móveis auxiliares.',
  },
];

const reviews = [
  'A obra foi efetuada com esmero e a equipe cumpriu os prazos combinados.',
  'O melhor do mercado , entregue no prazo é tudo maravilhoso !!',
  'Marcenaria de trabalho incrível e compromissado, detalhes e entrega nota 10.',
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({ name: '', region: '', need: '' });
  const [submitError, setSubmitError] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);

  const focusQuoteForm = () => {
    const form = document.getElementById('quote-form');
    form?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'center',
    });
    window.setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 420);
    setMenuOpen(false);
  };

  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError('');
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') || '').trim();
    const region = String(formData.get('region') || '').trim();
    const need = String(formData.get('need') || '').trim();
    const errors = {
      name: name ? '' : 'Informe seu nome.',
      region: region ? '' : 'Informe sua cidade ou bairro.',
      need: need ? '' : 'Conte brevemente o que você precisa.',
    };
    setFormErrors(errors);
    if (errors.name || errors.region || errors.need) {
      setSubmitError('Confira os campos obrigatórios antes de continuar.');
      if (!name) nameRef.current?.focus();
      else if (!region) document.getElementById('quote-region')?.focus();
      else document.getElementById('quote-need')?.focus();
      return;
    }

    const message = `Olá! Vim pelo site da Melo & Gomes Marcenaria e gostaria de solicitar um orçamento.\n\n👤 Nome: ${name}\n📍 Região: ${region}\n📝 O que preciso: ${need}`;
    window.open(`${waRoot}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const navLink = (label: string, href: string) => (
    <a href={href} onClick={() => setMenuOpen(false)} data-testid={`link-nav-${href.slice(1)}`}>{label}</a>
  );

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
      <header className="header">
        <div className="container header-inner">
          <a className="wordmark" href="#inicio" aria-label="Melo & Gomes Marcenaria — início" data-testid="link-brand-home">
            <img className="wordmark-image" src="/melo-gomes-logo.png" alt="" />
          </a>
          <nav id="mobile-navigation" className={`nav${menuOpen ? ' is-open' : ''}`} aria-label="Navegação principal">
            {navLink('Serviços', '#servicos')}
            {navLink('Projetos', '#projetos')}
            {navLink('Avaliações', '#avaliacoes')}
            {navLink('Contato', '#contato')}
          </nav>
          <button className="button header-quote" type="button" onClick={focusQuoteForm} data-testid="button-header-quote">Solicitar orçamento <ArrowUpRight size={15} aria-hidden="true" /></button>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu">
            {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="container hero-content">
            <span className="eyebrow">Marcenaria sob medida · São Paulo</span>
            <h1 id="hero-title">Marcenaria sob medida para <em>aproveitar melhor</em> cada ambiente</h1>
            <p className="hero-copy">Projetos personalizados para sua casa, com soluções pensadas para o espaço e para o que você precisa.</p>
            <div className="hero-actions">
              <button className="button button--light" type="button" onClick={focusQuoteForm} data-testid="button-hero-quote">Solicitar orçamento <ArrowUpRight size={16} aria-hidden="true" /></button>
              <a className="button button--outline" href="#projetos" data-testid="link-hero-projects">Ver projetos <ArrowDownRight size={16} aria-hidden="true" /></a>
            </div>
            <div className="hero-proof" data-testid="text-hero-proof"><span className="hero-proof-star" aria-hidden="true">★</span><span><strong>4,9 no Google</strong><span className="hero-proof-divider" aria-hidden="true"> · </span>Atendimento em São Paulo</span></div>
          </div>
        </section>

        <section className="section services-section" id="servicos" aria-labelledby="services-title">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Soluções para sua casa</span>
              <h2 id="services-title">Marcenaria feita para o seu espaço</h2>
              <p>Soluções sob medida para diferentes ambientes e necessidades.</p>
            </div>
            <div className="service-grid">
              {serviceItems.map((item, index) => (
                <article className="service-card" key={item.title} data-testid={`card-service-${index + 1}`}>
                  <span className="service-num">0{index + 1} / SERVIÇO</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section projects-section" id="projetos" aria-labelledby="projects-title">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Trabalhos realizados</span>
              <h2 id="projects-title">Projetos Melo &amp; Gomes</h2>
              <p>Confira alguns trabalhos e soluções em marcenaria sob medida.</p>
            </div>
            <ProjectGallery />
          </div>
        </section>

        <section className="section reviews-section" id="avaliacoes" aria-labelledby="reviews-title">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Experiências compartilhadas</span>
              <h2 id="reviews-title">Quem contrata, recomenda</h2>
            </div>
            <div className="review-rating" data-testid="rating-google">
              <span className="review-rating-star" aria-hidden="true">★</span>
              <strong>4,9 no Google</strong>
            </div>
            <div className="review-grid">
              {reviews.map((review, index) => (
                <blockquote className="review-card" key={review} data-testid={`quote-review-${index + 1}`}>{review}</blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="final-section" id="contato" aria-labelledby="contact-title">
          <div className="container final-layout">
            <div className="final-copy">
              <span className="eyebrow">Vamos conversar</span>
              <h2 id="contact-title">Conte o que você precisa</h2>
              <p>Envie algumas informações e continue o atendimento diretamente pelo WhatsApp da Melo &amp; Gomes.</p>
            </div>
            <form className="quote-form" id="quote-form" onSubmit={submitQuote} noValidate>
              <h3>Solicite seu orçamento</h3>
              <p className="form-intro">Preencha os três campos para continuar pelo WhatsApp.</p>
              <div className="field">
                <label htmlFor="quote-name">Seu nome <span aria-hidden="true">*</span></label>
                <input ref={nameRef} id="quote-name" name="name" type="text" autoComplete="name" placeholder="Como podemos chamar você?" required aria-invalid={!!formErrors.name} aria-describedby="error-name" data-testid="input-quote-name" onChange={() => formErrors.name && setFormErrors({ ...formErrors, name: '' })} />
                <span className="field-error" id="error-name" role="alert" data-testid="error-quote-name">{formErrors.name}</span>
              </div>
              <div className="field">
                <label htmlFor="quote-region">Sua cidade ou bairro <span aria-hidden="true">*</span></label>
                <input id="quote-region" name="region" type="text" autoComplete="address-level2" placeholder="Seu bairro ou cidade" required aria-invalid={!!formErrors.region} aria-describedby="error-region" data-testid="input-quote-region" onChange={() => formErrors.region && setFormErrors({ ...formErrors, region: '' })} />
                <span className="field-error" id="error-region" role="alert" data-testid="error-quote-region">{formErrors.region}</span>
              </div>
              <div className="field">
                <label htmlFor="quote-need">Conte brevemente o que você precisa <span aria-hidden="true">*</span></label>
                <textarea id="quote-need" name="need" placeholder="Descreva sua ideia ou necessidade" required aria-invalid={!!formErrors.need} aria-describedby="error-need" data-testid="input-quote-need" onChange={() => formErrors.need && setFormErrors({ ...formErrors, need: '' })} />
                <span className="field-error" id="error-need" role="alert" data-testid="error-quote-need">{formErrors.need}</span>
              </div>
              <p className="field-error" role="alert" data-testid="status-quote-form">{submitError}</p>
              <button className="button form-submit" type="submit" data-testid="button-submit-whatsapp">Enviar pelo WhatsApp <ArrowUpRight size={16} aria-hidden="true" /></button>
              <p className="form-privacy">Seus dados não são armazenados por este site. Você confere e envia a mensagem no WhatsApp.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <a className="wordmark" href="#inicio" aria-label="Melo & Gomes Marcenaria — início" data-testid="link-footer-brand">
              <img className="wordmark-image" src="/melo-gomes-logo.png" alt="" />
            </a>
            <div className="footer-details">
              <div className="footer-detail"><strong>Endereço</strong><span>Av. Eng. Heitor Antônio Eiras Garcia, 3498 - Jardim Esmeralda, São Paulo - SP, 05564-100</span></div>
              <div className="footer-detail"><strong>Telefone / WhatsApp</strong><a href={waRoot} target="_blank" rel="noopener noreferrer" data-testid="link-footer-whatsapp">(11) 94700-6453</a></div>
              <div className="footer-detail"><strong>Instagram</strong><a className="footer-instagram-link" href="https://www.instagram.com/meloegomes/" target="_blank" rel="noopener noreferrer" data-testid="link-footer-instagram"><Instagram size={16} aria-hidden="true" /> @meloegomes</a></div>
              <div className="footer-detail"><strong>Localização</strong><span>São Paulo - SP</span></div>
            </div>
          </div>
          <div className="footer-bottom"><span>Melo &amp; Gomes Marcenaria</span><span>São Paulo · SP</span></div>
        </div>
      </footer>

      <button className="floating-whatsapp" type="button" onClick={focusQuoteForm} aria-label="Solicitar orçamento pelo WhatsApp" data-testid="button-floating-whatsapp">
        <MessageCircle size={18} aria-hidden="true" /><span>Fale pelo WhatsApp</span>
      </button>
    </div>
  );
}

export default App;
