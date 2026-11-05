import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import heroNoraAsset from "@/assets/hero-nora.png.asset.json";
import escritorioNoraAsset from "@/assets/escritorio-nora.webp.asset.json";
const heroNora = heroNoraAsset.url;
const escritorioNora = escritorioNoraAsset.url;
import bosqueDjangoAsset from "@/assets/retrato-bosque-django.webp.asset.json";
const bosqueDjango = bosqueDjangoAsset.url;
import guiaCuadernoAsset from "@/assets/cuaderno-estimulacion-cognitiva.png.asset.json";
import ansiedadPortadaAsset from "@/assets/ansiedad-portada.jpeg.asset.json";
import amorPropioPortadaAsset from "@/assets/amor-propio-portada.webp.asset.json";
import aprendiendoQuerermeAsset from "@/assets/aprendiendo-a-quererme.png.asset.json";
import reelAlzheimerAsset from "@/assets/reel-capturapng.png.asset.json";
import reelRetoAsset from "@/assets/reel-captura333png.png.asset.json";
import reelPresentacionAsset from "@/assets/reel-capturagtregtpng.png.asset.json";
import { coverFor, fetchPosts, formatDate } from "@/lib/blog";
import { WHATSAPP_URL } from "@/lib/contact";
import { DoctoraliaDestacada } from "@/components/DoctoraliaDestacada";
import { Comunidad } from "@/components/Comunidad";
import { NewsletterSection } from "@/components/Newsletter";
import { ServiciosDestacados } from "@/components/ServiciosDestacados";
import { accompanimentAreas } from "@/lib/areas";
import { EspiralMarca } from "@/components/EspiralMarca";
import { ArrowUpRight, Clock3, HeartHandshake, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDoctoraliaOpiniones } from "@/lib/doctoralia.functions";
import { authorizedDoctoraliaOpiniones, doctoraliaSummary } from "@/lib/homepage-reviews";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Psicóloga general sanitaria online en España · Noralma" },
      {
        name: "description",
        content:
          "Nora Gallardo Cano, psicóloga general sanitaria. Terapia psicológica online en España: acompañamiento para ansiedad, autoestima, vínculos y cambios vitales.",
      },
      { property: "og:title", content: "Noralma · Psicología sanitaria online con alma" },
      {
        property: "og:description",
        content:
          "Un espacio de terapia psicológica online para comprenderte y construir una vida más coherente con lo que necesitas y lo que importa para ti.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://noralma.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://noralma.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Psychologist",
          name: "Noralma · Nora Gallardo Cano, Psicóloga General Sanitaria",
          url: "https://noralma.lovable.app/",
          telephone: "+34611525410",
          email: "noracano4@gmail.com",
          priceRange: "60 €",
          areaServed: "ES",
          address: { "@type": "PostalAddress", addressLocality: "Vilanova i la Geltrú", addressRegion: "Cataluña", addressCountry: "ES" },
          sameAs: [
            "https://www.instagram.com/noralma.psicologia",
            "https://www.linkedin.com/in/nora-gallardo-cano-1a6548294/",
            "https://www.doctoralia.es/perfil/nora-gallardo-cano",
          ],
          availableService: { "@type": "MedicalTherapy", name: "Terapia psicológica online" },
        }),
      },
    ],
  }),
  component: Index,
});


const guias = [
  {
    img: guiaCuadernoAsset.url,
    title: "Cuaderno de Estimulación Cognitiva",
    text: "Dossier de ejercicios para personas con deterioro cognitivo",
    href: "https://drive.google.com/file/d/1Gy1gyvY84VNbBcx-tCfK0QnoDoQUk4GP/view?usp=drivesdk",
  },
  {
    img: ansiedadPortadaAsset.url,
    title: "Cómo gestionar la Ansiedad",
    text: "Pasos concretos para bajar el ruido mental.",
    href: "https://drive.google.com/file/d/1GFjKAurQ_GZ1Nqb4JXUtRAzi7r5cxBmL/view?usp=drivesdk",
  },
  {
    img: amorPropioPortadaAsset.url,
    title: "Guía práctica de Amor Propio",
    text: "Pequeñas rutinas para cuidarte sin agobiarte.",
    href: "https://drive.google.com/file/d/1NcGFcwPTquQt3K88Ga_R6JlISr7VEMfo/view?usp=drivesdk",
  },
  {
    img: aprendiendoQuerermeAsset.url,
    title: "Aprendiendo a quererme",
    text: "Desde el amor, coherencia, compasión.",
    href: "https://drive.google.com/file/d/1Enzcr8EV6TTNhce13e8UkfnpKiinOylZ/view?usp=sharing",
  },
];

const DOCTORALIA_REVIEWS_URL =
  "https://www.doctoralia.es/nora-gallardo-cano/psicologo/vilanova-i-la-geltru#profile-reviews";

