create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null default 'Reflexión',
  excerpt text not null default '',
  content text not null default '',
  cover_image text,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

grant select on public.blog_posts to anon;
grant select, insert, update, delete on public.blog_posts to authenticated;
grant all on public.blog_posts to service_role;

alter table public.blog_posts enable row level security;

create policy "Blog posts are publicly readable"
  on public.blog_posts for select to anon, authenticated using (true);

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

grant insert on public.contact_messages to anon;
grant select, insert, update, delete on public.contact_messages to authenticated;
grant all on public.contact_messages to service_role;

alter table public.contact_messages enable row level security;

create policy "Anyone can send a contact message"
  on public.contact_messages for insert to anon, authenticated with check (true);

insert into public.blog_posts (slug, title, category, excerpt, content, cover_image, published_at) values
('cuando-descansar-tambien-es-avanzar', 'Cuando descansar también es avanzar', 'Reflexión', 'Aprender a parar sin culpa, una guía amable para el día a día.', 'Vivimos con la idea de que avanzar significa hacer más: más tareas, más horas, más esfuerzo. Pero la mente no funciona como una máquina. Necesita pausas para integrar lo vivido, para ordenar lo que sentimos y para volver con claridad.

Descansar no es rendirse. Es una forma de cuidado que permite que mañana puedas seguir. Cuando paras sin culpa, le estás diciendo a tu cuerpo y a tu mente que también importan.

Si hoy solo puedes hacer una cosa, que sea esta: date permiso para parar un rato. Respira, suelta los hombros, y recuerda que descansar también es avanzar.', 'blog-descansar', now() - interval '2 days'),
('nombres-para-lo-que-sientes', 'Nombres para lo que sientes', 'Ansiedad', 'Poner palabras a la tensión ayuda a bajarle el volumen.', 'La ansiedad muchas veces llega sin nombre: un nudo en el estómago, el pecho apretado, la mente acelerada. Y lo que no tiene nombre, asusta más.

Poner palabras a lo que sientes es una herramienta poderosa. Cuando dices "estoy sintiendo miedo" o "esto es incertidumbre", tu cerebro empieza a ordenar la experiencia y la intensidad baja.

Prueba este ejercicio sencillo: tres veces al día, pregúntate qué estás sintiendo y ponle un nombre. Sin juzgarlo, solo nombrarlo. Verás cómo poco a poco lo que sentías como una ola empieza a tener orillas.', 'blog-ansiedad', now() - interval '6 days'),
('rutinas-que-no-agobian', 'Rutinas que no agobian', 'Autocuidado', 'Pequeños cuidados que caben en una vida real.', 'El autocuidado se ha llenado de listas imposibles: meditar veinte minutos, hacer ejercicio, comer perfecto, dormir ocho horas. Y cuando no lo cumplimos, nos sentimos peor.

El verdadero autocuidado es mucho más humilde. Es beber un vaso de agua cuando te acuerdas. Es salir al balcón dos minutos. Es decir que no a un plan cuando estás agotada.

Empieza con un solo gesto al día, tan pequeño que no puedas fallar. La constancia en lo pequeño cuida más que la perfección en lo grande.', 'blog-autocuidado', now() - interval '10 days');