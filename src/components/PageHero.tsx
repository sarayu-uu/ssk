interface PageHeroProps {
  eyebrow: string
  title: string
  intro: string
}

/** Shared navy page header so every page uses the same heading sizes. */
export default function PageHero({ eyebrow, title, intro }: PageHeroProps) {
  return (
    <section className="on-navy bg-navy py-14 text-white md:py-20">
      <div className="rise-stagger mx-auto max-w-6xl px-4">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-amber">{eyebrow}</p>
        <h1 className="max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/90 md:text-lg">{intro}</p>
      </div>
    </section>
  )
}