const instagramPosts = [
  {
    img: reelAlzheimerAsset.url,
    caption: "Entrevista con mi papi, que tiene Alzheimer.",
    href: "https://www.instagram.com/reel/DanIsj9satp/",
  },
  {
    img: reelRetoAsset.url,
    caption: "Día 2 del Reto Noralma: un paso más hacia tu mejor versión.",
    href: "https://www.instagram.com/reel/DeHwXR7MlyO/",
  },
  {
    img: reelPresentacionAsset.url,
    caption: "Me llamo Nora · ¿En qué puedo ayudarte?",
    href: "https://www.instagram.com/reel/DduCtiqsSyG/",
  },
];

const actionClass = "h-auto min-h-11 whitespace-normal rounded-md border border-primary px-5 py-3 text-center leading-snug shadow-none";

function Index() {
  const { data: posts } = useQuery({ queryKey: ["blog-posts"], queryFn: fetchPosts });
  const latestPosts = (posts ?? []).slice(0, 3);
  const { data: doctoralia } = useQuery({
    queryKey: ["doctoralia"],
    queryFn: () => getDoctoraliaOpiniones(),
    staleTime: 60 * 60 * 1000,
  });
  const valoracion = doctoraliaSummary(doctoralia);

  return (
    <div className="home-editorial">
      <section aria-label="Bienvenida a Noralma" className="home-banner">
        <img className="home-banner-vegetation" src={bosqueDjango} alt="" aria-hidden="true" width={1920} height={640} />
        <img className="home-banner-photo" src={bosqueDjango} alt="Nora Gallardo junto a su perro Django en un camino entre árboles" width={1920} height={640} fetchPriority="high" />
        <div className="home-banner-content mx-auto w-full max-w-6xl px-6">
          <div className="home-banner-copy">
            <h1 className="font-display font-medium text-balance">Mi propósito es acompañarte a sentirte bien contigo.</h1>
            <p>Un espacio de acompañamiento psicológico para comprender lo que sientes, escucharte sin juicios y construir una relación más amable contigo.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className={`${actionClass} border-primary-foreground bg-primary-foreground text-primary hover:bg-primary-foreground/90`}><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Reserva tu primera sesión <ArrowUpRight /></a></Button>
              <Button asChild variant="outline" className={`${actionClass} border-primary-foreground/70 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary`}><Link to="/servicios" hash="forma-de-trabajar">Conoce cómo trabajo <ArrowRight /></Link></Button>
            </div>
          </div>
        </div>
      </section>
      <section aria-labelledby="presentacion" className="home-hero mx-auto grid max-w-6xl items-center gap-8 px-6 pb-12 pt-10 md:grid-cols-[1.1fr_1fr] md:gap-12 md:pb-16 md:pt-14">
        <div>
          <p className="home-eyebrow text-sm font-medium text-primary">Noralma · Psicología clínica con alma</p>
          <h2 id="presentacion" className="mt-5 font-display text-4xl font-medium leading-[1.13] text-balance lg:text-6xl">
            Soy Nora, <em className="font-normal text-primary">la persona detrás de Noralma.</em>
          </h2>
          <p className="mt-6 max-w-[47ch] text-base leading-relaxed text-muted-foreground">
            Soy Nora Gallardo Cano, Psicóloga General Sanitaria. Entiendo la psicología como un espacio de escucha, comprensión y acompañamiento, donde explorar tu historia, comprender lo que estás viviendo y construir una relación más amable contigo.
          </p>
          <p className="mt-5 text-sm font-medium text-foreground">Nora Gallardo Cano · Psicóloga General Sanitaria</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild variant="outline" className={actionClass}><Link to="/acerca-de-mi">Conoce más sobre mí <ArrowUpRight /></Link></Button>
            <Button asChild className={actionClass}><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Reserva tu sesión <ArrowUpRight /></a></Button>
          </div>
        </div>
        <figure className="home-hero-photo m-0">
          <img src={escritorioNora} alt="Nora Gallardo Cano, psicóloga general sanitaria, escribiendo en su escritorio de trabajo" width={1086} height={1448} fetchPriority="high" className="h-full w-full object-cover" />
          <figcaption className="mt-3 flex justify-between gap-3 text-xs text-muted-foreground"><span>Un espacio para ti.</span><span>Online · Vilanova i la Geltrú</span></figcaption>
        </figure>
      </section>

      <section aria-labelledby="terapia-online-inicio" className="bg-sand/40 text-foreground">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="grid gap-8 md:grid-cols-2 md:gap-16">
            <div><p className="home-eyebrow text-sm uppercase text-primary">Terapia psicológica online</p><h2 id="terapia-online-inicio" className="mt-4 font-display text-3xl font-medium leading-tight text-balance md:text-4xl">Cuidar de tu salud mental, estés donde estés.</h2></div>
            <div><p className="text-base leading-relaxed text-muted-foreground">La terapia online nos permite crear un espacio de acompañamiento psicológico sin necesidad de desplazarte. Puedes realizar tus sesiones desde un lugar en el que te sientas cómodo y con privacidad, adaptando el proceso terapéutico a tu ritmo y a tu vida cotidiana.</p><Button asChild variant="outline" className={`mt-6 ${actionClass}`}><Link to="/terapia-online">Descubre cómo funciona la terapia online <ArrowUpRight /></Link></Button></div>
          </div>
          <div className="mt-12 grid gap-7 border-t border-primary/20 pt-8 sm:grid-cols-3">
            {[{ Icon: Clock3, title: "Flexibilidad", text: "Integra la terapia en tu rutina." }, { Icon: HeartHandshake, title: "Comodidad", text: "Realiza las sesiones desde tu propio espacio." }, { Icon: MapPin, title: "Accesibilidad", text: "Cuida de tu salud mental sin depender de desplazamientos." }].map(({ Icon, title, text }) => <div key={title}><Icon className="size-5 text-primary" strokeWidth={1.4} aria-hidden="true" /><h3 className="mt-3 text-sm font-medium uppercase">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></div>)}
          </div>
        </div>
      </section>


      <section id="areas-inicio" aria-labelledby="areas-inicio-titulo" className="mx-auto scroll-mt-28 max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]"><div><p className="home-eyebrow text-sm text-primary">Áreas de acompañamiento</p><h2 id="areas-inicio-titulo" className="mt-4 font-display text-3xl font-medium leading-tight md:text-4xl">¿En qué puedo acompañarte?</h2></div><p className="max-w-[43ch] self-end text-base leading-relaxed text-muted-foreground">Cada historia es diferente. El proceso parte de lo que estás viviendo y de lo que necesitas hoy.</p></div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {accompanimentAreas.map(({ Icon, ...area }) => <Link key={area.id} to="/servicios" hash={area.id} className="group flex flex-col rounded-md border border-primary/15 bg-card p-6 outline-offset-4 transition-colors hover:border-primary/40 focus-visible:outline-primary"><Icon className="size-6 text-primary" strokeWidth={1.3} aria-hidden="true" /><h3 className="mt-5 font-display text-xl font-medium leading-snug group-hover:text-primary">{area.title}</h3><p className="mb-5 mt-3 text-sm leading-relaxed text-muted-foreground">{area.text}</p><span className="mt-auto flex min-h-11 items-center gap-2 text-sm font-medium text-primary">Conoce más <ArrowUpRight className="size-4" aria-hidden="true" /></span></Link>)}
        </div>
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4 border-t border-border pt-6">
          <Button asChild variant="link" className="h-auto whitespace-normal px-0 text-left"><Link to="/diabetes">Diabetes y bienestar emocional <ArrowUpRight /></Link></Button>
          <Button asChild variant="link" className="h-auto whitespace-normal px-0 text-left"><Link to="/demencia-y-alzheimer">Demencia y Alzheimer <ArrowUpRight /></Link></Button>
          <Button asChild variant="link" className="h-auto whitespace-normal px-0"><Link to="/servicios">Ver todas las áreas <ArrowRight /></Link></Button>
        </div>
      </section>

      <section aria-labelledby="esencia-noralma" className="bg-sand/50">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-[1.2fr_1fr] md:gap-20 md:py-20">
          <div><EspiralMarca className="size-10" /><p className="home-eyebrow mt-5 text-sm text-primary">Mi forma de entender la psicología</p><h2 id="esencia-noralma" className="mt-6 max-w-[20ch] font-display text-4xl font-medium leading-tight text-primary md:text-5xl">¿Esto me acerca a mí <em className="font-normal">o me aleja de mí?</em></h2></div>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground"><p>Creo en una psicología que no busca convertirnos en alguien diferente, sino ayudarnos a comprender nuestra experiencia, aceptar aquello que sentimos y reconocer qué es importante para nosotros. Un proceso en el que aprender a relacionarnos de otra manera con nuestros pensamientos y emociones, identificando nuestros valores y construyendo una vida más coherente con ellos.</p><p>Trabajo desde la Terapia de Aceptación y Compromiso (ACT): dar espacio a lo que sientes y caminar hacia aquello que tiene sentido para ti.</p><Button asChild variant="link" className="h-auto whitespace-normal px-0"><Link to="/servicios" hash="forma-de-trabajar">Mi forma de trabajar <ArrowUpRight /></Link></Button></div>
        </div>
      </section>

      <DoctoraliaDestacada
        profileUrl={DOCTORALIA_REVIEWS_URL}
        rating={valoracion.rating}
        count={valoracion.count}
        opiniones={authorizedDoctoraliaOpiniones(doctoralia)}
      />

      <section aria-label="Alzheimer, demencia y diabetes" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <ServiciosDestacados />
        <div className="mt-8 flex flex-wrap gap-4 border-t border-primary/20 pt-6"><Button asChild variant="outline" className={actionClass}><a href="https://www.instagram.com/reel/DanIsj9satp/" target="_blank" rel="noreferrer">Una conversación con mi padre <ArrowUpRight /></a></Button><Button asChild variant="link"><a href="#guias">Recursos de estimulación cognitiva <ArrowRight /></a></Button></div>
      </section>

      <section id="recursos" aria-labelledby="recursos-inicio" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="home-eyebrow text-sm text-primary">Recursos y contenido</p><h2 id="recursos-inicio" className="mt-4 font-display text-3xl font-medium md:text-4xl">Un pequeño espacio para cuidarte.</h2></div><Button asChild variant="outline" className={actionClass}><a href="#guias">Explora todos los recursos <ArrowUpRight /></a></Button></div>
        <div id="guias" className="scroll-mt-28 pt-10"><h3 className="font-display text-2xl">Guías para empezar</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Guías gratuitas, ejercicios de bienestar emocional y recursos de estimulación cognitiva.</p>
          <div className="mt-7 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {guias.map((g) => <article key={g.title} className="flex flex-col"><a href={g.href} target="_blank" rel="noreferrer" className="home-guide-cover block bg-card p-5"><img src={g.img} alt={`Portada de ${g.title}`} width={736} height={912} loading="lazy" className="h-full w-full object-contain" /></a><h4 className="mt-5 font-display text-xl leading-snug">{g.title}</h4><p className="mb-4 mt-2 text-sm leading-relaxed text-muted-foreground">{g.text}</p><Button asChild variant="link" className="mt-auto h-auto justify-start self-start px-0"><a href={g.href} target="_blank" rel="noreferrer">Descargar gratis <ArrowUpRight /></a></Button></article>)}
          </div>
        </div>
        <div className="mt-14 border-t border-border pt-10"><div className="flex items-center justify-between gap-4"><h3 className="font-display text-2xl">Desde el blog</h3><Button asChild variant="link" className="h-auto px-0"><Link to="/blog">Ver todos los artículos <ArrowUpRight /></Link></Button></div>
          <div className="mt-7 grid gap-8 md:grid-cols-3">{latestPosts.map((post) => <Link key={post.id} to="/blog/$slug" params={{ slug: post.slug }} className="group"><img src={coverFor(post)} alt={post.title} width={1024} height={640} loading="lazy" className="aspect-[8/5] w-full rounded-md object-cover" /><p className="mt-4 text-xs text-primary">{post.category} · {formatDate(post.published_at)}</p><h4 className="mt-2 font-display text-xl leading-snug group-hover:text-primary">{post.title}</h4><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p></Link>)}</div>
        </div>
        <div id="instagram" className="mt-14 scroll-mt-28 border-t border-border pt-8"><div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-display text-2xl">En Instagram</h3><Button asChild variant="link" className="h-auto px-0"><a href="https://www.instagram.com/noralma.psicologia" target="_blank" rel="noreferrer">@noralma.psicologia <ArrowUpRight /></a></Button></div><div className="mt-6 grid grid-cols-3 gap-3 md:gap-6">{instagramPosts.map((post) => <a key={post.href} href={post.href} target="_blank" rel="noreferrer" className="group min-w-0"><img src={post.img} alt={post.caption} width={750} height={1000} loading="lazy" className="aspect-[3/4] w-full rounded-md object-cover" /><p className="mt-3 text-xs leading-relaxed text-muted-foreground md:text-sm">{post.caption}</p></a>)}</div></div>
      </section>

      <Comunidad />
      <NewsletterSection />

      <section aria-labelledby="empezar" className="bg-sand/60">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center md:py-20"><EspiralMarca className="mx-auto size-14" /><p className="home-eyebrow mt-5 text-sm text-primary">Hablemos</p><h2 id="empezar" className="mt-5 font-display text-3xl font-medium leading-tight text-balance md:text-4xl">A veces, empezar a cuidarte comienza con una conversación.</h2><p className="mx-auto mt-6 max-w-[51ch] text-base leading-relaxed text-muted-foreground">Si sientes que necesitas un espacio para ti, estaré encantada de acompañarte.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Button asChild className={actionClass}><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Reserva tu primera sesión <ArrowUpRight /></a></Button><Button asChild variant="outline" className={actionClass}><Link to="/contacto">Contacta conmigo <ArrowUpRight /></Link></Button></div></div>
      </section>
    </div>
  );
}
