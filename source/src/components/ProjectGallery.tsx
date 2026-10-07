import { useCallback, useEffect, useRef, useState, type FocusEvent } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

const projectPhotos = [
  {
    src: '/projects/balcao-madeira.webp',
    alt: 'Balcão longo de madeira sob medida em um ambiente comercial.',
    caption: 'Balcão sob medida',
  },
  {
    src: '/projects/gabinete-banheiro-azul.webp',
    alt: 'Gabinete azul acinzentado para banheiro com bancada de pedra.',
    caption: 'Móvel para banheiro',
  },
  {
    src: '/projects/adega-sob-escada.webp',
    alt: 'Adega de madeira e armário planejados para aproveitar o espaço sob a escada.',
    caption: 'Solução sob escada',
  },
  {
    src: '/projects/painel-ripado-tv.webp',
    alt: 'Painel de TV com acabamento ripado e móvel de madeira.',
    caption: 'Painel ripado',
  },
  {
    src: '/projects/cozinha-planejada.webp',
    alt: 'Armários cinza sob medida em cozinha compacta.',
    caption: 'Cozinha sob medida',
  },
  {
    src: '/projects/painel-ripado-prateleiras.webp',
    alt: 'Painel ripado de madeira com prateleiras e armário auxiliar.',
    caption: 'Painel e prateleiras',
  },
  {
    src: '/projects/painel-tv-branco-madeira.webp',
    alt: 'Painel de TV com ripado de madeira, nichos e gavetas brancas.',
    caption: 'Móvel para sala',
  },
  {
    src: '/projects/criado-mudo.webp',
    alt: 'Móvel auxiliar claro com nicho aberto e gavetas.',
    caption: 'Móvel auxiliar',
  },
  {
    src: '/projects/mesa-madeira.webp',
    alt: 'Mesa ampla de madeira com desenho natural.',
    caption: 'Mesa de madeira',
  },
  {
    src: '/projects/quarto-planejado.webp',
    alt: 'Quarto com cabeceira, armários e nichos planejados.',
    caption: 'Móveis para quarto',
  },
  {
    src: '/projects/guarda-roupa-escuro.webp',
    alt: 'Guarda-roupa planejado escuro com portas e gavetas.',
    caption: 'Móveis para quarto',
  },
  {
    src: '/projects/painel-tv-instalacao.webp',
    alt: 'Painel de TV e móvel de madeira em etapa de instalação.',
    caption: 'Painel de TV',
  },
  {
    src: '/projects/cozinha-escura.webp',
    alt: 'Armários planejados escuros com nichos para eletrodomésticos.',
    caption: 'Cozinha sob medida',
  },
  {
    src: '/projects/gabinete-banheiro-branco.webp',
    alt: 'Bancada branca e gabinete sob medida para banheiro.',
    caption: 'Móvel para banheiro',
  },
];

