# Remote Content sem rebuild

Este modulo permite editar textos em `public/content/*.json` sem gerar novo build do app.

## Arquivos

- `public/content/content-manifest.json`: versao e mapa de locale -> arquivo JSON
- `public/content/site.pt-BR.json`: conteudo em portugues
- `public/content/site.en-US.json`: conteudo em ingles
- `src/content/contentClient.ts`: loader com cache em memoria + localStorage
- `src/content/useRemoteContent.ts`: hook React para consumir por caminho (`home.hero`)

## Exemplo rapido

```tsx
import { useRemoteContent } from '../content';

type HeroContent = {
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
};

const fallbackHero: HeroContent = {
  title: 'Titulo fallback',
  subtitle: 'Texto fallback',
  primaryCta: 'CTA 1',
  secondaryCta: 'CTA 2',
};

export function HeroRemote() {
  const { data, isLoading, error } = useRemoteContent<HeroContent>('home.hero', fallbackHero);

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar conteudo</p>;

  return (
    <>
      <h1>{data.title}</h1>
      <p>{data.subtitle}</p>
    </>
  );
}
```

## Como atualizar em producao

1. Edite o JSON desejado em `public/content/site.<locale>.json`
2. Atualize o campo `version` de `public/content/content-manifest.json`
3. Publique os arquivos estaticos no servidor/CDN

Ao mudar a `version`, o cache local e invalidado automaticamente.