projectPhotos.push(...[
  {
    "src": "/projects/portas-coloridas-01.webp",
    "alt": "Portas de correr coloridas — trabalho da Melo & Gomes.",
    "caption": "Portas de correr coloridas"
  },
  {
    "src": "/projects/revestimento-madeira.webp",
    "alt": "Revestimento e portas em madeira — trabalho da Melo & Gomes.",
    "caption": "Revestimento e portas em madeira"
  },
  {
    "src": "/projects/cozinha-branca-madeira.webp",
    "alt": "Cozinha branca com acabamento amadeirado — trabalho da Melo & Gomes.",
    "caption": "Cozinha branca com acabamento amadeirado"
  },
  {
    "src": "/projects/escritorio-planejado.webp",
    "alt": "Móveis para escritório — trabalho da Melo & Gomes.",
    "caption": "Móveis para escritório"
  },
  {
    "src": "/projects/divulgacao-melo-gomes.webp",
    "alt": "Melo & Gomes — apresentação dos serviços — trabalho da Melo & Gomes.",
    "caption": "Melo & Gomes — apresentação dos serviços"
  },
  {
    "src": "/projects/penteadeira-espelho-led.webp",
    "alt": "Penteadeira com espelho iluminado — trabalho da Melo & Gomes.",
    "caption": "Penteadeira com espelho iluminado"
  },
  {
    "src": "/projects/prateleiras-movel-cinza.webp",
    "alt": "Prateleiras e móvel com gavetas — trabalho da Melo & Gomes.",
    "caption": "Prateleiras e móvel com gavetas"
  },
  {
    "src": "/projects/painel-ripado-espelho.webp",
    "alt": "Painel ripado e espelho — trabalho da Melo & Gomes.",
    "caption": "Painel ripado e espelho"
  },
  {
    "src": "/projects/bancada-branca-l.webp",
    "alt": "Bancada branca em L — trabalho da Melo & Gomes.",
    "caption": "Bancada branca em L"
  },
  {
    "src": "/projects/prateleiras-madeira.webp",
    "alt": "Prateleiras de madeira — trabalho da Melo & Gomes.",
    "caption": "Prateleiras de madeira"
  },
  {
    "src": "/projects/quarto-cabeceira-branca.webp",
    "alt": "Cabeceira e mesas de cabeceira — trabalho da Melo & Gomes.",
    "caption": "Cabeceira e mesas de cabeceira"
  },
  {
    "src": "/projects/quarto-portas-correr.webp",
    "alt": "Móvel para quarto com portas de correr — trabalho da Melo & Gomes.",
    "caption": "Móvel para quarto com portas de correr"
  },
  {
    "src": "/projects/cozinha-gabinete-branco.webp",
    "alt": "Cozinha com gabinete branco — trabalho da Melo & Gomes.",
    "caption": "Cozinha com gabinete branco"
  },
  {
    "src": "/projects/lavabo-revestido.webp",
    "alt": "Lavabo com revestimento branco — trabalho da Melo & Gomes.",
    "caption": "Lavabo com revestimento branco"
  },
  {
    "src": "/projects/balcao-ripado-comercial.webp",
    "alt": "Balcão comercial e painel ripado — trabalho da Melo & Gomes.",
    "caption": "Balcão comercial e painel ripado"
  },
  {
    "src": "/projects/bancada-comercial-madeira.webp",
    "alt": "Bancada e móvel comercial — trabalho da Melo & Gomes.",
    "caption": "Bancada e móvel comercial"
  },
  {
    "src": "/projects/gaveteiros-comerciais.webp",
    "alt": "Gaveteiros e móveis comerciais — trabalho da Melo & Gomes.",
    "caption": "Gaveteiros e móveis comerciais"
  },
  {
    "src": "/projects/portas-coloridas-02.webp",
    "alt": "Portas de correr coloridas — outro ângulo — trabalho da Melo & Gomes.",
    "caption": "Portas de correr coloridas — outro ângulo"
  }
]);
const featuredOrder = ['painel-tv-branco-madeira', 'adega-sob-escada', 'painel-ripado-tv', 'cozinha-planejada', 'quarto-planejado', 'mesa-madeira'];
projectPhotos.sort((a,b) => {
const rank = (src: string) => {const index = featuredOrder.findIndex(name => src.includes(name + '.webp')); return index < 0 ? featuredOrder.length : index;};
return rank(a.src) - rank(b.src);
});
const featuredPhotos = projectPhotos.slice(0, 6);
const photoCategories: Record<string, string> = {
  "/projects/portas-coloridas-01.webp": "Comerciais",
  "/projects/revestimento-madeira.webp": "Salas",
  "/projects/cozinha-branca-madeira.webp": "Cozinhas",
  "/projects/escritorio-planejado.webp": "Comerciais",
  "/projects/divulgacao-melo-gomes.webp": "Outros projetos",
  "/projects/penteadeira-espelho-led.webp": "Quartos",
  "/projects/prateleiras-movel-cinza.webp": "Outros projetos",
  "/projects/painel-ripado-espelho.webp": "Salas",
  "/projects/bancada-branca-l.webp": "Comerciais",
  "/projects/prateleiras-madeira.webp": "Salas",
  "/projects/quarto-cabeceira-branca.webp": "Quartos",
  "/projects/quarto-portas-correr.webp": "Quartos",
  "/projects/cozinha-gabinete-branco.webp": "Cozinhas",
  "/projects/lavabo-revestido.webp": "Banheiros",
  "/projects/balcao-ripado-comercial.webp": "Comerciais",
  "/projects/bancada-comercial-madeira.webp": "Comerciais",
  "/projects/gaveteiros-comerciais.webp": "Comerciais",
  "/projects/portas-coloridas-02.webp": "Comerciais",
  "/projects/cozinha-planejada.webp": "Cozinhas",
  "/projects/cozinha-escura.webp": "Cozinhas",
  "/projects/gabinete-banheiro-azul.webp": "Banheiros",
  "/projects/gabinete-banheiro-branco.webp": "Banheiros",
  "/projects/quarto-planejado.webp": "Quartos",
  "/projects/guarda-roupa-escuro.webp": "Quartos",
  "/projects/criado-mudo.webp": "Quartos",
  "/projects/painel-ripado-tv.webp": "Salas",
  "/projects/painel-ripado-prateleiras.webp": "Salas",
  "/projects/painel-tv-branco-madeira.webp": "Salas",
  "/projects/painel-tv-instalacao.webp": "Salas",
  "/projects/mesa-madeira.webp": "Salas",
  "/projects/balcao-madeira.webp": "Comerciais",
  "/projects/adega-sob-escada.webp": "Outros projetos"
};
const categories = ["Todos", "Cozinhas", "Quartos", "Banheiros", "Salas", "Comerciais", "Outros projetos"];
const carouselOptions = { align: 'start' as const, loop: true };

function ProjectGallery() {
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [category, setCategory] = useState("Todos");
  const [api, setApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [pausedAfterInteraction, setPausedAfterInteraction] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const resumeTimer = useRef<number | null>(null);
  const lightboxRef = useRef<HTMLDialogElement>(null);

  const pauseForInteraction = useCallback(() => {
    setPausedAfterInteraction(true);
    if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      setPausedAfterInteraction(false);
      resumeTimer.current = null;
    }, 6000);
  }, []);

  useEffect(() => {
    if (!api) return;

    const updateActiveSlide = () => setActiveSlide(api.selectedScrollSnap());
    updateActiveSlide();
    api.on('select', updateActiveSlide);
    api.on('reInit', updateActiveSlide);

    return () => {
      api.off('select', updateActiveSlide);
      api.off('reInit', updateActiveSlide);
    };
  }, [api]);

  useEffect(() => {
    if (!api || isHovered || hasFocus || pausedAfterInteraction || lightboxIndex !== null) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const interval = window.setInterval(() => api.scrollNext(), 4800);
    return () => window.clearInterval(interval);
  }, [api, hasFocus, isHovered, lightboxIndex, pausedAfterInteraction]);

  useEffect(() => {
    const dialog = lightboxRef.current;
    if (!dialog) return;

    if (lightboxIndex !== null && !dialog.open) dialog.showModal();
    if (lightboxIndex === null && dialog.open) dialog.close();
  }, [lightboxIndex]);

  useEffect(() => () => {
    if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current);
  }, []);

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget;
    if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
      setHasFocus(false);
    }
  };

  const moveLightbox = (direction: -1 | 1) => {
    if (lightboxIndex === null) return;
    const nextIndex = (lightboxIndex + direction + projectPhotos.length) % projectPhotos.length;
    setLightboxIndex(nextIndex);
    api?.scrollTo(nextIndex);
    pauseForInteraction();
  };

  const activePhoto = lightboxIndex === null ? null : projectPhotos[lightboxIndex];

  return (
    <div
      className="project-gallery"
      data-testid="gallery-projects"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setHasFocus(true)}
      onBlurCapture={handleBlur}
      onPointerDown={pauseForInteraction}
      onPointerUp={pauseForInteraction}
      onPointerCancel={pauseForInteraction}
    >
      <Carousel
        className="project-carousel"
        opts={carouselOptions}
        setApi={setApi}
        aria-label="Galeria de projetos da Melo & Gomes"
      >
        <CarouselContent className="project-carousel-track">
          {featuredPhotos.map((photo, index) => (
            <CarouselItem
              className="project-carousel-item"
              key={photo.src}
              aria-label={`${index + 1} de ${featuredPhotos.length}: ${photo.caption}`}
              data-testid={`gallery-slide-${index + 1}`}
            >
              <article className="project-card">
                <button
                  className="project-image-button"
                  type="button"
                  onClick={() => {
                    setLightboxIndex(index);
                    pauseForInteraction();
                  }}
                  aria-label={`Ampliar foto: ${photo.caption}`}
                >
                  <span className="project-image-frame">
                    <img
                      className="project-card-image"
                      src={photo.src}
                      alt={photo.alt}
                      loading={index < 3 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                    <span className="project-image-caption">{photo.caption}</span>
                  </span>
                </button>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="gallery-toolbar">
        <div className="gallery-pagination" role="group" aria-label="Selecionar foto do projeto">
          {featuredPhotos.map((photo, index) => (
            <button
              key={photo.src}
              className={`gallery-dot${activeSlide === index ? ' is-active' : ''}`}
              type="button"
              aria-label={`Mostrar foto ${index + 1}: ${photo.caption}`}
              aria-current={activeSlide === index ? 'true' : undefined}
              onClick={() => {
                api?.scrollTo(index);
                pauseForInteraction();
              }}
            />
          ))}
        </div>
        <div className="gallery-controls">
          <span className="gallery-count" aria-live="off">Foto {String(activeSlide + 1).padStart(2, '0')}</span>
          <button
            className="gallery-arrow"
            type="button"
            aria-label="Foto anterior"
            onClick={() => {
              api?.scrollPrev();
              pauseForInteraction();
            }}
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button
            className="gallery-arrow"
            type="button"
            aria-label="Próxima foto"
            onClick={() => {
              api?.scrollNext();
              pauseForInteraction();
            }}
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="archive-launch"><button className="button" type="button" aria-expanded={archiveOpen} aria-controls="project-archive" onClick={() => setArchiveOpen(!archiveOpen)}>{archiveOpen ? 'Recolher projetos' : 'Ver mais projetos'} <span>({projectPhotos.length} imagens)</span></button></div>
      {archiveOpen && <div id="project-archive" className="project-archive">
        <div className="archive-filters" role="group" aria-label="Filtrar projetos por ambiente">{categories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
        <p className="archive-summary" role="status">{projectPhotos.filter(photo => category === 'Todos' || photoCategories[photo.src] === category).length} imagens · {category}</p>
        <div className="archive-grid">{projectPhotos.map((photo, index) => (category === 'Todos' || photoCategories[photo.src] === category) && <article className="project-card" key={photo.src}><button className="project-image-button" type="button" aria-label={`Ampliar foto: ${photo.caption}`} onClick={() => {setLightboxIndex(index);pauseForInteraction();}}><span className="project-image-frame"><img className="project-card-image" src={photo.src} alt={photo.alt} loading="lazy" decoding="async" /></span></button><p className="archive-caption">{photo.caption}</p></article>)}</div>
      </div>}
      <dialog
        ref={lightboxRef}
        className="project-lightbox"
        aria-labelledby="project-lightbox-title"
        onClose={() => setLightboxIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setLightboxIndex(null);
        }}
      >
        {activePhoto && (
          <>
            <h2 className="sr-only" id="project-lightbox-title">{activePhoto.caption}</h2>
            <button
              className="lightbox-close"
              type="button"
              aria-label="Fechar foto ampliada"
              onClick={() => setLightboxIndex(null)}
            >
              <X size={22} aria-hidden="true" />
            </button>
            <button
              className="lightbox-arrow lightbox-arrow--previous"
              type="button"
              aria-label="Foto anterior"
              onClick={() => moveLightbox(-1)}
            >
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <figure className="lightbox-figure">
              <img src={activePhoto.src} alt={activePhoto.alt} decoding="async" />
              <figcaption>{activePhoto.caption}</figcaption>
            </figure>
            <button
              className="lightbox-arrow lightbox-arrow--next"
              type="button"
              aria-label="Próxima foto"
              onClick={() => moveLightbox(1)}
            >
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </>
        )}
      </dialog>
    </div>
  );
}

export default ProjectGallery;
